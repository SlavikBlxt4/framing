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
      <Image source={{ uri: fotoPortada as string }} style={styles.portada} />

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

      {/* Imagen del fotógrafo o avatar */}
      <Image source={{ uri: fotografiaUrl as string }} style={styles.avatar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  portada: {
    width: '100%',
    height: 220,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
  avatar: {
    marginTop: 16,
    marginHorizontal: 20,
    height: 300,
    borderRadius: 12,
    resizeMode: 'cover',
  },
});
