// React - React Native
import React, { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Componentes
import SearchBar from '@/components/fm_input/BarraDeBusqueda';
import GridFotografos from '@/components/fm_grids/GridFotografos';
import FloatingSortButton from '@/components/fm_input/FloatingSortButton';
import FilterDrawerExplorar from '@/components/fm_drawers/FilterDrawerExplorar';

// Datos simulados
import { fotografos } from '@/mocks/mockFotografo';


// Componente principla de la pantalla "Explorar"
// Muestra una barra de búsqueda, una grid de fotógrafos, un botón flotante para ordenar y un drawer para filtros

export default function ExplorarScreen() {
  // Estado para controlar si el drawer de filtros está visible o no
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Estado para el criterio de ordenamiento (ascendente o descendente por nombre)
  const [sortBy, setSortBy] = useState<'nombre-asc' | 'nombre-desc'>('nombre-asc');

  // Estado para el texto ingresado en la barra de búsqueda
  const [search, setSearch] = useState('');

  // Memoriza la lista de fotógrafos ordenada según el criterio seleccionado
  const fotografosOrdenados = useMemo(() => {
    return [...fotografos].sort((a, b) =>
      sortBy === 'nombre-asc'
        ? a.nombreEstudio.localeCompare(b.nombreEstudio) // orden ascendente alfabético
        : b.nombreEstudio.localeCompare(a.nombreEstudio) // orden descendente alfabético
    );
  }, [sortBy]); // Solo se recalcula si cambia el criterio de orden

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Contenedor principal */}
      <View style={styles.container}>
        {/* Barra de búsqueda, actualiza el estado de 'search' */}
        <SearchBar value={search} onChangeText={setSearch} />
      </View>

      {/* Grid de fotógrafos filitrada por búsqueda y ordenada por sortBy */}
      <GridFotografos
        sortBy={sortBy}
        searchQuery={search}
      />

      {/* Botón flotante que abre el drawer de filtros/ordenamiento */}
      <FloatingSortButton onPress={() => setDrawerVisible(true)} />

      {/* Drawer para elegir criterio de ordenamiento */}
      <FilterDrawerExplorar
        visible={drawerVisible} // Muestra u oculta el drawer
        onClose={() => setDrawerVisible(false)} // Función para cerrar el drawer
        onSortChange={setSortBy} // Cambia el criterio de ordenamiento
        selectedSort={sortBy} // Criterio actualmente seleccionado
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
