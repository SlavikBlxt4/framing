import React from 'react';
import { View, Text, StyleSheet, Pressable, Switch, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import ScrollWithAnimatedHeader from '@/components/framing/ScrollWithAnimatedHeader';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

import {
  Bell,
  Globe,
  Moon,
  ShieldCheck,
  FileText,
  ArrowRight,
} from 'phosphor-react-native';

export default function AjustesScreen() {
  const router = useRouter();

  const handleStaticPress = (label: string) => {
    Alert.alert(label, 'Esta funcionalidad estará disponible en futuras versiones.');
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Ajustes</Text>

        <View style={styles.group}>
          <Text style={styles.groupTitle}>Preferencias</Text>

          <Pressable style={styles.item} onPress={() => handleStaticPress('Idioma')}>
            <Globe size={20} color={Colors.light.tint} />
            <Text style={styles.label}>Idioma</Text>
            <ArrowRight size={16} color={Colors.light.text} />
          </Pressable>

          <Pressable style={styles.item} onPress={() => handleStaticPress('Tema oscuro')}>
            <Moon size={20} color={Colors.light.tint} />
            <Text style={styles.label}>Tema oscuro</Text>
            <ArrowRight size={16} color={Colors.light.text} />
          </Pressable>

          <Pressable style={styles.item} onPress={() => handleStaticPress('Notificaciones')}>
            <Bell size={20} color={Colors.light.tint} />
            <Text style={styles.label}>Notificaciones</Text>
            <ArrowRight size={16} color={Colors.light.text} />
          </Pressable>
        </View>

        <View style={styles.group}>
          <Text style={styles.groupTitle}>Privacidad</Text>

          <Pressable style={styles.item} onPress={() => handleStaticPress('Privacidad')}>
            <ShieldCheck size={20} color={Colors.light.tint} />
            <Text style={styles.label}>Preferencias de privacidad</Text>
            <ArrowRight size={16} color={Colors.light.text} />
          </Pressable>

          <Pressable style={styles.item} onPress={() => handleStaticPress('Términos y condiciones')}>
            <FileText size={20} color={Colors.light.tint} />
            <Text style={styles.label}>Términos y condiciones</Text>
            <ArrowRight size={16} color={Colors.light.text} />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 22,
    color: Colors.light.text,
  },
  group: {
    // gap: 10,
  },
  groupTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.light.tint,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 5,
  },
  label: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
  },
});
