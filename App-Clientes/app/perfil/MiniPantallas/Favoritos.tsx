import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeartHalf } from 'phosphor-react-native';

import api from '@/services/api';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface Favorito {
  id: number;
  name: string;
  avatarUrl: string;
  photographerId: number;
}

export default function FavoritosScreen() {
  const navigation = useNavigation();
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Favoritos',
      headerStyle: { backgroundColor: 'white' },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        // ✅ Sustituye esta ruta por tu endpoint real
        //const res = await api.get<Favorito[]>('/favourites');
        //setFavoritos(res.data);
      } catch (err) {
        console.error('Error al obtener favoritos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, []);

  const renderItem = ({ item }: { item: Favorito }) => (
    <Pressable style={styles.card}>
      <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
      <Text style={styles.nombre}>{item.name}</Text>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (favoritos.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <HeartHalf weight='regular' size={40} color={Colors.light.tint} />
          <Text style={styles.text}>Todavía no tienes favoritos</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={favoritos}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  nombre: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.light.text,
  },
});
