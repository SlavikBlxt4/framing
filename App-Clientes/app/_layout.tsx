import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Montserrat_800ExtraBold,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
      SplashScreen.hideAsync();
    };
    checkAuth();
  }, []);

  if (!loaded) {
    return null;
  }

  if (isLoggedIn === null) return null;

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
                  {isLoggedIn ? (
                    <Stack.Screen name="(tabs)" />
                  ) : (
                    <Stack.Screen name="perfil/Login"/>
                  )}
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
