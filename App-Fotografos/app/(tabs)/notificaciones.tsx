import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMyNotifications } from '../../services/notificationService';
import { useNotificationSocket } from '@/hooks/useNotificationSocket';
import { jwtDecode } from 'jwt-decode';
import { CaretRight } from 'phosphor-react-native';
import Colors from '@/constants/Colors';
import { FontFamily } from '@/constants/Fonts';
import { Notification } from '@/types/notification';
import { StyledText } from '@/components/StyledText';
import { router } from 'expo-router';

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
        setUserId(user.sub);

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
    return (
      <Pressable
        onPress={() => {
          console.log('🔔 Pulsada notificación', item); // 🔁 Aquí sí es corr
          if (item.type === 'SESSION_REQUESTED' && item.bookingId) {
            router.push({
              pathname: '/GestionReservaScreen',
              params: {
                bookingId: item.bookingId?.toString() ?? '',
                clientName: item.title ?? '',
                serviceName: item.serviceName ?? '',
                bookingDate: item.bookingDate ?? '',
                bookingDuration: item.bookingDuration?.toString() ?? '0',
                bookingPrice: item.bookingPrice?.toString() ?? '0',
              },
            });
          }
        }}
        style={styles.card}
      >
        <Image
          source={{ uri: `https://via.placeholder.com/60x60.png?text=${item.title[0]}` }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.nombre}>{item.title}</Text>
          <Text style={styles.mensaje}>{item.message}</Text>
        </View>
        <CaretRight size={24} color={Colors.light.tint} weight="bold" />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <StyledText style={styles.title} weight="bold">Notificaciones</StyledText>
      <Text style={styles.text}>Aquí podrás ver tus notificaciones y mensajes.</Text>
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
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24 },
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
    fontFamily: FontFamily.bold,
    includeFontPadding: false,
    color: Colors.light.tint,
  },
  mensaje: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    includeFontPadding: false,
    color: '#333',
  },
  text: {
    fontSize: 16,
  },
});
