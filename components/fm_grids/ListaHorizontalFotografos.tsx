import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import TarjetaFotografo from '../fm_cards/TarjetaFotografo';
import { fotografos } from '@/mocks/mockFotografo';
import { ArrowRight } from 'phosphor-react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { router } from 'expo-router';
// import { categorias } from '@/mocks/mockCategoria';
import { Categoria } from '@/types/category';

type Props = {
  categoria: string;
  categorias: Categoria[];
};

export default function ListarHorizontalFotografos({ categoria, categorias }: Props) {
    // 1 -> Busca el ID de la categoría por su nombre
    const categoriaId = categorias.find(cat => cat.name === categoria)?.id || null;

    // 2 -> Filtra los fotógrafos por ese id
    const fotografosFiltrados = fotografos.filter(fotografo => fotografo.categoriaId === categoriaId);

    // 3 -> Si no hya fotógrafos para esa categoría, no renderizar la sección
    if (!categoriaId || fotografosFiltrados.length === 0) return null;

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
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingHorizontal: 0 }}
            renderItem={({ item }) => (
              <TarjetaFotografo
                nombreEstudio={item.nombreEstudio}
                fotografiaUrl={item.fotografiaUrl}
                puntuacion={item.puntuacion}
                direccion={item.direccion}
                fotoPortada={item.fotoPortada}
                seguidores={item.seguidores}
                verificado={item.verificado}
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
  list: {}
});
