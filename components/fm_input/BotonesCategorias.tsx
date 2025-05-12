import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { getCategorias } from '@/services/categoryService';
import { Categoria } from '@/types/category';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function BotonesCategoriasGrid() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const ITEM_MARGIN = 8;
  const NUM_COLUMNS = 2;
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - ITEM_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.light.tint} style={{ marginTop: 32 }} />;
  }

  const renderItem = ({ item }: { item: Categoria }) => (
    <Pressable
      style={[styles.boton, { width: itemWidth }]}
      onPress={() =>
        router.push({
          pathname: '/inicio/explorarCategoria',
          params: { categoriaId: item.id.toString() },
        })
      }
    >
      <Text style={styles.texto}>{item.name}</Text>
    </Pressable>
  );

  return (
    <FlatList
      data={categorias}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={NUM_COLUMNS}
      contentContainerStyle={styles.grid}
      columnWrapperStyle={{ gap: ITEM_MARGIN }}
      ItemSeparatorComponent={() => <View style={{ height: ITEM_MARGIN }} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    height: '100%',
  },
  boton: {
    aspectRatio: 3, // ancho:alto = 2:1
    backgroundColor: Colors.light.tint,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.background,
  },
  texto: {
    color: Colors.light.background,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
});
