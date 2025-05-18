import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import api from '@/services/api';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

type Params = {
  nombre: string; // nombre de la sesión
  precio: string;
  fotografoId: string;
  duracion: string;
  fecha: string;
  hora: string;
  fotografoNombre: string;
  serviceId: string;
};

const formatDuration = (minutes: number): string => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0 && mins > 0) return `${hrs}h ${mins}min`;
  if (hrs > 0) return `${hrs}h`;
  return `${mins}min`;
};

export default function ResumenReserva() {
  const router = useRouter();
  const {
    nombre, // nombre de la sesión
    precio,
    fotografoId,
    duracion,
    fecha,
    hora,
    fotografoNombre,
    serviceId,
  } = useLocalSearchParams<Params>();

  const dateTimeISO = `${fecha}T${hora}:00`;

  const handleCancelar = () => {
    router.back();
  };

  const handleReservar = async () => {
    try {
        const res = await api.post('/bookings/create', {
            serviceId: parseInt(serviceId),
            dateTime: dateTimeISO,
            bookedMinutes: parseInt(duracion),
        });

        router.replace('/fotografo/reservaHecha'); // ✅ Redirige a nueva pantalla
    } catch (err: any) {
        console.error(err);
        Alert.alert(
        '❌ Error',
        err?.response?.data?.message || 'No se pudo crear la reserva'
        );
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de Reserva</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Fotógrafo:</Text>
        <Text style={styles.value}>{fotografoNombre}</Text>

        <Text style={styles.label}>Sesión:</Text>
        <Text style={styles.value}>{nombre}</Text>

        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{fecha}</Text>

        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.value}>{hora}</Text>

        <Text style={styles.label}>Duración:</Text>
        <Text style={styles.value}>{formatDuration(parseInt(duracion))}</Text>

        <Text style={styles.label}>Precio:</Text>
        <Text style={styles.value}>{precio}€</Text>
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={[styles.button, styles.cancelar]} onPress={handleCancelar}>
          <Text style={styles.cancelarText}>Cancelar</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.confirmar]} onPress={handleReservar}>
          <Text style={styles.buttonText}>Reservar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    marginBottom: 20,
    color: Colors.light.tint,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    marginBottom: 32,
  },
  label: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
  value: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmar: {
    backgroundColor: Colors.light.tint,
  },
  cancelar: {
    borderWidth: 2,
    borderColor: '#c00',
    backgroundColor: 'transparent',
  },
  cancelarText: {
    fontFamily: Fonts.bold,
    color: '#c00',
    fontSize: 16,
  },
  buttonText: {
    fontFamily: Fonts.bold,
    color: '#fff',
    fontSize: 16,
  },
});
