import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { CaretRight } from 'phosphor-react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigation, useRouter } from 'expo-router';

// Datos
import { fotografiasRecibidas } from '@/mocks/mockFotografiasRecibidas'; 
import { fotografos } from '@/mocks/mockFotografo'; 

const formatFecha = (fechaStr: string) => {
  const [day, month, year] = fechaStr.split('/');
  const fecha = new Date(`${year}-${month}-${day}`);
  return format(fecha, "d 'de' MMMM 'de' yyyy", { locale: es });
};

const FotografiasScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Fotografías recibidas',
    });
  }, [navigation]);

  const renderItem = ({ item }: any) => {
    const fotografo = fotografos.find(f => f.id === item.fotografoId);

    return (
      <Pressable
        style={styles.card}
        onPress={() => router.push({
          pathname: '/recibidos/DetalleFotografias',
          params: { archivos: item.archivos }
        })}        
      >
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>{fotografo?.nombreEstudio || 'Estudio fotográfico'}</Text>
          <Text style={styles.detalle}>
            {formatFecha(item.fecha)} · {item.archivos} archivos
          </Text>
        </View>
        <CaretRight size={24} color="#333" weight="bold" />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={fotografiasRecibidas}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1e3e7',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  titulo: {
    fontWeight: 'bold',
    color: '#007d8a',
    fontSize: 15,
    marginBottom: 4,
  },
  detalle: {
    color: '#333',
    fontSize: 14,
  },
});

export default FotografiasScreen;
