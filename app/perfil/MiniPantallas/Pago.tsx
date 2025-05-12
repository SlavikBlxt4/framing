import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CreditCard, CheckCircle, LockKey } from 'phosphor-react-native';
import { useRouter } from 'expo-router';

import ScrollWithAnimatedHeader from '@/components/framing/ScrollWithAnimatedHeader';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function PagoScreen() {
  const router = useRouter();

  return (
    <ScrollWithAnimatedHeader title="">
      <View style={styles.container}>
        <CreditCard size={64} color={Colors.light.tint} weight="fill" />

        <Text style={styles.title}>Métodos de pago</Text>

        <Text style={styles.description}>
          Actualmente los pagos en la plataforma son simulados para fines de
          demostración.
        </Text>

        <Text style={styles.description}>
          En versiones futuras podrás pagar con tarjeta de crédito y débito,
          incluyendo:
        </Text>

        <View style={styles.list}>
          <Text style={styles.bullet}><CheckCircle size={18} color={Colors.light.tint} /> Visa</Text>
          <Text style={styles.bullet}><CheckCircle size={18} color={Colors.light.tint} /> MasterCard</Text>
          <Text style={styles.bullet}><CheckCircle size={18} color={Colors.light.tint} /> American Express</Text>
          <Text style={styles.bullet}><CheckCircle size={18} color={Colors.light.tint} /> Apple Pay / Google Pay</Text>
        </View>

        <Text style={styles.footerNote}>
          Nuestro objetivo es garantizar una experiencia de pago segura y confiable.
        </Text>

        <LockKey size={24} color={Colors.light.text} weight="bold" />
        <Text style={styles.footerSub}>Sistema en desarrollo - versión académica</Text>

        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Volver</Text>
        </Pressable>
      </View>
    </ScrollWithAnimatedHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.light.text,
    textAlign: 'center',
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
    textAlign: 'center',
  },
  list: {
    marginTop: 8,
    gap: 6,
    width: '100%',
  },
  bullet: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  footerNote: {
    marginTop: 20,
    fontFamily: Fonts.regular,
    fontSize: 15,
    color: Colors.light.tint,
    textAlign: 'center',
  },
  footerSub: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: Colors.light.text,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: Fonts.bold,
    color: Colors.light.background,
    fontSize: 16,
  },
});
