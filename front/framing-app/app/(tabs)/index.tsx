import { StyleSheet, View, ScrollView } from 'react-native';
import HomeWelcome from '@/components/sections/HomeWelcome';
import SesionesContratadas from '@/components/sections/SesionesContratadas';
import ListarHorizontalFotografos from '@/components/sections/ListaHorizontalFotografos';
import Anuncio from '@/components/sections/Anuncio';
import { categorias } from '@/mocks/mockCategoria';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { useMemo } from 'react';

export default function HomeScreen() {
  // Generamos una posición aleatoria válida solo una vez
  const contenido = useMemo(() => {
    // El índice debe estar entre 1 y categorias.length - 2 (nunca primero ni último)
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
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <HomeWelcome username="" />
        <SesionesContratadas />
        {contenido}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    gap: 20,
  },
  box: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});
