// React y React Native
import React from 'react';
import { View, StyleSheet } from 'react-native';

// Componentes
import CardPortfolio from '@/components/fm_cards/TarjetaPortfolio';

// Datos simulados
import { fotosPortfolio } from '@/mocks/mockPortfolio';

export default function Portfolio() {
  return (
    // Contenedor principal del grid de tarjetas
    <View style={styles.container}>
      {/* Mapeo de cada foto para renderizar una tarjeta */}
      {fotosPortfolio.map((foto, index) => (
        <CardPortfolio 
          key={index} // Clave única para cada tarejta (idealmente usar IDúnico si existiera)
          imageUrl={foto.imageUrl} // URL de la imagen
          initialLikes={foto.likes} // Número inicial de likes 
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
