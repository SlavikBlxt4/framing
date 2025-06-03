import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Colors from '@/constants/Colors';
import api from '@/services/api';

export default function GestionReservaScreen() {
  const {
    bookingId,
    clientName,
    serviceName,
    bookingDate,
    bookingDuration,
    bookingPrice,
  } = useLocalSearchParams<{
    bookingId: string;
    clientName: string;
    serviceName: string;
    bookingDate: string;
    bookingDuration: string;
    bookingPrice: string;
  }>();

  const confirmarReserva = async () => {
    try {
      await api.post(`/bookings/${bookingId}/confirm`);
      Alert.alert('✅ Confirmado', 'La sesión ha sido confirmada!.');
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('❌ Error', 'No se pudo confirmar la sesión.');
    }
  };
//prueba apk
  const cancelarReserva = async () => {
    try {
      await api.post(`/bookings/${bookingId}/cancel-by-photographer`);
      Alert.alert('🛑 Cancelado', 'La sesión ha sido cancelada!.');
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('❌ Error', 'No se pudo cancelar la sesión.');
    }
  };

  const formatDuration = (minutes: string) => {
    const m = parseInt(minutes);
    if (isNaN(m)) return 'No especificado';
    return `${Math.floor(m / 60)}h ${m % 60}min`;
  };

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return 'Fecha inválida';
    return `${d.toLocaleDateString()} a las ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Reserva</Text>
      <Text style={styles.label}>Cliente: {clientName}</Text>
      <Text style={styles.label}>Servicio: {serviceName}</Text>
      <Text style={styles.label}>Fecha: {formatDateTime(bookingDate)}</Text>
      <Text style={styles.label}>Duración: {formatDuration(bookingDuration)}</Text>
      <Text style={styles.label}>Precio: {parseFloat(bookingPrice).toFixed(2)} €</Text>
      <View style={styles.buttonContainer}>
        <Button title="Cancelar" color="#e74c3c" onPress={cancelarReserva} />
        <Button title="Confirmar" color="#2ecc71" onPress={confirmarReserva} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  label: { fontSize: 18, marginBottom: 8 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 32, gap: 12 },
});
