import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  LayoutAnimation,
  UIManager,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useLocalSearchParams, router } from 'expo-router';

import api from '@/services/api';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

// Habilitar animaciones en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Tipado para los parámetros recibidos
type Params = {
  nombre: string;
  precio: string;
  fotografoId: string;
  duracion: string;
  fotografoNombre: string;
  serviceId: string;
};

export default function ConfirmarReserva() {
  const { nombre, precio, fotografoId, duracion, fotografoNombre, serviceId } = useLocalSearchParams<Params>();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [showAvailability, setShowAvailability] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const fetchAvailability = async () => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setLoading(true);
      setSelectedSlot(null);

      const res = await api.post('/bookings/check-availability', {
        photographerId: Number(fotografoId),
        date: selectedDate,
        duration: Number(duracion),
      });

      setAvailableSlots(res.data.availableSlots || []);
    } catch (err) {
      console.error('Error al consultar disponibilidad:', err);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerDisponibilidad = () => {
    if (!showAvailability) {
      fetchAvailability();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShowAvailability(true);
    } else if (selectedSlot) {
      router.push({
        pathname: '/fotografo/resumenReserva',
        params: {
          nombre,
          precio,
          fotografoId,
          duracion,
          fecha: selectedDate,
          hora: selectedSlot,
          fotografoNombre,
          serviceId,
        },
      });
    }
  };

  const isBotonActivo = !showAvailability || (showAvailability && selectedSlot);

  useEffect(() => {
    if (showAvailability) {
      fetchAvailability();
    }
  }, [selectedDate]);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
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
        onDayPress={(day: DateData) => {
          setSelectedDate(day.dateString);
          setAvailableSlots([]);
          setSelectedSlot(null);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: Colors.light.tint,
          },
        }}
        style={styles.calendar}
      />

      {showAvailability && (
        <View style={styles.availabilityContainer}>
          {loading ? (
            <ActivityIndicator color={Colors.light.tint} size="small" />
          ) : availableSlots.length > 0 ? (
            <View style={styles.chipsWrapper}>
              {availableSlots.map((slot) => (
                <Pressable
                  key={slot}
                  onPress={() => setSelectedSlot(slot)}
                  style={[
                    styles.chip,
                    selectedSlot === slot && styles.chipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedSlot === slot && styles.chipTextSelected,
                    ]}
                  >
                    {slot}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <Text style={styles.noAvailabilityText}>
              No hay disponibilidad para este día.
            </Text>
          )}
        </View>
      )}

      <Pressable
        style={[
          styles.button,
          isBotonActivo ? styles.buttonActive : styles.buttonDisabled,
        ]}
        onPress={handleVerDisponibilidad}
        disabled={!isBotonActivo}
      >
        <Text style={styles.buttonText}>
          {showAvailability ? 'Confirmar Reserva' : 'Ver Disponibilidad'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 24,
    paddingBottom: 40,
    flexGrow: 1,
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
    marginBottom: 12,
    borderColor: Colors.light.tint,
    borderWidth: 1,
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  chipsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  chip: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  chipSelected: {
    backgroundColor: Colors.light.tint,
  },
  chipText: {
    fontFamily: Fonts.regular,
    color: Colors.light.tint,
  },
  chipTextSelected: {
    color: '#fff',
    fontFamily: Fonts.bold,
  },
  noAvailabilityText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#666',
    marginTop: 8,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: Colors.light.tint,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontFamily: Fonts.bold,
    color: '#fff',
    fontSize: 16,
  },
});
