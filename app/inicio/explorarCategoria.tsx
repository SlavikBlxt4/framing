// React y React Native
import { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';

// Navegación
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

// Componentes propios
import GridFotografos from '@/components/fm_grids/GridFotografos';

// Datos simulados
import { categorias } from '@/mocks/mockCategoria';


export default function ExplorarCategoriaScreen() {
  // Obtiene el parámetro "categoriaId" de la URL (tipo string)
  const { categoriaId } = useLocalSearchParams<{ categoriaId: string }>();

  // Hook para acceder a la navegación (React Navigation)
  const navigation = useNavigation();

  // Busca el nombre de la categoría correspondiente al ID recibido
  const nombreCategoria = categorias.find(c => c.id === Number(categoriaId))?.nombreCategoria || '';

  // Establece el título del header cuando el componente se monta o cambia el nombre
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Fotógrafos de ${nombreCategoria}`,
    });
  }, [navigation, nombreCategoria]);

  // Renderiza la grid de fotógrafos filtrada por categoría
  return (
    <GridFotografos categoriaId={Number(categoriaId)} />
  );
}

const styles = StyleSheet.create({
});
