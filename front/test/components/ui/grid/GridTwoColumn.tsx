import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

const GridTwoColumn = () => {
  // Datos de ejemplo: 10 items numerados
  const data = Array.from({ length: 10 }, (_, i) => ({ key: i.toString() }));

  return (
    <FlatList
    data={data}
    numColumns={2}
    keyExtractor={item => item.key}

    // 1. Fondo y flex del contenedor
    style={styles.list}

    // 2. Padding y flexGrow para que justifyContent funcione
    contentContainerStyle={styles.contentContainer}

    // 3. Cada fila de 2 items: espaciarlos horizontalmente
    columnWrapperStyle={styles.row}

    renderItem={() => <View style={styles.cuadro} />}
  />
  );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,           // obliga al container interno a expandirse
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
      cuadro: {
        width: 100,
        height: 100,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: '#000',
    },
});

export default GridTwoColumn;
