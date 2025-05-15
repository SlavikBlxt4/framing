import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../../components/Themed';
import BookingCard from '@/components/fm_cards/TarjetaSesion';
import { StyledText } from '@/components/StyledText';
import Colors from '@/constants/Colors';

export default function SesionesScreen() {
  return (
    <View style={styles.container}>
      <StyledText style={styles.title} weight="bold">Sesiones</StyledText>
      <ScrollView style={styles.content}>
        <BookingCard
        bookingDate="2024-11-01T10:00:00.000Z"
        clientName="Juan Pérez"
        serviceName="Sesión de comunión"
      />
      <BookingCard
        bookingDate="2024-11-01T10:00:00.000Z"
        clientName="Juan Pérez"
        serviceName="Sesión de comunión"
      />
      <BookingCard
        bookingDate="2024-11-01T10:00:00.000Z"
        clientName="Juan Pérez"
        serviceName="Sesión de comunión"
      />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  title: {
    fontSize: 24,
  },
  separator: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.light.text,
    opacity: 0.2,
    height: 1,
    // width: '80%',
  },
  text: {
    fontSize: 16,
  },
  content: {
    paddingVertical: 10,
  }
}); 