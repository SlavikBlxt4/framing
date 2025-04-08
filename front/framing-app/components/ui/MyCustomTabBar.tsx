/**
 * Nueva barra de navegación, nos permite personalizar mucho mejor la barra de navegación.
 */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarIcon from './TabBarIcon';

export default function MyCustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;

        const isFocused = state.index === index;
        const color = isFocused ? 'white' : 'gray';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
          >
            <TabBarIcon name={route.name as any} color={color} weight="regular" />
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#333',
  },
  label: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  activeLabel: {
    fontWeight: 'bold',
  },
});
