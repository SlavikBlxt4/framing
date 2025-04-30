// React y React Native
import { Text, StyleSheet } from 'react-native';
import { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Navegación
import { useNavigation } from 'expo-router';

// Constantes del proyecto
import Colors from '@/constants/Colors';

export default function PagosScreen() {
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Pago',
      headerStyle: {
        backgroundColor: 'white',
      }
    });
  }, [navigation])

  return (
    <SafeAreaView>
        <Text>Aqui van los pagos</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  }
});
