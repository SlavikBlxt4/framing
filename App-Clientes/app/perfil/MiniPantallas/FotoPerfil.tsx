import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { StyledText } from '@/components/StyledText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/services/api';

export default function FotoPerfil() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const image = result.assets[0];
      setProfileImage(image.uri);
      setProfileImageFile(image);
    }
  };

  const handleSave = async () => {
    if (!profileImageFile) {
      Alert.alert('Selecciona una imagen', 'Debes elegir una foto para actualizar tu perfil.');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado');

      const formData = new FormData();
      formData.append('file', {
        uri: profileImageFile.uri,
        name: profileImageFile.fileName || 'profile.jpg',
        type: profileImageFile.mimeType || 'image/jpeg',
      } as any);

      await api.post('/users/upload-profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      Alert.alert('Éxito', 'Tu foto de perfil se ha actualizado correctamente.');
      router.back();
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      setLoading(false);
      Alert.alert('Error', 'No se pudo actualizar tu foto de perfil.');
    }
  };

  return (
    <View style={styles.container}>
      <StyledText style={styles.title} weight="bold">Foto de perfil</StyledText>
      <StyledText style={styles.subtitle}>Puedes cambiar tu imagen de perfil</StyledText>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.image} />
        ) : (
          <StyledText style={styles.imagePlaceholder}>Seleccionar imagen</StyledText>
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
