import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Star, SealCheck } from 'phosphor-react-native';
import Colors from '@/constants/Colors';
import { getPhotographerById } from '@/services/photographerService';
import { Photographer } from '@/types/photographer';

import Sesiones from './sesiones';
import Calificaciones from './calificaciones';
import Portfolio from './portfolio';
import Detalles from './detalles';

export default function PerfilFotografo() {
  const { id } = useLocalSearchParams();
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [loading, setLoading] = useState(true);
  const [fotoPortadaError, setFotoPortadaError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'sesiones' | 'calificaciones' | 'portfolio' | 'detalles'>('sesiones');

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        if (id) {
          const data = await getPhotographerById(Number(id));
          setPhotographer(data);
        }
      } catch (error) {
        console.error('Error fetching photographer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographer();
  }, [id]);

  const handleSeguir = () => {
    console.log('Seguir presionado');
  };

  if (loading || !photographer) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagen de portada del fotógrafo */}
      <View style={styles.portadaWrapper}>
        <Image
          source={
            fotoPortadaError || !photographer.url_cover_image
              ? require('@/assets/images/placeholder_portada.png')
              : { uri: photographer.url_cover_image }
          }
          onError={() => setFotoPortadaError(true)}
          style={styles.portada}
        />
      </View>

      {/* Imagen de avatar / perfil */}
      <View style={styles.avatarWrapper}>
        <Image
          source={
            avatarError || !photographer.url_profile_image
              ? require('@/assets/images/placeholder_photographer.png')
              : { uri: photographer.url_profile_image }
          }
          onError={() => setAvatarError(true)}
          style={styles.avatar}
        />
      </View>

      <View style={styles.seguirButtonWrapper}>
        <Pressable style={styles.seguirButton} onPress={handleSeguir}>
          <Text style={styles.seguirButtonText}>Seguir</Text>
        </Pressable>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>
          {photographer.name}{' '}
          {photographer.active && (
            <SealCheck size={16} weight="duotone" color={Colors.light.tint} />
          )}
        </Text>

        <View style={styles.ratingRow}>
          <Star size={16} color="#FFD700" weight="fill" />
          <Text style={styles.ratingText}>{photographer.averageRating.toFixed(1)}</Text>
          <Text style={styles.separator}>·</Text>
          <Text style={styles.seguidores}>{photographer.services.length} servicios</Text>
        </View>
        <Text style={styles.direccion}>
          {photographer.locations[0]?.coordinates.coordinates.join(', ') || 'Ubicación no disponible'}
        </Text>
      </View>

      <View style={styles.tabBar}>
        {['sesiones', 'calificaciones', 'portfolio', 'detalles'].map((tab) => (
          <Pressable key={tab} onPress={() => setSelectedTab(tab as any)}>
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextSelected]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {selectedTab === 'sesiones' && (
        <Sesiones
          services={photographer.services}
          photographerId={photographer.id}
          photographerName={photographer.name}
        />
      )}
      {selectedTab === 'calificaciones' && <Calificaciones />}
      {selectedTab === 'portfolio' && <Portfolio />}
      {selectedTab === 'detalles' && (
        <Detalles
          email={photographer.email}
          phone={photographer.phone_number}
          direccion={
            photographer.locations[0]
              ? photographer.locations[0].coordinates.coordinates.join(', ')
              : 'Ubicación no disponible'
          }
          availability={photographer.availability}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingBottom: 32,
    backgroundColor: '#fff',
    flex: 1,
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
