/**
 * Pantalla de Inicio (simbolo de casa en el tabBar)
 */

import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import HomeWelcome from '@/components/sections/HomeWelcome';
import SesionesContratadas from '@/components/sections/SesionesContratadas';


export default function HomeScreen() {
  const colors = Colors.light;

  return (
    <ScrollView>
        <View style={styles.container}>
        {/* Header superior con mensaje de bienvenida, foto de perfil y barra de búsqueda */}
        <HomeWelcome username=""/>
        {/* Seccion de las sesiones contratadas y la reserva más próxima */}
        <SesionesContratadas /> 
        <SesionesContratadas /> 
        <SesionesContratadas /> 
        <SesionesContratadas /> 
        <SesionesContratadas /> 
        <SesionesContratadas /> 
        <SesionesContratadas /> 
        <SesionesContratadas /> 
        <SesionesContratadas /> 
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
