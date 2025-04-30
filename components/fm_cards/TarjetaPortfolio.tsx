// React y React Native
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';

// Íconos
import { Heart } from 'phosphor-react-native';

// Dudas sobre si cambiar este prop a interfaz o dejarlo asi
type Props = {
  imageUrl: string;
  initialLikes: number;
};

// Componente funcional que muestra una imagen de portafolio con funcionalidad de "me gusta"
const CardPortfolio: React.FC<Props> = ({ imageUrl, initialLikes }) => {
  // Estado para contar los likes
  const [likes, setLikes] = useState(initialLikes);

  // Estado para saber si el usuario ya dio "me gusta"
  const [liked, setLiked] = useState(false);

  // Función para alternar el estado de "me gusta"
  const toggleLike = () => {
    setLiked(!liked); // Cambia el estado de liked (true <-> false)
    setLikes((prev) => prev + (liked ? -1 : 1)); // Aumenta o disminuye el contador según el estado 
  };

  return (
    // Contenedor principal de la tarjeta
    <View style={styles.card}>
      {/* Imagen del portfolio */}
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {/* Boton de "me gusta" con icono y contador */}
      <Pressable style={styles.likeRow} onPress={toggleLike}>
        <Heart
          size={24}
          weight={liked ? 'fill' : 'regular'}
          color={liked ? '#E91E63' : '#000'}
        />
        {/* Cantidad de likes */}
        <Text style={styles.likeCount}>{likes}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  likeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 6,
  },
  likeCount: {
    fontSize: 16,
  },
});

export default CardPortfolio;
