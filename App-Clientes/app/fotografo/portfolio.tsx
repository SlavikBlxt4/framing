// React y React Native
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, Text, Dimensions, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getPhotographerPortfolio } from '@/services/photographerService';
import { Portfolio } from '@/types/portfolio';

const { width } = Dimensions.get('window');
const IMAGE_MARGIN = 12;
const IMAGE_WIDTH = width - IMAGE_MARGIN * 2;
const IMAGE_HEIGHT = IMAGE_WIDTH * 9 / 16; // Proporción 16:9

export default function PortfolioScreen() {
  const { id } = useLocalSearchParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (id) {
          const data = await getPhotographerPortfolio(Number(id));
          setPortfolio(data);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setError('Error al cargar el portfolio');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2a9d8f" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!portfolio || portfolio.images.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay imágenes en el portfolio</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {portfolio.images.map((imageUrl, index) => (
        <Image
          key={index}
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: IMAGE_MARGIN,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    marginBottom: IMAGE_MARGIN,
    borderRadius: 10,
    backgroundColor: '#eee',
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
  },
});
