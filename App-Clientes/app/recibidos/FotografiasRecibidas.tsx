// React y React Native
import React, { useLayoutEffect, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';

// Navegación (expo-router)
import { useNavigation, useRouter } from 'expo-router';

// Íconos
import { CaretRight } from 'phosphor-react-native';

// Utilidades de fecha
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// API real
import api from '@/services/api';

// Formateador ISO -> “12 de abril de 2025”
const formatFecha = (isoStr: string) => {
  const fecha = new Date(isoStr);
  return format(fecha, "d 'de' MMMM 'de' yyyy", { locale: es });
};

// DTO de respuesta desde el backend
interface BookingResumenDto {
  photographerName: string;
  date: string;
  imageCount: number;
}

const FotografiasScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [bookings, setBookings] = useState<BookingResumenDto[]>([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Fotografías recibidas',
    });
  }, [navigation]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get<BookingResumenDto[]>('/bookings/with-images');
        setBookings(response.data);
      } catch (error) {
        console.error('Error al obtener fotografías recibidas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const renderItem = ({ item }: { item: BookingResumenDto }) => (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/recibidos/DetalleFotografias',
          params: {
            nombreEstudio: item.photographerName,
            fecha: item.date,
            archivos: item.imageCount,
          },
        })
      }
    >
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{item.photographerName}</Text>
        <Text style={styles.detalle}>
          {formatFecha(item.date)} · {item.imageCount} archivos
        </Text>
      </View>
      <CaretRight size={24} color="#333" weight="bold" />
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1e3e7',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  titulo: {
    fontWeight: 'bold',
    color: '#007d8a',
    fontSize: 15,
    marginBottom: 4,
  },
  detalle: {
    color: '#333',
    fontSize: 14,
  },
});

export default FotografiasScreen;
