import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Star } from 'phosphor-react-native';

type Props = {
  nombre: string;
  fecha: string;
  comentario: string;
  puntuacion: number;
  avatarUrl?: string;
};

const TarjetaCalificacion: React.FC<Props> = ({ nombre, fecha, comentario, puntuacion, avatarUrl }) => {
  const estrellas = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={20}
      weight={i < puntuacion ? 'fill' : 'regular'}
      color="#008080"
      style={{ marginRight: 2 }}
    />
  ));

  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: avatarUrl || 'https://placehold.co/40x40', // Imagen por defecto si no hay avatar
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.nombre}>{nombre}</Text>
          <Text style={styles.fecha}>{fecha}</Text>
        </View>
      </View>

      <View style={styles.estrellas}>
        {estrellas}
      </View>

      <Text style={styles.comentario}>{comentario}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111',
  },
  fecha: {
    fontSize: 14,
    color: '#444',
  },
  estrellas: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  comentario: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default TarjetaCalificacion;
