import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, BackHandler } from 'react-native';
import { router } from 'expo-router';
import { CheckCircle } from 'phosphor-react-native';

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function ReservaHecha() {
  useEffect(() => {
    const blockBack = () => true;
    BackHandler.addEventListener('hardwareBackPress', blockBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', blockBack);
    };
  }, []);

  const handleGoToGestor = () => {
    router.replace('/inicio/reservas/GestorReservas');
  };

  return (
    <View style={styles.container}>
      <CheckCircle size={96} color={Colors.light.tint} weight="duotone" />
      <Text style={styles.title}>¡Tu solicitud ha sido enviada!</Text>
      <Text style={styles.subtitle}>
        El fotógrafo revisará tu solicitud y te confirmará la sesión lo antes posible.
      </Text>

      <Pressable style={styles.button} onPress={handleGoToGestor}>
        <Text style={styles.buttonText}>Ver reserva</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    marginTop: 24,
    color: Colors.light.tint,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#444',
    marginVertical: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 32,
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: '#fff',
  },
});
