import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StyledText } from '../../components/StyledText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/services/api';
import mime from 'mime';
import * as FileSystem from 'expo-file-system';

export default function PortfolioScreen() {
  const router = useRouter();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [verifyingImages, setVerifyingImages] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [photographerId, setPhotographerId] = useState<string | null>(null);

  useEffect(() => {
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

  useEffect(() => {
    if (images.length === 0) {
      setReadyToSubmit(false);
      setVerifyingImages(false);
      return;
    }

    let interval: NodeJS.Timeout;
    let stableCounter = 0;
    let previousSizes: number[] = [];

    const checkStability = async () => {
      setVerifyingImages(true);

      interval = setInterval(async () => {
        try {
          const infos = await Promise.all(
            images.map(img => FileSystem.getInfoAsync(img.uri))
          );

          const sizes = infos.map(info =>
            info.exists && !info.isDirectory ? info.size ?? 0 : 0
          );

          const allExist = infos.every(info => info.exists && !info.isDirectory);
          const allStable =
            previousSizes.length === sizes.length &&
            sizes.every((size, idx) => size === previousSizes[idx]);

          if (allExist && allStable) {
            stableCounter += 1;
          } else {
            stableCounter = 0;
          }

          previousSizes = sizes;

          if (stableCounter >= 2) {
            clearInterval(interval);
            setReadyToSubmit(true);
            setVerifyingImages(false);
          }
        } catch (e) {
          console.error('Verificación fallida:', e);
          clearInterval(interval);
          setReadyToSubmit(false);
          setVerifyingImages(false);
        }
      }, 500);
    };

    checkStability();

    return () => clearInterval(interval);
  }, [images]);

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
        const mimeType = mime.getType(img.uri) || 'image/jpeg';
        const ext = mime.getExtension(mimeType) || 'jpg';
        const fileName = `portfolio_${Date.now()}_${idx}.${ext}`;

        formData.append('files', {
          uri: img.uri,
          name: fileName,
          type: mimeType,
        } as any);
      });

      await api.post(`/users/photographers/upload-portfolio-images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        transformRequest: (data) => data,
      });

      Alert.alert('Éxito', 'Imágenes subidas correctamente');
      setImages([]);
      router.back();
    } catch (error) {
      console.error('Error al subir imágenes:', error);
      Alert.alert('Error', 'No se pudieron subir las imágenes.');
    } finally {
      setLoading(false);
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

      <Pressable
        style={[styles.button, (!readyToSubmit || verifyingImages || loading) && { opacity: 0.5 }]}
        onPress={handleSave}
        disabled={!readyToSubmit || verifyingImages || loading}
      >
        {loading || verifyingImages ? (
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
