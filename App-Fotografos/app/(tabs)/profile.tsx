import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Text, View } from '../../components/Themed';
import { StyledText } from '@/components/StyledText';
import Colors from '@/constants/Colors';
import api from '@/services/api';

export default function ProfileScreen() {
  const router = useRouter();
  const [studioName, setStudioName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) throw new Error('ID de usuario no encontrado');

      const response = await api.get(`/users/${userId}`);
      const newData = response.data;

      // 🔁 Leer datos anteriores
      const prevJson = await AsyncStorage.getItem('currentUser');
      const prevData = prevJson ? JSON.parse(prevJson) : null;

      const hasChanged =
        !prevData ||
        prevData.name !== newData.name ||
        prevData.url_profile_image !== newData.url_profile_image;

      if (hasChanged) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(newData));
      }

      // 🧠 Usa los datos actuales siempre, porque se usan solo aquí
      setStudioName(newData.name || '');
      setProfileImage(newData.url_profile_image || null);
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Ejecutar cada vez que esta pantalla entra en foco
  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        'token',
        'userEmail',
        'userId',
        'userRole',
        'currentUser',
      ]);
      router.replace('/sign/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      {/* Cabecera de perfil */}
      <View style={styles.header}>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.light.tint} style={styles.avatar} />
        ) : (
          <Image
            source={
              profileImage
                ? { uri: `${profileImage}?t=${Date.now()}` } // 👈 Evita caché de imagen
                : require('../../assets/images/placeholder_profile.png')
            }
            style={styles.avatar}
          />
        )}
        <View style={{ flex: 1 }}>
          <StyledText style={styles.studioName} weight="bold">
            {studioName || 'Estudio Fotográfico'}
          </StyledText>
          <StyledText style={styles.address}>Fotógrafo</StyledText>
        </View>
      </View>

      {/* Información pública */}
      <StyledText style={styles.sectionTitle} weight="bold">Información pública</StyledText>
      <View style={styles.card}>
        <Option label="Editar perfil" onPress={() => router.push('/profile/nombre-direccion')} />
        <Option label="Logo y portada" onPress={() => router.push('/profile/logo-portada')} />
        <Option label="Horario del estudio" onPress={() => router.push('/profile/horario')} />
        <Option label="Portfolio" onPress={() => router.push('/profile/portfolio')} />
        <Option label="Sesiones" onPress={() => router.push('/profile/sesiones')} />
        <Option label="Servicios" onPress={() => router.push('/profile/servicios')} />
      </View>

      {/* Cerrar sesión */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <StyledText style={styles.logoutText}>Cerrar sesión</StyledText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Option({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <StyledText style={styles.optionText}>{label}</StyledText>
      <Text style={styles.caret}>{'>'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  studioName: {
    fontSize: 17,
    marginBottom: 2,
  },
  address: {
    fontSize: 13,
    color: Colors.light.tabIconDefault,
  },
  sectionTitle: {
    color: Colors.light.tint,
    fontSize: 15,
    marginTop: 10,
    marginBottom: 6,
    marginLeft: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 2,
    gap: 2,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
  },
  caret: {
    fontSize: 18,
    color: Colors.light.tabIconDefault,
    marginLeft: 8,
  },
  logoutButton: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  logoutText: {
    color: '#DC2621',
    fontSize: 15,
    fontWeight: '600',
  },
});
