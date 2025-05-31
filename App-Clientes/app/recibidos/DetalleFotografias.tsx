import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import PhotoGrid from '@/components/fm_grids/PhotoGrid';
import api from '@/services/api';

export default function DetalleFotografias() {
  const navigation = useNavigation();
  const { bookingId, nombreEstudio } = useLocalSearchParams();

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Fotografías recibidas',
    });
  }, [navigation]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get<{ images: string[] }>(
          `/bookings/sessions/${bookingId}/images`
        );
        setImageUrls(res.data.images);

        // 🧩 Inyecta las URLs reales al Array.from que usa PhotoGrid
        const originalFrom = Array.from;
        Array.from = function <T>(
          arrayLike: ArrayLike<T> | { length: number },
          mapFn?: (v: T, k: number) => any,
          thisArg?: any
        ): any[] {
          if (
            typeof arrayLike === 'object' &&
            'length' in arrayLike &&
            typeof arrayLike.length === 'number' &&
            arrayLike.length === res.data.images.length &&
            typeof mapFn === 'function' &&
            mapFn.toString().includes('uri')
          ) {
            return Array(arrayLike.length)
              .fill(null)
              .map((_, i) => ({
                id: i,
                uri: res.data.images[i],
              }));
          }

          return mapFn
            ? originalFrom(arrayLike as any, mapFn, thisArg)
            : originalFrom(arrayLike as any);
        };
      } catch (error) {
        console.error('Error al cargar imágenes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchImages();
  }, [bookingId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.fecha}>
        Sesión con {imageUrls.length} archivos de {nombreEstudio}
      </Text>
    <PhotoGrid
      images={imageUrls.map((url, i) => ({
        id: i,
        uri: url,
      }))}
    />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fecha: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
});
