// app/reservas/GestorReservas.tsx
import { View, Text, StyleSheet } from 'react-native';
import Fonts from '@/constants/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { StarHalf } from 'phosphor-react-native';

export default function ReseñasScreen() {
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Reseñas',
      headerStyle: {
        backgroundColor: 'white',
      }
    });
  }, [navigation])

  return (
    <SafeAreaView>
        <View style={styles.container}>
          <StarHalf weight='regular' size={40}></StarHalf>
          <Text style={styles.text}>Todavía no has hecho ninguna reseña...</Text>
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
