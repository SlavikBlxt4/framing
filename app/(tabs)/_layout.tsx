import MyCustomTabBar from '@/components/ui/MyCustomTabBar';
import { Tabs } from 'expo-router';
import React from 'react';
import Fonts from '@/constants/Fonts';

export default function TabLayout() {
  return (
    <Tabs
      // Ignorar error
      tabBar={(props) => <MyCustomTabBar {...props} />}
      screenOptions={{
        headerTitleStyle: {
          fontFamily: Fonts.semiBold,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.regular,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Inicio', headerShown: false }} />
      <Tabs.Screen name="explore" options={{ title: 'Explorar', headerShown: false }} />
      <Tabs.Screen name="inbox" options={{ title: 'Recibidos', headerShown: false }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil', headerShown: false }} />
    </Tabs>
  );
}
