// React - React Native
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constantes
import Fonts from '@/constants/Fonts';

// Componentes
import ScrollWithAnimatedHeader from '@/components/framing/ScrollWithAnimatedHeader';
import HomeWelcome from '@/components/fm_sections/HomeWelcome';
import SesionesContratadas from '@/components/fm_sections/SesionesContratadas';
import ListarHorizontalFotografos from '@/components/fm_grids/ListaHorizontalFotografos';
import Anuncio from '@/components/fm_sections/Anuncio';

// Datos simulados
// import { UsuarioProps } from '@/types/Usuario.type';
import { categorias } from '@/mocks/mockCategoria';
import mockUsers from '@/mocks/mockUsuarios';

// Datos reales
import { UsuarioProps } from '@/types/user';

// Componente principal de la pantalla de inicio
export default function HomeScreen() {
  // Estado para guardar el usuario actualmente logueado (o null si no hay ninguno)
  const [currentUser, setCurrentUser] = useState<UsuarioProps | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      const id = await AsyncStorage.getItem('userId');
      const role = await AsyncStorage.getItem('userRole');
  
      if (email && id) {
        setCurrentUser({
          id: parseInt(id),
          email,
          role: role || undefined,
        });
      }
    };
  
    fetchUser();
  }, []);


  // useMemo para calcular el contenido a mostrar (categorías y anuncio) solo una vez
  const contenido = useMemo(() => {
    // Se elige aleatoriamente una posición para insertar el anuncio
    const anuncioIndex = Math.floor(Math.random() * (categorias.length - 2)) + 1;

    // Se mapea cada categoría para renderizar una sección de fotógrafos
    // En una posición aleatoria se inserta un anuncio adicional
    return categorias.flatMap((cat, index) => {
      const section = (
        <ListarHorizontalFotografos
          key={`categoria-${cat.id}`}
          categoria={cat.nombreCategoria}
        />
      );

      // Si el íncide actual es igual al índice del anuncio, se inserta el anuncio
      if (index === anuncioIndex) {
        return [
          section,
          <Anuncio
            key="anuncio-home"
            imagenUrl=""
            link="https://tuanuncio.com"
          />,
        ];
      }

      // En caso contrario, solo se devuelve la sección
      return [section];
    });
  }, []); // Solo se recalcula si las dependencias cambian (vacío: solo una vez)

  // Renderizado del componente
  return (
    <ScrollWithAnimatedHeader title="">
      <View style={styles.container}>
        <HomeWelcome username={currentUser?.email} />
        <SesionesContratadas />
        {contenido}
      </View>
    </ScrollWithAnimatedHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    gap: 20,
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});
