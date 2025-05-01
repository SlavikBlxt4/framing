// React y React Native
import { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';

// Navegación y parámetros
import { useLocalSearchParams } from 'expo-router';

// Íconos
import { Star, SealCheck } from 'phosphor-react-native';

// Constantes
import Colors from '@/constants/Colors';

// Componentes
import Sesiones from './sesiones';
import Calificaciones from './calificaciones';
import Portfolio from './portfolio';
import Detalles from './detalles';


export default function PerfilFotografo() {
  // Extrae parámetros desde la URL con expo-router
  const {
    id,
    nombreEstudio,
    fotografiaUrl,
    puntuacion,
    direccion,
    fotoPortada,
    seguidores,
    verificado,
  } = useLocalSearchParams();

  // Estado para controlar la pestaña actualmente seleccionada
  const [selectedTab, setSelectedTab] = useState<'sesiones' | 'calificaciones' | 'portfolio' | 'detalles'>('sesiones');
  
  // Acción simulada para botón "seguir"
  const handleSeguir = () => {
    console.log('Seguir presionado');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagen de portada del fotógrafo */}
      <View style={styles.portadaWrapper}>
        <Image source={{ uri: fotoPortada as string }} style={styles.portada} />
      </View>

      {/* Imagen de avatar / perfil */}
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: fotografiaUrl as string }} style={styles.avatar} />
      </View>

      {/* Botón seguir */}
      <View style={styles.seguirButtonWrapper}>
        <Pressable style={styles.seguirButton} onPress={handleSeguir}>
          <Text style={styles.seguirButtonText}>Seguir</Text>
        </Pressable>
      </View>

      {/* Info del fotografo: nombre, puntuacion, seguidores, direccion */}
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>
          {nombreEstudio}{' '}
          {verificado === 'true' && (
            <SealCheck size={16} weight="duotone" color={Colors.light.tint} />
          )}
        </Text>

        {/* Fila con estrella, puntuacion y seguidores */}
        <View style={styles.ratingRow}>
          <Star size={16} color="#FFD700" weight="fill" />
          <Text style={styles.ratingText}>{puntuacion}</Text>
          <Text style={styles.separator}>·</Text>
          <Text style={styles.seguidores}>{seguidores} seguidores</Text>
        </View>
        <Text style={styles.direccion}>{direccion}</Text>
      </View>

      {/* Barra de pestañas (tabs) para mostrar secciones dinámicas */}
      <View style={styles.tabBar}>
        {['sesiones', 'calificaciones', 'portfolio', 'detalles'].map((tab) => (
          <Pressable key={tab} onPress={() => setSelectedTab(tab)}>
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextSelected]}>
              {/* Capitaliza el nombre de la pestaña */}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Contenido que cambia según la pestaña seleccionada */}
      {selectedTab === 'sesiones' && <Sesiones />}
      {selectedTab === 'calificaciones' && <Calificaciones />}
      {selectedTab === 'portfolio' && <Portfolio />}
      {selectedTab === 'detalles' && (<Detalles nombre={nombreEstudio as string} direccion={direccion as string} />)}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  portadaWrapper: {
    width: '100%',
    height: 150,
    paddingHorizontal: 20,
  },
  portada: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
  },
  avatarWrapper: {
    position: 'absolute',
    top: 100,
    left: '50%',
    transform: [{ translateX: -50 }],
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 7,
    borderColor: '#fff',
    backgroundColor: '#eee',
    overflow: 'hidden',
    zIndex: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  seguirButtonWrapper: {
    alignItems: 'flex-end',
    marginTop: 30,
    marginRight: 20,
  },
  seguirButton: {
    backgroundColor: Colors.light.accent,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  seguirButtonText: {
    color: Colors.light.tint,
    fontWeight: '600',
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#333',
  },
  separator: {
    marginHorizontal: 8,
    color: '#999',
    fontSize: 16,
  },
  seguidores: {
    fontSize: 16,
    color: '#333',
  },
  direccion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  tabText: {
    paddingVertical: 8,
    fontSize: 16,
    color: '#999',
  },
  tabTextSelected: {
    color: '#007C82',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: '#007C82',
  },
});
