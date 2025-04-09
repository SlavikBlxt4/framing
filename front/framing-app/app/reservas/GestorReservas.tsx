// app/reservas/GestorReservas.tsx
import { View, Text, StyleSheet } from 'react-native';
import Fonts from '@/constants/Fonts';

export default function GestorReservas() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestor de reservas</Text>
      <Text style={styles.subtitle}>Aquí verás todas tus sesiones contratadas.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    marginTop: 12,
    textAlign: 'center',
  },
});
