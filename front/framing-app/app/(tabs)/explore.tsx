import React, { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@/components/fm_input/BarraDeBusqueda';
import GridFotografos from '@/components/fm_grids/GridFotografos';
import FloatingSortButton from '@/components/fm_input/FloatingSortButton';
import FilterDrawerExplorar from '@/components/fm_drawers/FilterDrawerExplorar';
import { fotografos } from '@/mocks/mockFotografo';

export default function ExplorarScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [sortBy, setSortBy] = useState<'nombre-asc' | 'nombre-desc'>('nombre-asc');
  const [search, setSearch] = useState('');

  const fotografosOrdenados = useMemo(() => {
    return [...fotografos].sort((a, b) =>
      sortBy === 'nombre-asc'
        ? a.nombreEstudio.localeCompare(b.nombreEstudio)
        : b.nombreEstudio.localeCompare(a.nombreEstudio)
    );
  }, [sortBy]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar value={search} onChangeText={setSearch} />
      </View>

      <GridFotografos
        sortBy={sortBy}
        searchQuery={search}
      />

      <FloatingSortButton onPress={() => setDrawerVisible(true)} />

      <FilterDrawerExplorar
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSortChange={setSortBy}
        selectedSort={sortBy}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  container: {
    paddingHorizontal: 25,
    paddingTop: 10,
  },
});
