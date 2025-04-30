// React y React Native
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Íconos (phosphor)
import { Star } from 'phosphor-react-native';

// Interfaz
import { CalificacionesProps } from '@/types/Calificaciones.type';

// [Falta colors + fonts]

// Componente que muestra una tarjeta con calificación de usuario
const TarjetaCalificacion: React.FC<CalificacionesProps> = ({ nombre, fecha, comentario, puntuacion, avatarUrl }) => {
  // Genera un arreglo de 5 estrellas, llenas o vacías según la puntuación recibida
  const estrellas = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={20}
      weight={i < puntuacion ? 'fill' : 'regular'} // 'fill' si la posición es menor que la puntuación, si no 'regular'
      color="#008080" // Color personalizado para las estrellas (puedes usar una constante como Colors.primary)
      style={{ marginRight: 2 }} // Espaciado entre estrellas
    />
  ));

  return (
    // Contenedor principal de la tarjeta
    <View style={styles.card}>

      {/* Bloque con la info del usuario (avatar, nombre, fecha...) */}
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

      {/* Bloque de estrellas y calificaciones */}
      <View style={styles.estrellas}>
        {estrellas}
      </View>

      {/* Comentario del usuario */}
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
