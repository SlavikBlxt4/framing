import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Star, SealCheck } from 'phosphor-react-native';
import { Colors } from '@/constants/Colors';

export default function PerfilFotografo() {
  const params = useLocalSearchParams();
  console.log("🔍 Params recibidos:", params);
  
  const {
    nombreEstudio,
    fotografiaUrl,
    puntuacion,
    direccion,
    fotoPortada,
    seguidores,
    verificado,
  } = useLocalSearchParams();

  const handleSeguir = () => {
    // Lógica para seguir al estudio
    console.log('Seguir presionado');
  };  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Portada */}
      <View style={styles.portadaWrapper}>
        <Image source={{ uri: fotoPortada as string }} style={styles.portada} />
      </View>
  
      {/* Avatar fuera del contenedor portada */}
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: fotografiaUrl as string }} style={styles.avatar} />
      </View>

      <View style={styles.seguirButtonWrapper}>
        <Pressable style={styles.seguirButton} onPress={handleSeguir}>
          <Text style={styles.seguirButtonText}>Seguir</Text>
        </Pressable>
      </View>
  
      {/* Info principal */}
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>
          {nombreEstudio} {verificado === 'true' && <SealCheck size={16} weight='duotone' color={Colors.light.tint}/>}
        </Text>
        <View style={styles.ratingRow}>
          <Star size={16} color="#FFD700" weight="fill" />
          <Text style={styles.ratingText}>{puntuacion}</Text>
          <Text style={styles.separator}>·</Text>
          <Text style={styles.seguidores}>{seguidores} seguidores</Text>
        </View>
        <Text style={styles.direccion}>{direccion}</Text>
      </View>
    </ScrollView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  portadaWrapper: {
    position: 'relative',
    width: '100%',
    height: 150,
    paddingHorizontal: 20,
    // overflow: 'hidden',
  },
  portada: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  avatarWrapper: {
    position: 'absolute',
    top: 100, // altura para que sobresalga
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
});
