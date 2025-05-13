// React y React Native
import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';

// Navegación (expo-router)
import { useNavigation, useRouter } from 'expo-router';

// Íconos
import { CaretRight } from 'phosphor-react-native';

// Utilidades de fecha
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Datos simulados (mocks)
import { fotografiasRecibidas } from '@/mocks/mockFotografiasRecibidas';
import { fotografos } from '@/mocks/mockFotografo';


// Función para formatear fechas desde "dd/mm/yyyy" a "1 de enero de 2024" en español
const formatFecha = (fechaStr: string) => {
  const [day, month, year] = fechaStr.split('/');
  const fecha = new Date(`${year}-${month}-${day}`);
  return format(fecha, "d 'de' MMMM 'de' yyyy", { locale: es });
};

const FotografiasScreen = () => {
  const navigation = useNavigation(); // Hook para controlar el header
  const router = useRouter(); // Hook para navegar entre pantallas

  // Establece el titulo del header al montar el componente
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Fotografías recibidas',
    });
  }, [navigation]);

  // Funcion que renderiza cada tarjeta de fotógrafo
  const renderItem = ({ item }: any) => {
    // Busca los datos del fotografo asociado a la sesion
    const fotografo = fotografos.find(f => f.id === item.fotografoId);

    return (
      // Tarjeta presionable que lleva al detalle de las fotos
      <Pressable
        style={styles.card}
        onPress={() => router.push({
          pathname: '/recibidos/DetalleFotografias',
          params: { archivos: item.archivos }
        })}        
      >
        <View style={styles.textContainer}>
          {/* Nombre del estudio o fallback */}
          <Text style={styles.titulo}>{fotografo?.nombreEstudio || 'Estudio fotográfico'}</Text>
          
          {/* Fecha formateada y cantidad de archivos */}
          <Text style={styles.detalle}>
            {formatFecha(item.fecha)} · {item.archivos} archivos
          </Text>
        </View>

        {/* Icono de flecha */}
        <CaretRight size={24} color="#333" weight="bold" />
      </Pressable>
    );
  };

  return (
    // Lista de sesiones con fotos recibidas
    <FlatList
      data={fotografiasRecibidas} // Fuente de datos simulados
      keyExtractor={item => item.id.toString()} // Clave única por elemento
      renderItem={renderItem} // Renderiza cada tarjeta
      contentContainerStyle={styles.container} // Estilo de contenedor
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
