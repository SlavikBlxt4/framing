import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Fotografo, getFotografos, getFotografosPorCategoria } from '@/services/fotografosServices';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import TarjetaFotografo from '../framing/TarjetaFotografo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  categoriaId?: number;
};

export default function GridFotografos({ categoriaId }: Props) {
  const [fotografos, setFotografos] = useState<Fotografo[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = categoriaId
        ? await getFotografosPorCategoria(categoriaId)
        : await getFotografos();
      setFotografos(data);
      setLoading(false);
    };

    fetchData();
  }, [categoriaId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={fotografos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <TarjetaFotografo
              nombreEstudio={item.nombreEstudio}
              fotografiaUrl={item.fotografiaUrl}
              puntuacion={item.puntuacion}
            />
          </View>
        )}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>No se encontraron fotógrafos.</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: Colors.light.background,
  },
  content: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardWrapper: {
    width: '48%',
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    fontFamily: Fonts.regular,
    color: Colors.light.text,
    fontSize: 16,
  },
});
