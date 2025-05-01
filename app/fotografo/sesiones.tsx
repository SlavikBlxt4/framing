// React - React Native
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Componentes
import TarjetaReserva from '@/components/fm_cards/TarjetaReserva';

// Datos simulados
import { sesionesFotografos } from '@/mocks/mockSesionesFotografo'; 

// Componente que muestra una lista de sesiones ofrecidas por un fotógrafo
export default function Sesiones() {
  return (
    // Contenedor principal
    <View style={styles.container}>
      {/* Mapea el arreglo de sesione y renderiza una tarjeta por cada una */}
      {sesionesFotografos.map((sesion, index) => (
        <TarjetaReserva key={index} sesion={sesion} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
