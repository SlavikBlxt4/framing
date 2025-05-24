import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CaretRight } from 'phosphor-react-native';

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

import { getBookingHistory } from '@/services/bookingsService';
import { BookingHistoryDto } from '@/types/bookings';
import FilterDrawer from '../fm_drawers/FilterDrawer';
import FloatingSortButton from '../fm_input/FloatingSortButton';

const ReservasList: React.FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [reservas, setReservas] = useState<BookingHistoryDto[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [showPastSessions, setShowPastSessions] = useState(false);
  const [sortBy, setSortBy] = useState<'fecha-asc' | 'fecha-desc' | 'nombre-asc' | 'nombre-desc'>('fecha-asc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'active' | 'done'>('all');

  useEffect(() => {
    getBookingHistory()
      .then(setReservas)
      .catch((err) => console.error('Error al cargar reservas:', err));
  }, []);

  const handleSortChange = useCallback((option: typeof sortBy) => {
    setSortBy(option);
    setDrawerVisible(false);
  }, []);

  const estadoTraducido: Record<string, string> = {
    pending: 'Pendiente de aceptar',
    active: 'Confirmada',
    done: 'Finalizada',
  }

  const reservasFiltradas = useMemo(() => {
    return reservas.filter((res) => {
      const fecha = new Date(res.date);
      const isFuture = fecha >= new Date();
      const matchesStatus = statusFilter === 'all' || res.status === statusFilter;
      return matchesStatus && (showPastSessions || isFuture);
    });
  }, [reservas, showPastSessions, statusFilter]);

  const reservasOrdenadas = useMemo(() => {
    const sorted = [...reservasFiltradas];
    if (sortBy.includes('fecha')) {
      sorted.sort((a, b) =>
        sortBy === 'fecha-asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else {
      sorted.sort((a, b) =>
        sortBy === 'nombre-asc'
          ? a.serviceName.localeCompare(b.serviceName)
          : b.serviceName.localeCompare(a.serviceName)
      );
    }
    return sorted;
  }, [reservasFiltradas, sortBy]);

  const renderItem = ({ item }: { item: BookingHistoryDto }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() =>
        router.push({
          pathname: '/inicio/reservas/DetalleReserva',
          params: {
            bookingId: item.bookingId.toString(),
            nombre: item.serviceName,
            fecha: new Date(item.date).toLocaleDateString(),
            hora: new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            fotografiaUrl: '', // opcional
            direccion: '',
            puntuacion: '',
            status: item.status,
          },
        })
      }
    >
      <View style={styles.textContainer}>
        <Text style={styles.fotografo}>{item.serviceName}</Text>
        <Text style={styles.fecha}>
          {new Date(item.date).toLocaleDateString()} · {estadoTraducido[item.status]}
        </Text>
      </View>
      <CaretRight size={20} weight="bold" color={Colors.light.tint} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reservasOrdenadas}
        keyExtractor={(item) => item.bookingId.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          <View style={styles.footer}>
            <View style={styles.footerDot} />
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <FloatingSortButton onPress={() => setDrawerVisible(true)} />

      <FilterDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSortChange={handleSortChange}
        selectedSort={sortBy}
        showPastSessions={showPastSessions}
        onTogglePastSessions={setShowPastSessions}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
    </View>
  );
};

export default ReservasList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContainer: {
    backgroundColor: Colors.light.background,
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  textContainer: {
    flexDirection: 'column',
  },
  fotografo: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.light.tint,
  },
  fecha: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
});
