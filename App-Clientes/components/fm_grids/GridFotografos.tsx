import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Photographer } from '@/types/photographer';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import TarjetaFotografo from '../fm_cards/TarjetaFotografo';
import api from '@/services/api';

type Props =
  | { data: Photographer[]; categoriaId?: undefined } // para búsqueda
  | { categoriaId: number; data?: undefined }; // para filtros por categoría

export default function GridFotografos(props: Props) {
  const [internalData, setInternalData] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);

  const shouldFetchByCategory = props.categoriaId !== undefined;

  useEffect(() => {
    const fetchPhotographers = async () => {
      if (!shouldFetchByCategory) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get<Photographer[]>(
          `/users/by-category/${props.categoriaId}`
        );
        setInternalData(res.data);
      } catch (error) {
        console.error('Error al obtener fotógrafos por categoría:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, [props.categoriaId]);

  const data = shouldFetchByCategory ? internalData : props.data ?? [];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <TarjetaFotografo
              id={item.id}
              nombreEstudio={item.name}
              fotografiaUrl={item.url_profile_image ?? ''}
              puntuacion={item.averageRating}
              direccion={
                item.locations[0]?.coordinates?.coordinates?.join(', ') ??
                'Sin dirección'
              }
              fotoPortada={item.url_cover_image ?? ''}
              seguidores={0}
              verificado={item.active}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No se encontraron fotógrafos.</Text>
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
    paddingBottom: 60,
    paddingTop: 20,
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
