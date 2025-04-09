import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function DetalleReserva() {
  // Se obtienen los detalles del objeto que se ha enviado en el botón "Ver Reserva"
  const { id, nombre } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Explorar categoría funciona</Text>
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
