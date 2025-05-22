// app/session/SesionesScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import BookingCard from '@/components/fm_cards/TarjetaSesion';
import { StyledText } from '@/components/StyledText';
import api from '@/services/api';
import Colors from '@/constants/Colors';

type Booking = {
  bookingId: number;
  sessionDate: string;
  clientName: string;
  serviceName: string;
};

export default function SesionesScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const resp = await api.get<Booking[]>('/bookings/completed-without-images');
        setBookings(resp.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StyledText style={styles.title} weight="bold">
        Mandar fotos sesión
      </StyledText>

      <ScrollView style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.light.tint} />
        ) : bookings.length === 0 ? (
          <StyledText>No tienes sesiones pendientes de subir fotos.</StyledText>
        ) : (
          bookings.map((b) => (
            <View key={b.bookingId} style={styles.cardWrapper}>
              {/* La tarjeta en sí */}
              <BookingCard
                bookingDate={b.sessionDate}
                clientName={b.clientName}
                serviceName={b.serviceName}
              />

              {/* Overlay para capturar TODO el toque */}
              <Pressable
                style={StyleSheet.absoluteFill}
                android_ripple={{ color: Colors.light.tint }}
                onPress={() =>
                  router.push({
                    pathname: '/session/uploadPhotos',
                    params: {
                      bookingId: b.bookingId.toString(),
                      clientName: b.clientName,
                      bookingDate: new Date(b.sessionDate).toLocaleDateString(),
                    },
                  })
                }
              />
            </View>
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
    marginBottom: 12,
  },
  content: {
    paddingVertical: 10,
  },
  cardWrapper: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',         // importante para que Pressable.absoluteFill no se salga
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
});
