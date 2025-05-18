// React y React Native
import { StyleSheet, BackHandler } from 'react-native';
import { useLayoutEffect } from 'react';

// Navegación
import { useNavigation, useFocusEffect, router } from 'expo-router';

// Componentes propios
import ReservasList from '@/components/fm_lists/ReservasList';

// Constantes
import Colors from '@/constants/Colors';

export default function GestorReservas() {
  // Hook de navegación proporcionado por expo-router
  const navigation = useNavigation();
  
  // Al montar el componente, se establece la configuración del header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Gestor de reservas', // Titulo que aparece en la parte superior
      headerStyle: {
        backgroundColor: 'white', // Color del fondo del header
      }
    });
  }, [navigation]); // Solo se vuelve a ejecutar si la instancia de navigation cambia

  // Al pulsar el botón físico atrás, redirige siempre al perfil solo mientras esta pantalla esté activa
  useFocusEffect(() => {
    const handleBackPress = () => {
      router.replace('/(tabs)/profile'); // ✅ Redirige a la pestaña de perfil
      return true; // ✅ Bloquea comportamiento por defecto
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  });

  // Renderiza la lista de reservas usando un componente reutilizable
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
