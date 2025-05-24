import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { Star, StarHalf } from 'phosphor-react-native';

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import api from '@/services/api';

interface Reseña {
  id: number;
  rating: number;
  comment: string;
  fecha: string;
  serviceName: string;
  photographerName: string;
  photographerId: number;
  photographerAvatar: string;
}

export default function ReseñasScreen() {
  const navigation = useNavigation();
  const [reseñas, setReseñas] = useState<Reseña[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Reseñas',
      headerStyle: { backgroundColor: 'white' },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await api.get<Reseña[]>('/ratings/history');
        setReseñas(resp.data);
      } catch (err) {
        console.error('Error al obtener las reseñas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Reseña }) => {
    const estrellas = Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        weight={i < item.rating ? 'fill' : 'regular'}
        color={Colors.light.tint}
        style={{ marginRight: 2 }}
      />
    ));

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={{ uri: item.photographerAvatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.nombre}>{item.photographerName}</Text>
            <Text style={styles.sub}>{item.serviceName} · {item.fecha}</Text>
          </View>
        </View>
        <View style={styles.stars}>{estrellas}</View>
        {item.comment && <Text style={styles.comment}>{item.comment}</Text>}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (reseñas.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <StarHalf weight='regular' size={40} color={Colors.light.tint} />
          <Text style={styles.text}>Todavía no has hecho ninguna reseña</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={reseñas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.light.text,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  nombre: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.light.text,
  },
  sub: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#555',
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  comment: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#333',
    lineHeight: 20,
  },
});
