import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { Star } from 'phosphor-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { rateService } from '@/services/ratingsService';
import { RatingRequestDto } from '@/types/ratings';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function RateScreen() {
  const router = useRouter();
  const { serviceId } = useLocalSearchParams();
  const id = typeof serviceId === 'string' ? parseInt(serviceId) : parseInt(serviceId?.[0] || '0');

  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState('');

  const handleSend = async () => {
    if (ratingValue < 1) return Alert.alert('Selecciona una puntuación de 1 a 5');
    const payload: RatingRequestDto = {
      serviceId: id,
      ratingValue,
      comment,
    };
    try {
      await rateService(payload);
      Alert.alert('Gracias por tu valoración');
      router.back();
    } catch (err) {
      Alert.alert('Error', 'No se pudo enviar la valoración');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valora el servicio</Text>
      
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Pressable key={n} onPress={() => setRatingValue(n)}>
            <Star
              size={40}
              weight={ratingValue >= n ? 'fill' : 'regular'}
              color={ratingValue >= n ? Colors.light.tint : '#ccc'}
            />
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder="Escribe un comentario..."
        multiline
        value={comment}
        onChangeText={setComment}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Enviar valoración</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.light.tint,
    textAlign: 'center',
    marginBottom: 30,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 10,
    fontFamily: Fonts.regular,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: Fonts.bold,
    color: '#fff',
    fontSize: 16,
  },
});
