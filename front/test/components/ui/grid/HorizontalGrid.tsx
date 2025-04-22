import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

const HorizontalGrid = ({ data }) => (
  <FlatList
    data={data}
    horizontal                   // hace la FlatList horizontal
    showsHorizontalScrollIndicator={false}
    
    // opcional: espacio interior de la lista
    contentContainerStyle={styles.contentContainer}
    
    keyExtractor={item => item.key}
    renderItem={() => <View style={styles.cuadro} />}
  />
);

// datos de ejemplo si no pasas nada por props
HorizontalGrid.defaultProps = {
  data: Array.from({ length: 20 }, (_, i) => ({ key: i.toString() })),
};

const styles = StyleSheet.create({
  contentContainer: {
    // paddingHorizontal: 10,   // margen a izquierda/derecha
    gap: 10,
  },
  cuadro: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#000',
    // marginRight: 10,         // separación entre cuadros
  },
});

export default HorizontalGrid;
