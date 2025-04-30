import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { Heart } from 'phosphor-react-native';

type Props = {
  imageUrl: string;
  initialLikes: number;
};

const CardPortfolio: React.FC<Props> = ({ imageUrl, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prev) => prev + (liked ? -1 : 1));
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Pressable style={styles.likeRow} onPress={toggleLike}>
        <Heart
          size={24}
          weight={liked ? 'fill' : 'regular'}
          color={liked ? '#E91E63' : '#000'}
        />
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
