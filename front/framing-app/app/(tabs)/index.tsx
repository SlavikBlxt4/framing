import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import HomeWelcome from '@/components/sections/HomeWelcome';
import SesionesContratadas from '@/components/sections/SesionesContratadas';
import { categorias } from '@/mocks/mockCategoria';
import ListarHorizontalFotografos from '@/components/sections/ListaHorizontalFotografos';
import Anuncio from '@/components/framing/Anuncio';

export default function HomeScreen() {
  const colors = Colors.light;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <HomeWelcome username="" />
        <SesionesContratadas />
        <Anuncio
          imagenUrl=""
          link="https://tuanuncio.com"
        />
        {categorias.map((cat) => (
          <ListarHorizontalFotografos
            key={cat.id}
            categoria={cat.nombreCategoria}
          />
        ))}
        {/* <ListarHorizontalFotografos categoria='Exterior'/> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1, // Hace que el contenido se expanda para llenar la pantalla
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
