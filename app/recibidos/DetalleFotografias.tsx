// React y React Native
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Navegación y parámetros
import { useLocalSearchParams, useNavigation } from 'expo-router';

// Componentes propios
import PhotoGrid from '@/components/fm_grids/PhotoGrid';


export default function DetalleFotografias() {
  const navigation = useNavigation(); // Hook para controlar la navegacion
  const { archivos } = useLocalSearchParams(); // Extrae parámetros desde la URL

  // Convierte el parametro "archivos" en un entero
  const cantidad = parseInt(archivos as string, 10);

  // Configura el titulo del header al cargar el componente
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Fotografías recibidas',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Muestra la cantidad de archivos recibidos en texto */}
      <Text style={styles.fecha}>Sesión con {cantidad} archivos</Text>
      
      {/* Componente que muestra una grid con esa cantidad de fotos */}
      <PhotoGrid count={cantidad} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fecha: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
});
