// app/reservas/GestorReservas.tsx
// React y React Native
import { Text, StyleSheet } from 'react-native';
import { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Navegación
import { useNavigation } from 'expo-router';

// Constantes del proyecto
import Colors from '@/constants/Colors';

export default function AjustesScreen() {
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Datos personales',
      headerStyle: {
        backgroundColor: 'white',
      }
    });
  }, [navigation])

  return (
    <SafeAreaView>
        <Text>Aqui van los datos personales</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  }
});
