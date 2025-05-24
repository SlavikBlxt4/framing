import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { AxiosError } from 'axios';

// Constantes
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';

// Componentes
import HomeWelcome from '@/components/fm_sections/HomeWelcome';
import SesionesContratadas from '@/components/fm_sections/SesionesContratadas';
import ListarHorizontalFotografos from '@/components/fm_grids/ListaHorizontalFotografos';
import Anuncio from '@/components/fm_sections/Anuncio';

// Servicios
import { Categoria } from '@/types/category';
import { Photographer } from '@/types/photographer';
import { getCategorias } from '@/services/categoryService';
import { getPhotographers } from '@/services/photographerService';
import { getUserById } from '@/services/userInfoService';

// Contexto
import { useUser } from '@/context/UserContext';

export default function HomeScreen() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          router.replace('/perfil/Login');
          return;
        }

        await fetchAndCacheUser(); // ✅ nueva función

        fetchPhotographers();
        fetchCategorias();
      } catch (error) {
        console.error('Error verificando sesión:', error);
        router.replace('/perfil/Login');
      }
    };

    const fetchAndCacheUser = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (!id) return;

        const user = await getUserById(parseInt(id));
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        setUser(user);
      } catch (error) {
        console.error('❌ Error al obtener el usuario:', error);
      }
    };

    const fetchPhotographers = async () => {
      try {
        const data = await getPhotographers();
        setPhotographers(data);
      } catch (error) {
        console.error('Error al obtener los fotógrafos:', error);
        if (error instanceof AxiosError && error.response?.status === 401) {
          router.replace('/perfil/Login');
        }
      }
    };

    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
        if (error instanceof AxiosError && error.response?.status === 401) {
          router.replace('/perfil/Login');
        }
      }
    };

    checkAuthAndFetch();
  }, []);

  const contenido = useMemo(() => {
    if (categorias.length < 2) return [];

    const anuncioIndex = Math.floor(Math.random() * (categorias.length - 2)) + 1;

    return categorias.flatMap((cat, index) => {
      const section = (
        <ListarHorizontalFotografos
          key={`categoria-${cat.id}`}
          categoria={cat.name}
          categorias={categorias}
          photographers={photographers}
        />
      );

      if (index === anuncioIndex) {
        return [
          section,
          <Anuncio key="anuncio-home" imagenUrl="" link="https://tuanuncio.com" />,
        ];
      }

      return [section];
    });
  }, [categorias, photographers]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <HomeWelcome username={user?.name} />
        <SesionesContratadas />
        {contenido}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
    backgroundColor: Colors.light.background,
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});
