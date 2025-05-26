import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { useColorScheme } from '@/hooks/useColorScheme';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Montserrat_800ExtraBold} from '@expo-google-fonts/montserrat';
import { UserProvider } from '@/context/UserContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Montserrat_800ExtraBold,
  });

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <PaperProvider>
            <ThemeProvider value={DefaultTheme}>
              <Stack
                screenOptions={{
                  animation: 'none',
                  headerShown: true,
                  headerTitle: '',
                  headerShadowVisible: false,
                  headerBackTitleVisible: false,
                  headerStyle: {}
                }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
                <Stack.Screen name="perfil/Login" />
                <Stack.Screen name="perfil/Register" />
                <Stack.Screen name="fotografo/[id]" />
                <Stack.Screen name="fotografo/sesiones" />
                <Stack.Screen name="fotografo/portfolio" />
                <Stack.Screen name="fotografo/calificaciones" />
                <Stack.Screen name="fotografo/detalles" />
              </Stack>

              <StatusBar style="dark" backgroundColor="#FFFFFF" translucent />
            </ThemeProvider>
          </PaperProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
