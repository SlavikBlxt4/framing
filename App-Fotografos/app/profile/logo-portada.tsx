import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { StyledText } from '../../components/StyledText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/services/api';
import * as FileSystem from 'expo-file-system';
import mime from 'mime';


export default function LogoPortadaScreen() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<any>(null);
  const [coverImageFile, setCoverImageFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [verifyingImages, setVerifyingImages] = useState(true);


useEffect(() => {
  let interval: NodeJS.Timeout;
  let previousSizes = { profile: 0, cover: 0 };
  let stableCounter = 0;

  const checkFilesStable = async () => {
    if (!profileImage || !coverImage) {
      setReadyToSubmit(false);
      setVerifyingImages(false);
      return;
    }

    setVerifyingImages(true);

    interval = setInterval(async () => {
      try {
        const [profileInfo, coverInfo] = await Promise.all([
          FileSystem.getInfoAsync(profileImage),
          FileSystem.getInfoAsync(coverImage),
        ]);

        const currentSizes = {
          profile: profileInfo.exists && !profileInfo.isDirectory ? profileInfo.size ?? 0 : 0,
          cover: coverInfo.exists && !coverInfo.isDirectory ? coverInfo.size ?? 0 : 0,
        };


        const profileStable = previousSizes.profile === currentSizes.profile;
        const coverStable = previousSizes.cover === currentSizes.cover;

        if (profileStable && coverStable && profileInfo.exists && coverInfo.exists) {
          stableCounter += 1;
        } else {
          stableCounter = 0;
        }

        previousSizes = currentSizes;

        if (stableCounter >= 2) {
          clearInterval(interval);
          setReadyToSubmit(true);
          setVerifyingImages(false);
        }
      } catch (e) {
        console.error("Error verificando imágenes:", e);
        clearInterval(interval);
        setReadyToSubmit(false);
        setVerifyingImages(false);
      }
    }, 500); // polling cada 500ms
  };

  checkFilesStable();

  return () => clearInterval(interval);
}, [profileImage, coverImage]);




  const pickImage = async (type: 'profile' | 'cover') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      if (type === 'profile') {
        setProfileImage(uri);
        setProfileImageFile(result.assets[0]);
      } else {
        setCoverImage(uri);
        setCoverImageFile(result.assets[0]);
      }
    }
  };

  const uploadFile = async (uri: string, endpoint: string, token: string) => {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) throw new Error('Archivo no disponible: ' + uri);

    const mimeType = mime.getType(uri) || 'image/jpeg';
    const fileName = uri.split('/').pop() || `file.${mime.getExtension(mimeType) || 'jpg'}`;

    const formData = new FormData();
    formData.append('file', {
      uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
      name: fileName,
      type: mimeType,
    } as any);

    console.log('Subiendo a:', endpoint, fileName);

    await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado');

      if (!profileImageFile?.uri || !coverImageFile?.uri) {
        Alert.alert('Imágenes faltantes', 'Selecciona ambas imágenes antes de guardar.');
        return;
      }

      await uploadFile(profileImageFile.uri, '/users/photographers/upload-profile-image', token);
      await uploadFile(coverImageFile.uri, '/users/photographers/upload-cover-image', token);

      Alert.alert('Éxito', 'Imágenes actualizadas correctamente');
      router.back();
    } catch (error: any) {
      console.error('Error al subir imágenes:', error);
      Alert.alert('Error', error.message || 'No se pudieron actualizar las imágenes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StyledText style={styles.title} weight="bold">Logo y portada</StyledText>
      <StyledText style={styles.subtitle}>Puedes cambiar tu foto de perfil y tu foto de portada.</StyledText>

      <StyledText style={styles.sectionTitle} weight="semiBold">Foto de perfil</StyledText>
      <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage('profile')}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <StyledText style={styles.imagePlaceholder}>Seleccionar foto de perfil</StyledText>
        )}
      </TouchableOpacity>

      <StyledText style={styles.sectionTitle} weight="semiBold">Foto de portada</StyledText>
      <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage('cover')}>
        {coverImage ? (
          <Image source={{ uri: coverImage }} style={styles.coverImage} />
        ) : (
          <StyledText style={styles.imagePlaceholder}>Seleccionar foto de portada</StyledText>
        )}
      </TouchableOpacity>

      <Pressable
        style={[styles.button, (loading || verifyingImages || !readyToSubmit) && { opacity: 0.5 }]}
        onPress={handleSave}
        disabled={loading || verifyingImages || !readyToSubmit}
      >

        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <StyledText style={styles.buttonText} weight="bold">Guardar cambios</StyledText>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.light.tint,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    color: Colors.light.text,
    marginTop: 18,
    marginBottom: 8,
  },
  imagePicker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  coverImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  imagePlaceholder: {
    color: Colors.light.tabIconDefault,
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
