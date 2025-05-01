import { View, Text, Image, StyleSheet } from 'react-native';
import { fotografos } from '@/mocks/mockFotografo';
import { notificaciones } from '@/mocks/mockNotificación';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { CaretRight } from 'phosphor-react-native';

export default function NotificacionesList() {
  

  return (
    <View style={styles.container}>
      {notificaciones.map((noti) => {
        const fotografo = fotografos.find((f) => f.id === noti.fotografoId);
        if (!fotografo) return null;

        let mensaje = '';
        if (noti.actualizacionSesiones) mensaje = 'ha actualizado las sesiones';
        else if (noti.actualizacionPortfolio) mensaje = 'ha actualizado el portfolio';
        else if (noti.subidaDeFotos) mensaje = 'ha subido las fotos de la sesión';

        return (
          <View key={noti.id} style={styles.card}>
            <Image source={{ uri: fotografo.fotografiaUrl }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.nombre}>{fotografo.nombreEstudio}</Text>
              <Text style={styles.mensaje}>{mensaje}</Text>
            </View>
            <CaretRight size={24} color={Colors.light.tint} weight="bold" />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  nombre: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    includeFontPadding: false,
    color: Colors.light.tint,
  },
  mensaje: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    includeFontPadding: false,
    color: '#333',
  },
});
