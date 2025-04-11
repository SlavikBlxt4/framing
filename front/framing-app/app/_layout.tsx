import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper'; // <- Importado aquí

import { useColorScheme } from '@/hooks/useColorScheme';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { UserProvider } from '@/context/UserContext';

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
    <UserProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <PaperProvider>
            <ThemeProvider value={DefaultTheme}>
              <Stack
                screenOptions={{
                  animation: 'none',
                  headerShown: false,
                  headerTitle: '',
                  headerShadowVisible: false,
                  headerBackTitleVisible: false,
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                <Stack.Screen name="+not-found" />
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
