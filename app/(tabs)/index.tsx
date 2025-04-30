import { StyleSheet, View } from 'react-native';
import { useMemo } from 'react';

import HomeWelcome from '@/components/fm_sections/HomeWelcome';
import SesionesContratadas from '@/components/fm_sections/SesionesContratadas';
import ListarHorizontalFotografos from '@/components/fm_grids/ListaHorizontalFotografos';
import Anuncio from '@/components/fm_sections/Anuncio';
import { categorias } from '@/mocks/mockCategoria';
import Fonts from '@/constants/Fonts';
import ScrollWithAnimatedHeader from '@/components/framing/ScrollWithAnimatedHeader';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mockUsers from '@/mocks/mockUsuarios';

type Usuario = {
  id: number;
  email: string;
  password: string;
  fotografia_url: string;
  nombre: string;
};


export default function HomeScreen() {
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        const user = mockUsers.find((u) => u.id === parseInt(id));
        if (user) setCurrentUser(user);
      }
    };

    fetchUser();
  }, []);


  const contenido = useMemo(() => {
    const anuncioIndex = Math.floor(Math.random() * (categorias.length - 2)) + 1;

    return categorias.flatMap((cat, index) => {
      const section = (
        <ListarHorizontalFotografos
          key={`categoria-${cat.id}`}
          categoria={cat.nombreCategoria}
        />
      );

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

      return [section];
    });
  }, []);

  return (
    <ScrollWithAnimatedHeader title="">
      <View style={styles.container}>
        <HomeWelcome username={currentUser?.nombre || "Usuario"} />

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
