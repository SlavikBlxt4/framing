// app/reservas/GestorReservas.tsx
import { View, Text, StyleSheet } from 'react-native';
import Fonts from '@/constants/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import GridFotografos from '@/components/sections/GridFotografos';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import ReservasList from '@/components/sections/ReservasList';
import { Colors } from '@/constants/Colors';

export default function GestorReservas() {
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Gestor de reservas',
      headerStyle: {
        backgroundColor: 'white',
      }
    });
  }, [navigation])

  return (
    <ReservasList />
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  }
});
