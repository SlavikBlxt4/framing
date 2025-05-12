import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import TarjetaSesiones from '@/components/fm_cards/TarjetaSesiones';
import { useRouter } from 'expo-router';
import { ArrowRight, Bookmark } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { getBookingHistory } from '@/services/bookingsService';
import { BookingHistoryDto } from '@/types/bookings';

export default function SesionesContratadas() {
  const router = useRouter();
  const [proxima, setProxima] = useState<BookingHistoryDto | null>(null);

  useEffect(() => {
    getBookingHistory().then((reservas) => {
      const hoy = new Date();
      const activasFuturas = reservas
        .filter(r => r.status === 'active')
        .filter(r => new Date(r.date) >= hoy)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setProxima(activasFuturas[0] || null);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={() => router.push('/inicio/reservas/GestorReservas')}>
        <Text style={styles.title}>Sesiones contratadas</Text>
        <ArrowRight size={20} color={Colors.light.text} weight="bold" />
      </Pressable>

      <TarjetaSesiones />

      {proxima && (
        <Pressable
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: '/inicio/reservas/DetalleReserva',
              params: {
                nombre: proxima.serviceName,
                fecha: new Date(proxima.date).toLocaleDateString(),
                hora: new Date(proxima.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                direccion: '',
                fotografiaUrl: '',
                puntuacion: '',
                status: proxima.status,
              },
            })
          }
        >
          <Text style={styles.buttonText}>Ver reserva</Text>
          <Bookmark size={16} color={Colors.light.background} weight="fill" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.light.text,
  },
  button: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  buttonText: {
    color: Colors.light.background,
    fontFamily: Fonts.regular,
    fontSize: 16,
    includeFontPadding: false,
  },
});
