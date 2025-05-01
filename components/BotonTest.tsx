import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export default function BotonTest() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button mode="contained" onPress={() => console.log('¡Botón presionado!')}>
        ¡Hola desde Paper!
      </Button>
    </View>
  );
}
