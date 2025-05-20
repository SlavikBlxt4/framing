import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

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
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="sign/login" />
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
