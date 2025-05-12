// React - React Native
import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Componentes
import SearchBar from '@/components/fm_input/BarraDeBusqueda';
import GridFotografos from '@/components/fm_grids/GridFotografos';
import FloatingSortButton from '@/components/fm_input/FloatingSortButton';
import FilterDrawerExplorar from '@/components/fm_drawers/FilterDrawerExplorar';

// Datos simulados
import { fotografos } from '@/mocks/mockFotografo';
import BotonesCategorias from '@/components/fm_input/BotonesCategorias';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';


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
    <View >
      {/* Contenedor principal */}
      <View style={styles.container}>
        {/* Barra de búsqueda, actualiza el estado de 'search' */}
        <SearchBar value={search} onChangeText={setSearch} />
      </View>

      <BotonesCategorias></BotonesCategorias>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
