// Sesiones.tsx
import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { sesionesFotografos } from '@/mocks/mockSesionesFotografo'; 
import TarjetaReserva from '@/components/fm_cards/TarjetaReserva';

export default function Sesiones() {
  return (
    <View style={styles.container}>
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
