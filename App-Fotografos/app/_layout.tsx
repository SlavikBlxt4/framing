import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Colors from '@/constants/Colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token);
      } catch (e) {
        console.error('Error al leer token:', e);
        setIsLoggedIn(false);
      } finally {
        SplashScreen.hideAsync();
      }
    };
    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return null; // Esperar carga
  }

  return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
            <ThemeProvider
              value={{
                ...DefaultTheme,
                colors: {
                  ...DefaultTheme.colors,
                  ...Colors.light,
                },
              }}
            >
              <Stack
                screenOptions={{
                  animation: 'none',
                  headerShown: false,
                }}
              >
                {isLoggedIn ? (
                  <Stack.Screen name="(tabs)" />
                ) : (
                  <Stack.Screen name="sign/login" />
                )}

                {/* Rutas adicionales si las necesitas */}
                <Stack.Screen name="sign/register" />
                <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
                <Stack.Screen name="profile/compartir-perfil" />
                <Stack.Screen name="profile/horario" />
                <Stack.Screen name="profile/logo-portada" />
                <Stack.Screen name="profile/nombre-direccion" />
                <Stack.Screen name="profile/portfolio" />
                <Stack.Screen name="profile/redes-sociales" />
                <Stack.Screen name="profile/sesiones" />
              </Stack>

              <StatusBar style="dark" backgroundColor="#FFFFFF" translucent />
            </ThemeProvider>
          </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20, 
  },
});
