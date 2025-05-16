import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BookingCard from '@/components/fm_cards/TarjetaSesion';
import { StyledText } from '@/components/StyledText';
import api from '@/services/api'; // asegúrate de que esto es correcto

type Booking = {
  bookingId: number;
  sessionDate: string;
  clientName: string;
  serviceName: string;
};

export default function SesionesScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings/completed-without-images');
        setBookings(response.data);
      } catch (error) {
        console.error('Error cargando sesiones sin imágenes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <View style={styles.container}>
      <StyledText style={styles.title} weight="bold">
        Mandar fotos sesión
      </StyledText>

      <ScrollView style={styles.content}>
        {loading ? (
          <StyledText>Cargando sesiones...</StyledText>
        ) : bookings.length === 0 ? (
          <StyledText>No tienes sesiones pendientes de subir fotos.</StyledText>
        ) : (
          bookings.map((booking) => (
            <BookingCard
              key={booking.bookingId}
              bookingDate={booking.sessionDate}
              clientName={booking.clientName}
              serviceName={booking.serviceName}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  title: {
    fontSize: 24,
  },
  content: {
    paddingVertical: 10,
  },
});
