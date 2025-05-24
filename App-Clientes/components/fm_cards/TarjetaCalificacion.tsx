import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Star } from 'phosphor-react-native';

import { CalificacionesProps } from '@/types/Calificaciones.type';
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';

const TarjetaCalificacion: React.FC<CalificacionesProps> = ({
  nombre,
  fecha,
  comentario,
  puntuacion,
  avatarUrl,
}) => {
  const estrellas = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={20}
      weight={i < puntuacion ? 'fill' : 'regular'}
      color={Colors.light.tint}
      style={{ marginRight: 2 }}
    />
  ));

  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: avatarUrl || 'https://placehold.co/40x40',
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.nombre}>{nombre}</Text>
          <Text style={styles.fecha}>{fecha}</Text>
        </View>
      </View>

      <View style={styles.estrellas}>{estrellas}</View>

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
    borderWidth: 1,
    borderColor: Colors.light.accent,
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
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.light.text,
  },
  fecha: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  estrellas: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  comentario: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
  },
});

export default TarjetaCalificacion;
