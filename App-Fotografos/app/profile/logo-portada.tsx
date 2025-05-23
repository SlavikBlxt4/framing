import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert, Pressable, ActivityIndicator } from 'react-native';
import { StyledText } from '../../components/StyledText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/services/api';

export default function LogoPortadaScreen() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<any>(null);
  const [coverImageFile, setCoverImageFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Función para seleccionar imagen
  const pickImage = async (type: 'profile' | 'cover') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
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

  // Subir imágenes al pulsar guardar
  const handleSave = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado');
      let ok = false;
      if (profileImageFile) {
        const formData = new FormData();
        formData.append('file', {
          uri: profileImageFile.uri,
          name: profileImageFile.fileName || 'profile.jpg',
          type: profileImageFile.mimeType || 'image/jpeg',
        });
        await api.post('/users/photographers/upload-profile-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        ok = true;
      }
      if (coverImageFile) {
        const formData = new FormData();
        formData.append('file', {
          uri: coverImageFile.uri,
          name: coverImageFile.fileName || 'cover.jpg',
          type: coverImageFile.mimeType || 'image/jpeg',
        });
        await api.post('/users/photographers/upload-cover-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        ok = true;
      }
      setLoading(false);
      if (ok) {
        Alert.alert('Éxito', 'Imágenes actualizadas correctamente');
        router.back();
      } else {
        Alert.alert('Nada para actualizar', 'Selecciona una imagen para actualizar.');
      }
    } catch (error: any) {
      setLoading(false);
      console.error('Error al subir imágenes:', error);
      Alert.alert('Error', 'No se pudieron actualizar las imágenes.');
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

      <Pressable style={styles.button} onPress={handleSave} disabled={loading}>
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
