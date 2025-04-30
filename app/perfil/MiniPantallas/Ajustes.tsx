// app/reservas/GestorReservas.tsx
import { View, Text, StyleSheet } from 'react-native';
import Fonts from '@/constants/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Colors } from '@/constants/Colors';

export default function AjustesScreen() {
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Ajustes',
      headerStyle: {
        backgroundColor: 'white',
      }
    });
  }, [navigation])

  return (
    <SafeAreaView>
        <Text>Aqui van los ajustes</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  }
});
