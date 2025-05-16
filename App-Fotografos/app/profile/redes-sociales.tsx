import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StyledText } from '../../components/StyledText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function ComingSoonScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
        <StyledText weight="bold" style={styles.title}> 📸 ¡Muy pronto disponible! </StyledText>
        <StyledText style={styles.subtitle}>
        Estamos preparando esta función con mimo para ti.
        </StyledText>
        <StyledText style={styles.subtitle}>
        ¡Gracias por acompañarnos en esta aventura! 🚀
        </StyledText>


      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <StyledText weight="bold" style={styles.buttonText}>← Volver</StyledText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 220,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.light.tint,
    textAlign: 'center',
    marginBottom: 4,
  },
  button: {
    marginTop: 24,
    paddingVertical: 10,
    paddingHorizontal: 22,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
});
