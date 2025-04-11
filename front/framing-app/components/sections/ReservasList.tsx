import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Menu, Provider as PaperProvider } from 'react-native-paper';
import { reservas as mockReservas } from '@/mocks/mockReservas';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Fonts from '@/constants/Fonts';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import {
  CaretRight,
  Check,
  FadersHorizontal,
  Calendar,
  SortAscending,
  SortDescending,
} from 'phosphor-react-native';

type SortOption = 'fecha-desc' | 'fecha-asc' | 'nombre-asc' | 'nombre-desc';

type Reserva = {
  id: string;
  fecha: string;
  fotografo: string;
};

const ReservasList: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('fecha-desc');

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const router = useRouter();

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    closeMenu();
  };

  const reservasOrdenadas = useMemo(() => {
    const sorted = [...mockReservas];
    if (sortBy.includes('fecha')) {
      sorted.sort((a, b) => {
        const [d1, m1, y1] = a.fecha.split('/').map(Number);
        const [d2, m2, y2] = b.fecha.split('/').map(Number);
        const dateA = new Date(y1, m1 - 1, d1);
        const dateB = new Date(y2, m2 - 1, d2);
        return sortBy === 'fecha-asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    } else {
      sorted.sort((a, b) =>
        sortBy === 'nombre-asc'
          ? a.fotografo.localeCompare(b.fotografo)
          : b.fotografo.localeCompare(a.fotografo)
      );
    }
    return sorted;
  }, [sortBy]);

  const renderItem = ({ item }: { item: Reserva }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => router.push({pathname: '/reservas/DetalleReserva', params: { nombre: item.fotografo, fecha: item.fecha}})}>
      <View style={styles.textContainer}>
        <Text style={styles.fotografo}>{item.fotografo}</Text>
        <Text style={styles.fecha}>{item.fecha}</Text>
      </View>
      <CaretRight size={20} weight="bold" color={Colors.light.tint} />
    </TouchableOpacity>
  );

  const sortOptions: { label: string; value: SortOption; icon: JSX.Element }[] = [
    {
      label: 'Fecha (más reciente)',
      value: 'fecha-desc',
      icon: <Calendar size={18} color={Colors.light.tint} weight="bold" />,
    },
    {
      label: 'Fecha (más antigua)',
      value: 'fecha-asc',
      icon: <Calendar size={18} color={Colors.light.tint} weight="fill" />,
    },
    {
      label: 'Nombre (A-Z)',
      value: 'nombre-asc',
      icon: <SortAscending size={18} color={Colors.light.tint} weight="bold" />,
    },
    {
      label: 'Nombre (Z-A)',
      value: 'nombre-desc',
      icon: <SortDescending size={18} color={Colors.light.tint} weight="bold" />,
    },
  ];

  return (
    <PaperProvider>
      <FlatList
        data={reservasOrdenadas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContainer, { paddingTop: insets.top + 20 }]}
        ListHeaderComponent={
          <View style={styles.sortContainer}>
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              contentStyle={styles.menuContent}
              anchor={
                <TouchableOpacity style={styles.sortButton} onPress={openMenu}>
                  <FadersHorizontal size={18} color={Colors.light.tint} weight="bold" />
                  <Text style={styles.sortButtonText}> Ordenar</Text>
                </TouchableOpacity>
              }
            >
              {sortOptions.map(({ label, value, icon }) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => handleSortChange(value)}
                  style={[
                    styles.menuItem,
                    sortBy === value && styles.menuItemActive,
                  ]}
                >
                  <View style={styles.menuItemLeft}>
                    {icon}
                    <Text
                      style={[
                        styles.menuItemText,
                        sortBy === value && styles.menuItemTextActive,
                      ]}
                    >
                      {label}
                    </Text>
                  </View>
                  {sortBy === value && (
                    <Check size={16} weight="bold" color={Colors.light.tint} />
                  )}
                </TouchableOpacity>
              ))}
            </Menu>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </PaperProvider>
  );
};

export default ReservasList;

const styles = StyleSheet.create({
  listContainer: {},
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
  sortContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButtonText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.light.tint,
    marginLeft: 4,
  },
  menuContent: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // si no funciona en tu versión, usa marginLeft en el texto
  },
  menuItemActive: {
    backgroundColor: Colors.light.tint + '20',
  },
  menuItemText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: '#333',
  },
  menuItemTextActive: {
    color: Colors.light.tint,
  },
});
