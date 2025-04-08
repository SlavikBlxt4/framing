import MyCustomTabBar from '@/components/ui/MyCustomTabBar';
import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <MyCustomTabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Inicio' }}
      />
      <Tabs.Screen
        name="explore"
        options={{ title: 'Explorar' }}
      />
    </Tabs>
  );
}
