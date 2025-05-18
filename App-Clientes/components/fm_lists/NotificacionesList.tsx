import { View, Text, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { getMyNotifications } from '../../services/notificationService';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { CaretRight } from 'phosphor-react-native';
import { Notification } from '@/types/notification';

export default function NotificacionesList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getMyNotifications()
      .then(setNotifications)
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      {notifications.map((noti) => {
        let mensaje = '';
        if (noti.type === 'SESSION_UPDATED') mensaje = 'ha actualizado las sesiones';
        else if (noti.type === 'PORTFOLIO_UPDATED') mensaje = 'ha actualizado el portfolio';
        else if (noti.type === 'PHOTOS_UPLOADED') mensaje = 'ha subido las fotos de la sesión';
        else mensaje = noti.message; // fallback

        return (
          <View key={noti.id} style={styles.card}>
            {/* Si tu backend te da el nombre o imagen del fotógrafo, reemplaza aquí */}
            <Image
              source={{ uri: `https://via.placeholder.com/60x60.png?text=${noti.title[0]}` }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.nombre}>{noti.title}</Text>
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
