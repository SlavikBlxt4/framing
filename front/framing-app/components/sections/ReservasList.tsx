import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { reservas as rawReservas } from '@/mocks/mockReservas';
import { fotografos } from '@/mocks/mockFotografo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Fonts from '@/constants/Fonts';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { CaretRight, FadersHorizontal } from 'phosphor-react-native';
import FilterDrawer from '../framing/FilterDrawer';

const reservas = rawReservas.map((reserva) => {
  const fotografo = fotografos.find((f) => f.id === reserva.fotografoId);
  return {
    ...reserva,
    hora: reserva.hora,
    fotografoNombre: fotografo?.nombreEstudio,
    fotografiaUrl: fotografo?.fotografiaUrl,
    direccion: fotografo?.direccion,
    puntuacion: fotografo?.puntuacion,
  };
});

const ReservasList: React.FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [showPastSessions, setShowPastSessions] = useState(false);
  const [sortBy, setSortBy] = useState<'fecha-asc' | 'fecha-desc' | 'nombre-asc' | 'nombre-desc'>('fecha-desc');

  const handleSortChange = useCallback((option: typeof sortBy) => {
    setSortBy(option);
    setDrawerVisible(false);
  }, []);

  const reservasFiltradas = showPastSessions
    ? reservas
    : reservas.filter((res) => {
        const [d, m, y] = res.fecha.split('/').map(Number);
        const [h, min] = res.hora.split(':').map(Number);
        const fecha = new Date(y, m - 1, d, h, min);
        return fecha >= new Date();
      });

  const reservasOrdenadas = useMemo(() => {
    const sorted = [...reservasFiltradas];
    if (sortBy.includes('fecha')) {
      sorted.sort((a, b) => {
        const [d1, m1, y1] = a.fecha.split('/').map(Number);
        const [d2, m2, y2] = b.fecha.split('/').map(Number);
        return sortBy === 'fecha-asc'
          ? new Date(y1, m1 - 1, d1).getTime() - new Date(y2, m2 - 1, d2).getTime()
          : new Date(y2, m2 - 1, d2).getTime() - new Date(y1, m1 - 1, d1).getTime();
      });
    } else {
      sorted.sort((a, b) =>
        sortBy === 'nombre-asc'
          ? (a.fotografoNombre ?? '').localeCompare(b.fotografoNombre ?? '')
          : (b.fotografoNombre ?? '').localeCompare(a.fotografoNombre ?? '')
      );
    }
    return sorted;
  }, [sortBy, showPastSessions]);

  const renderItem = ({ item }: { item: typeof reservas[0] }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() =>
        router.push({
          pathname: '/reservas/DetalleReserva',
          params: {
            nombre: item.fotografoNombre,
            fecha: item.fecha,
            hora: item.hora,
            fotografiaUrl: item.fotografiaUrl,
            direccion: item.direccion,
            puntuacion: item.puntuacion?.toString(),
          },
        })
      }
    >
      <View style={styles.textContainer}>
        <Text style={styles.fotografo}>{item.fotografoNombre}</Text>
        <Text style={styles.fecha}>{item.fecha}</Text>
      </View>
      <CaretRight size={20} weight="bold" color={Colors.light.tint} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reservasOrdenadas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          <View style={styles.footer}>
            <View style={styles.footerDot} />
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Botón Fijo Ordenar */}
      <View style={[styles.floatingButtonContainer, { bottom: insets.bottom + 20 }]}>
        <Pressable style={styles.floatingButton} onPress={() => setDrawerVisible(true)}>
          <FadersHorizontal size={20} color="#fff" weight="bold" />
          <Text style={styles.floatingButtonText}>Ordenar</Text>
        </Pressable>
      </View>

      <FilterDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSortChange={handleSortChange}
        selectedSort={sortBy}
        showPastSessions={showPastSessions}
        onTogglePastSessions={setShowPastSessions}
      />
    </View>
  );
};

export default ReservasList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  floatingButtonContainer: {
    position: 'absolute',
    right: 20,
    zIndex: 1000,
  },
  floatingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    elevation: 4,
  },
  floatingButtonText: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginLeft: 6,
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
