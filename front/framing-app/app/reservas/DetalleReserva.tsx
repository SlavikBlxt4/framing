import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function DetalleReserva() {
  const { id, nombre } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalle de la reserva</Text>
      <Text style={styles.text}>ID: {id}</Text>
      <Text style={styles.text}>Nombre: {nombre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
