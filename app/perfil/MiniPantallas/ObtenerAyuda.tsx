import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import ScrollWithAnimatedHeader from '@/components/framing/ScrollWithAnimatedHeader';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

// Íconos de ayuda
import {
  Question,
  Envelope,
  WarningCircle,
  ChatCircleDots,
  ArrowRight,
} from 'phosphor-react-native';

export default function ObtenerAyudaScreen() {
  const router = useRouter();

  const handleStaticPress = (label: string) => {
    Alert.alert(label, 'Esta opción estará disponible próximamente.');
  };

  return (
    <ScrollWithAnimatedHeader title="">
      <View style={styles.container}>
        <Text style={styles.title}>Centro de ayuda</Text>
        <Text style={styles.subtitle}>
          Estamos aquí para ayudarte. Aunque el soporte es simulado en esta versión, estas funciones estarán disponibles muy pronto.
        </Text>

        <View style={styles.group}>
          <Pressable style={styles.item} onPress={() => handleStaticPress('Preguntas frecuentes')}>
            <Question size={20} color={Colors.light.tint} />
            <Text style={styles.label}>Preguntas frecuentes</Text>
            <ArrowRight size={16} color={Colors.light.text} />
          </Pressable>

          <Pressable style={styles.item} onPress={() => handleStaticPress('Contactar con soporte')}>
            <Envelope size={20} color={Colors.light.tint} />
            <Text style={styles.label}>Contactar con soporte</Text>
            <ArrowRight size={16} color={Colors.light.text} />
          </Pressable>

          <Pressable style={styles.item} onPress={() => handleStaticPress('Reportar un problema')}>
            <WarningCircle size={20} color={Colors.light.tint} />
            <Text style={styles.label}>Reportar un problema</Text>
            <ArrowRight size={16} color={Colors.light.text} />
          </Pressable>

          <Pressable style={styles.item} onPress={() => handleStaticPress('Chat de ayuda')}>
            <ChatCircleDots size={20} color={Colors.light.tint} />
            <Text style={styles.label}>Chat de ayuda</Text>
            <ArrowRight size={16} color={Colors.light.text} />
          </Pressable>
        </View>

        <Text style={styles.footer}>
          Framing sigue en desarrollo. Gracias por confiar en nosotros 🧡
        </Text>
      </View>
    </ScrollWithAnimatedHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 24,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: Colors.light.text,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
    textAlign: 'left',
  },
  group: {
    gap: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  label: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
  },
  footer: {
    marginTop: 30,
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.light.tint,
    textAlign: 'center',
  },
});
