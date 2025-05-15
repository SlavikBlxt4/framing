import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Photographer } from '@/types/photographer';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import TarjetaFotografo from '../fm_cards/TarjetaFotografo';

type Props = {
  data: Photographer[];
};

export default function GridFotografos({ data }: Props) {
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
              direccion={item.locations[0]?.coordinates?.coordinates?.join(', ') ?? 'Sin dirección'}
              fotoPortada={item.url_portfolio ?? ''}
              seguidores={0} // Ajustar si tienes esta info
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
});
