import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView, StyleSheet } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

// Evitar que se cierre el splash automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {/* Fondo blanco también detrás del notch */}
      <SafeAreaView style={styles.safeArea}>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{animation: 'none', headerShown: true, headerTitle: '', headerTransparent: true, headerShadowVisible: false, headerBackTitleVisible: false}}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>

          {/* Status bar con fondo blanco e íconos oscuros */}
          <StatusBar style="dark" backgroundColor="#FFFFFF" translucent={true} />
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco para el notch y la app
  },
});
