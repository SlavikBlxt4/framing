/**
 * Desde esta pantalla solo llamaremos a la nueva barra de navegación y le pasaremos las pantallas que debe mostrar. 
 */

import MyCustomTabBar from '@/components/ui/MyCustomTabBar';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <MyCustomTabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Inicio', headerShown: false }}
      />
      <Tabs.Screen
        name="explore"
        options={{ title: 'Explorar', headerShown: false }}
      />
      <Tabs.Screen
        name="inbox"
        options={{ title: 'Recibidos', headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Perfil', headerShown: false }}
      />
    </Tabs>
  );
}
