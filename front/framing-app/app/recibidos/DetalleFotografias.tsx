import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import PhotoGrid from '@/components/fm_grids/PhotoGrid';

export default function DetalleFotografias() {
  const navigation = useNavigation();
  const { archivos } = useLocalSearchParams();

  const cantidad = parseInt(archivos as string, 10); // asegúrate que es número

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Fotografías recibidas',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.fecha}>Sesión con {cantidad} archivos</Text>
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
