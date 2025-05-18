import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMyNotifications } from '../../services/notificationService';
import { useNotificationSocket } from '@/hooks/useNotificationSocket';
import { jwtDecode } from 'jwt-decode';
import { CaretRight } from 'phosphor-react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { Notification } from '@/types/notification';

interface TokenPayload {
  sub: number;
  email: string;
  role: 'CLIENT' | 'PHOTOGRAPHER';
}

export default function NotificacionesList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        console.log('📦 Token:', storedToken);

        if (!storedToken) {
          console.log('⚠️ No se encontró token en AsyncStorage');
          return;
        }

        const user = jwtDecode<TokenPayload>(storedToken);
        console.log('👤 Usuario:', user);

        setToken(storedToken);
        setUserId(user.sub); // ✅ usar `sub` como `userId`

        const data = await getMyNotifications();
        console.log('📨 Notificaciones cargadas:', data);
        setNotifications(data);
      } catch (e) {
        console.error('💥 Error en init:', e);
      }
    };

    init();
  }, []);

  useNotificationSocket(userId!, token, (newNoti) => {
    setNotifications((prev) => [newNoti, ...prev]);
  });

  const renderItem = ({ item }: { item: Notification }) => {
    let mensaje = '';
    if (item.type === 'SESSION_UPDATED') mensaje = 'ha actualizado las sesiones';
    else if (item.type === 'PORTFOLIO_UPDATED') mensaje = 'ha actualizado el portfolio';
    else if (item.type === 'PHOTOS_UPLOADED') mensaje = 'ha subido las fotos de la sesión';
    else mensaje = item.message;

    return (
      <View key={item.id} style={styles.card}>
        <Image
          source={{ uri: `https://via.placeholder.com/60x60.png?text=${item.title[0]}` }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.nombre}>{item.title}</Text>
          <Text style={styles.mensaje}>{mensaje}</Text>
        </View>
        <CaretRight size={24} color={Colors.light.tint} weight="bold" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
