import React, { useState, useMemo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Componentes
import SearchBar from '@/components/fm_input/BarraDeBusqueda';
import GridFotografos from '@/components/fm_grids/GridFotografos';
import FloatingSortButton from '@/components/fm_input/FloatingSortButton';
import FilterDrawerExplorar from '@/components/fm_drawers/FilterDrawerExplorar';
import BotonesCategorias from '@/components/fm_input/BotonesCategorias';

// Servicios
import { getPhotographers } from '@/services/photographerService';
import { Photographer } from '@/types/photographer';

// Constantes
import Colors from '@/constants/Colors';

export default function ExplorarScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [sortBy, setSortBy] = useState<'nombre-asc' | 'nombre-desc'>('nombre-asc');
  const [search, setSearch] = useState('');
  const [photographers, setPhotographers] = useState<Photographer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPhotographers();
        setPhotographers(data);
      } catch (error) {
        console.error('Error al cargar fotógrafos: ', error);
      }
    };

    fetchData();
  }, []);

  const fotografosFiltrados = useMemo(() => {
    return [...photographers]
      .filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        sortBy === 'nombre-asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
  }, [photographers, search, sortBy]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />

      {/* Mostrar botones o resultados de búsqueda */}
      {search.trim() === '' ? (
        <BotonesCategorias />
      ) : (
        <GridFotografos data={fotografosFiltrados} />
      )}

      {/* Botón flotante de ordenamiento (opcional) */}
      {/* <FloatingSortButton sortBy={sortBy} setSortBy={setSortBy} /> */}

      {/* Drawer de filtros (opcional) */}
      {/* <FilterDrawerExplorar visible={drawerVisible} onClose={() => setDrawerVisible(false)} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
