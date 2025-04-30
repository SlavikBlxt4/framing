import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function ConfirmarReserva() {
  const { nombre, precio } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const handleConfirmar = () => {
    alert(`Reserva confirmada para ${selectedDate}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmación de Reserva</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Sesión:</Text>
        <Text style={styles.value}>{nombre}</Text>

        <Text style={styles.label}>Fecha seleccionada:</Text>
        <Text style={styles.value}>{selectedDate}</Text>

        <Text style={styles.label}>Precio:</Text>
        <Text style={styles.value}>{precio}€</Text>
      </View>

      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: Colors.light.tint,
          },
        }}
        style={styles.calendar}
      />

      <Pressable style={styles.button} onPress={handleConfirmar}>
        <Text style={styles.buttonText}>Confirmar Reserva</Text>
      </Pressable>
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
    marginBottom: 24,
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
  calendar: {
    borderRadius: 12,
    marginBottom: 24,
    borderColor: Colors.light.tint,
    borderWidth: 1,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Fonts.bold,
    color: '#fff',
    fontSize: 16,
  },
});
