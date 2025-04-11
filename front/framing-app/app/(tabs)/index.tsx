import { StyleSheet, View } from 'react-native';
import { useMemo } from 'react';

import HomeWelcome from '@/components/sections/HomeWelcome';
import SesionesContratadas from '@/components/sections/SesionesContratadas';
import ListarHorizontalFotografos from '@/components/sections/ListaHorizontalFotografos';
import Anuncio from '@/components/sections/Anuncio';
import { categorias } from '@/mocks/mockCategoria';
import Fonts from '@/constants/Fonts';
import ScrollWithAnimatedHeader from '@/components/framing/ScrollWithAnimatedHeader';


export default function HomeScreen() {
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
        <HomeWelcome username="" />
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
