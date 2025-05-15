import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StyledText } from '../StyledText';
import { CaretRight } from 'phosphor-react-native';
import Colors from '@/constants/Colors';

interface NotificacionCardProps {
  nombre: string;
  mensaje: string;
  imagen: any;
  onPress?: () => void;
}

const NotificacionCard = ({ nombre, mensaje, imagen, onPress }: NotificacionCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Image source={imagen} style={styles.avatar} />
      <View style={styles.textContainer}>
        <StyledText style={styles.nombre} weight="bold">{nombre}</StyledText>
        <StyledText style={styles.mensaje}>{mensaje}</StyledText>
      </View>
      <CaretRight size={20} color="#222" />
    </TouchableOpacity>
  );
};

export default NotificacionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    // padding: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  nombre: {
    color: Colors.light.tint,
    fontSize: 15,
  },
  mensaje: {
    color: '#222',
    fontSize: 15,
    marginTop: -2,
  },
}); 