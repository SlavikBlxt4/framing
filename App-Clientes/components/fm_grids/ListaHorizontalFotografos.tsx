import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import TarjetaFotografo from '../fm_cards/TarjetaFotografo';
import { ArrowRight } from 'phosphor-react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { router } from 'expo-router';
import { Categoria } from '@/types/category';
import { Photographer } from '@/types/photographer';

type Props = {
  categoria: string;
  categorias: Categoria[];
  photographers: Photographer[];
};

export default function ListarHorizontalFotografos({ categoria, categorias, photographers }: Props) {
  // 1 -> Busca el ID de la categoría por su nombre
  const categoriaId = categorias.find(cat => cat.name === categoria)?.id;

  // 2 -> Si no se encuentra la categoría, no renderiza nada
  if (!categoriaId) return null;

  // 3 -> Filtra los fotógrafos por ese id
  const fotografosFiltrados = photographers.filter(fotografo =>
    fotografo.services.some(service => service.category.id === categoriaId)
  );

  // 4 -> Si no hay fotógrafos para esa categoría, no renderizar la sección
  if (fotografosFiltrados.length === 0) return null;

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.header}
        onPress={() => router.push({
          pathname: '/inicio/explorarCategoria',
          params: { categoriaId: categoriaId.toString() },
        })}
      >
        <Text style={styles.title}>Fotógrafos de {categoria}</Text>
        <ArrowRight size={20} color={Colors.light.text} weight="bold" />
      </Pressable>

      <FlatList
        data={fotografosFiltrados}
        style={styles.list}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 0 }}
        renderItem={({ item }) => (
          <TarjetaFotografo
            id={item.id}
            nombreEstudio={item.name}
            fotografiaUrl={item.url_profile_image || ''}
            puntuacion={item.averageRating}
            direccion={item.locations[0]?.coordinates.coordinates.join(', ') || ''}
            fotoPortada={item.url_portfolio || ''}
            seguidores={0} // No disponible en la API actual
            verificado={item.active}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.light.text,
  },
  list: {},
});
