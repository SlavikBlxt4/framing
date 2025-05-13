// React y React Native
import { Text, StyleSheet, View } from 'react-native';
import { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Navegación
import { useNavigation } from 'expo-router';

// Constantes del proyecto
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

// Iconos (phosphor)
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
