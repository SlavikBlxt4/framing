import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import TarjetaSesiones from '@/components/framing/TarjetaSesiones';
import { useRouter } from 'expo-router';
import { ArrowRight, Bookmark } from 'phosphor-react-native';
import { reservas } from '@/mocks/mockReservas';
import { fotografos } from '@/mocks/mockFotografo';
import { useMemo } from 'react';

export default function SesionesContratadas() {
  const router = useRouter();

  const reservaProxima = useMemo(() => {
    const hoy = new Date();

    const futuras = reservas
      .map((res) => {
        try {
          const [d, m, y] = res.fecha.split('/').map(Number);
          const [h, min] = res.hora.split(':').map(Number);
          return {
            ...res,
            fechaCompleta: new Date(y, m - 1, d, h, min),
          };
        } catch {
          return null;
        }
      })
      .filter((res): res is typeof reservas[0] & { fechaCompleta: Date } => !!res && res.fechaCompleta >= hoy);

    const proxima = futuras.sort((a, b) => a.fechaCompleta.getTime() - b.fechaCompleta.getTime())[0];

    if (!proxima) return null;

    const fotografo = fotografos.find((f) => f.id === proxima.fotografoId);

    return {
      nombre: fotografo?.nombreEstudio ?? '[Estudio fotográfico]',
      fecha: proxima.fecha,
      hora: proxima.hora,
      direccion: fotografo?.direccion ?? '',
      fotografiaUrl: fotografo?.fotografiaUrl ?? '',
      puntuacion: fotografo?.puntuacion?.toString() ?? '',
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Título con flecha */}
      <Pressable style={styles.header} onPress={() => router.push('/reservas/GestorReservas')}>
        <Text style={styles.title}>Sesiones contratadas</Text>
        <ArrowRight size={20} color={Colors.light.text} weight="bold" />
      </Pressable>

      {/* Tarjeta de sesión */}
      <TarjetaSesiones />

      {/* Botón "Ver Reserva" */}
      {reservaProxima && (
        <Pressable
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: '/reservas/DetalleReserva',
              params: reservaProxima,
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
