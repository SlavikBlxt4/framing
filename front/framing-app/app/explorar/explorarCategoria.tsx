import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native'; // <- ESTE
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { categorias } from '@/mocks/mockCategoria';
import GridFotografos from '@/components/sections/GridFotografos';
import { useLayoutEffect } from 'react';

export default function ExplorarCategoriaScreen() {
  const { categoriaId } = useLocalSearchParams<{ categoriaId: string }>();
  const navigation = useNavigation();

  const nombreCategoria = categorias.find(c => c.id === Number(categoriaId))?.nombreCategoria || '';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Fotógrafos de ${nombreCategoria}`,
    });
  }, [navigation, nombreCategoria]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <GridFotografos categoriaId={categoriaId ? Number(categoriaId) : undefined} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
