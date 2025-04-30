// React y React Native
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

// Navegación y parámetros
import { useLocalSearchParams } from 'expo-router';

// Componentes de terceros
import { Calendar } from 'react-native-calendars';

// Constantes del proyecto
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';


// Componente para confirmar una reserva de sesión fotográfica
export default function ConfirmarReserva() {
  // Extrae los parámetros de la ruta (nombre y precio de la sesión)
  const { nombre, precio } = useLocalSearchParams();

  // Estado que guarda la fecha seleccionada, con la fecha de hoy por defecto
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Función que se ejecuta al confirmar la reserva
  const handleConfirmar = () => {
    alert(`Reserva confirmada para ${selectedDate}`);
  };

  return (
    <View style={styles.container}>
      {/* Titulo principal */}
      <Text style={styles.title}>Confirmación de Reserva</Text>

      {/* Tarjeta con los detalles de la reserva */}
      <View style={styles.card}>
        <Text style={styles.label}>Sesión:</Text>
        <Text style={styles.value}>{nombre}</Text>

        <Text style={styles.label}>Fecha seleccionada:</Text>
        <Text style={styles.value}>{selectedDate}</Text>

        <Text style={styles.label}>Precio:</Text>
        <Text style={styles.value}>{precio}€</Text>
      </View>

      {/* Calendario para elegir una fecha */}
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

      {/* Botón para confirmar la reserva */}
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
