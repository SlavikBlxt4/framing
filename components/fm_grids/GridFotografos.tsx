import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Servicios
import { getPhotographers } from '@/services/photographerService';
import { Photographer } from '@/types/photographer';

// Constantes
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

// Componentes
import TarjetaFotografo from '../fm_cards/TarjetaFotografo';

type Props = {
  categoriaId?: number;
  sortBy?: 'nombre-asc' | 'nombre-desc';
  searchQuery?: string;
};

export default function GridFotografos({ categoriaId, sortBy = 'nombre-asc', searchQuery = '' }: Props) {
  const [fotografos, setFotografos] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getPhotographers();
        setFotografos(data);
      } catch (error) {
        console.error('Error fetching photographers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fotografosFiltrados = fotografos
    .filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
      const matchesCategory = categoriaId
        ? f.services.some(s => s.category.id === categoriaId)
        : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) =>
      sortBy === 'nombre-asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={fotografosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <TarjetaFotografo
              nombreEstudio={item.name}
              fotografiaUrl={item.url_profile_image ?? ''}
              puntuacion={item.averageRating}
              direccion={item.locations[0]?.coordinates?.coordinates?.join(', ') ?? 'Sin dirección'}
              fotoPortada={item.url_portfolio ?? ''}
              seguidores={0} // Ajusta si tienes esta info
              verificado={item.active} // Puedes cambiar según lógica
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
});
