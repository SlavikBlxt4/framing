import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Star } from 'phosphor-react-native';

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
  
      {/* Info principal */}
      <View style={styles.infoContainer}>
        <Text style={styles.nombre}>
          {nombreEstudio} {verificado === 'true' && <Text style={styles.verificado}>✔️</Text>}
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
    height: 220,
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
    top: 160, // altura para que sobresalga
    left: '50%',
    transform: [{ translateX: -50 }],
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
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
    paddingTop: 50,
  },
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  verificado: {
    fontSize: 20,
    color: '#1DA1F2',
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
});
