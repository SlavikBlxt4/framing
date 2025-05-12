import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

import GridFotografos from '@/components/fm_grids/GridFotografos';

import { Categoria } from '@/types/category';
import { getCategorias } from '@/services/categoryService';

export default function ExplorarCategoriaScreen() {
  const { categoriaId } = useLocalSearchParams<{ categoriaId: string }>();
  const navigation = useNavigation();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nombreCategoria, setNombreCategoria] = useState<string>('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
        const categoria = data.find(c => c.id === Number(categoriaId));
        setNombreCategoria(categoria?.name || '');
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    if (categoriaId) {
      fetchCategorias();
    }
  }, [categoriaId]);

  useLayoutEffect(() => {
    if (nombreCategoria) {
      navigation.setOptions({
        headerTitle: `Fotógrafos de ${nombreCategoria}`,
      });
    }
  }, [navigation, nombreCategoria]);

  return (
    <GridFotografos categoriaId={Number(categoriaId)} />
  );
}

const styles = StyleSheet.create({});
