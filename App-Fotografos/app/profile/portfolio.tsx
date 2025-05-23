import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { StyledText } from '../../components/StyledText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/services/api';

export default function PortfolioScreen() {
  const router = useRouter();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [photographerId, setPhotographerId] = useState<string | null>(null);

  React.useEffect(() => {
    // Obtener el id del fotógrafo
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');
        const response = await api.get('/users/me/photographer-profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPhotographerId(response.data.id?.toString() || null);
      } catch (error) {
        Alert.alert('Error', 'No se pudo obtener el perfil del fotógrafo');
      }
    };
    fetchProfile();
  }, []);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages(result.assets);
    }
  };

  const handleSave = async () => {
    if (!photographerId) {
      Alert.alert('Error', 'No se encontró el ID del fotógrafo');
      return;
    }
    if (images.length === 0) {
      Alert.alert('Selecciona imágenes', 'Debes seleccionar al menos una imagen.');
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado');
      const formData = new FormData();
      images.forEach((img, idx) => {
        formData.append('files', {
          uri: img.uri,
          name: img.fileName || `portfolio_${idx}.jpg`,
          type: img.mimeType || 'image/jpeg',
        } as any);
      });
      await api.post(`/users/photographers/${photographerId}/portfolio`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      Alert.alert('Éxito', 'Imágenes subidas correctamente');
      setImages([]);
      router.back();
    } catch (error) {
      setLoading(false);
      console.error('Error al subir imágenes:', error);
      Alert.alert('Error', 'No se pudieron subir las imágenes.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StyledText style={styles.title} weight="bold">Portfolio</StyledText>
      <StyledText style={styles.subtitle}>Selecciona varias imágenes para subir a tu portfolio.</StyledText>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImages}>
        <StyledText style={styles.imagePickerText}>Seleccionar imágenes</StyledText>
      </TouchableOpacity>

      {images.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesRow}>
          {images.map((img, idx) => (
            <Image key={idx} source={{ uri: img.uri }} style={styles.image} />
          ))}
        </ScrollView>
      )}

      <Pressable style={styles.button} onPress={handleSave} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <StyledText style={styles.buttonText} weight="bold">Guardar cambios</StyledText>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    height: 60,
    marginBottom: 10,
  },
  imagePickerText: {
    color: Colors.light.tabIconDefault,
    fontSize: 16,
  },
  imagesRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
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
