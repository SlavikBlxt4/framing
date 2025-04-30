import React from 'react';
import { View, StyleSheet } from 'react-native';
import CardPortfolio from '@/components/fm_cards/TarjetaPortfolio';
import { fotosPortfolio } from '@/mocks/mockPortfolio';

export default function Portfolio() {
  return (
    <View style={styles.container}>
      {fotosPortfolio.map((foto, index) => (
        <CardPortfolio key={index} imageUrl={foto.imageUrl} initialLikes={foto.likes} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
