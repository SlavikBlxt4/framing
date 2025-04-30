// app/reservas/GestorReservas.tsx
import { View, Text, StyleSheet } from 'react-native';
import Fonts from '@/constants/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { HeartHalf } from 'phosphor-react-native';

export default function FavoritosScreen() {
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
        <View style={styles.container}>
          <HeartHalf weight='regular' size={40}></HeartHalf>
          <Text style={styles.text}>Todavía no tienes favoritos...</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
    opacity: 0.6,
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.bold,
  }
});
