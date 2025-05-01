// React Native
import { StyleSheet, View, Text, ImageBackground } from "react-native";

// Constantes
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

// Utilidades de fecha
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

// Datos simulados (mocks)
import { reservas } from '@/mocks/mockReservas';
import { fotografos } from '@/mocks/mockFotografo';


export default function TarjetaSesiones() {
  const hoy = new Date(); // Fecha actual para comparar con reservas

  // Convertir las reservas del mock en objetos Date validos
  const reservasFuturas = reservas
    .map((res) => {
      try {
        const [d, m, y] = res.fecha.split('/').map(Number); // Separar dia, mes y año
        const [h, min] = res.hora.split(':').map(Number); // Separar hora y minutos
        const fechaCompleta = new Date(y, m - 1, d, h, min); // Crear objeto Date
        return { ...res, fechaCompleta }; // Agregar la fecha completa a la reserva
      } catch {
        return null; // En caso de error, descartar
      }
    })
    // Filtrar reservas que no sean nulas y cuya fecha sea futura
    .filter((res): res is typeof reservas[0] & { fechaCompleta: Date } => !!res && res.fechaCompleta >= hoy);

  // Ordenar por fecha más cercana
  const proxima = reservasFuturas.sort((a, b) => a.fechaCompleta.getTime() - b.fechaCompleta.getTime())[0];

  // Buscar el nombre del estudio fotografico asociado a la proxima sesion
  const nombreEstudio =
    fotografos.find((f) => f.id === proxima?.fotografoId)?.nombreEstudio || '[Estudio fotográfico]';

  // Formatear la fecha
  const fechaFormateada = proxima
    ? format(proxima.fechaCompleta, "d 'de' MMMM 'de' yyyy", { locale: es })
    : 'Sin próximas sesiones';

  return (
    <ImageBackground
      source={require('@/assets/images/placeholder_estudio.jpg')}
      style={styles.container}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />

      <View style={styles.textoSuperior}>
      <Text style={styles.regularText}>Estudio:</Text>
        <Text style={styles.boldText}>{nombreEstudio}</Text>
      </View>

      <View style={styles.textoInferior}>
        <Text style={styles.regularText}>Próxima sesión:</Text>
        <Text style={styles.boldText}>{fechaFormateada}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: 'gray',
    borderRadius: 15,
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: Colors.light.tint,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(21, 99, 97, 0.5)',
    borderRadius: 15,
  },
  boldText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.light.background,
  },
  regularText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.light.background,
  },
  textoSuperior: {
    padding: 20,
  },
  textoInferior: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
