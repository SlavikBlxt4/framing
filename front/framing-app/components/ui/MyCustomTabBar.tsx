import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarIcon from './TabBarIcon';

export default function MyCustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;

        const isFocused = state.index === index;
        const iconTranslate = useRef(new Animated.Value(isFocused ? -6 : 6)).current;
        const textOpacity = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
        const textTranslate = useRef(new Animated.Value(isFocused ? 0 : 8)).current;

        useEffect(() => {
          Animated.parallel([
            Animated.timing(iconTranslate, {
              toValue: isFocused ? -0 : 6, // icono se eleva
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(textOpacity, {
              toValue: isFocused ? 1 : 0,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(textTranslate, {
              toValue: isFocused ? 0 : 8,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        }, [isFocused]);

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
            <Animated.View style={{ transform: [{ translateY: iconTranslate }] }}>
            <TabBarIcon
              name={route.name as any}
              color={isFocused ? 'white' : 'gray'}
              weight={isFocused ? 'fill' : 'regular'}
            />

            </Animated.View>
            <Animated.Text
              style={[
                styles.label,
                {
                  opacity: textOpacity,
                  transform: [{ translateY: textTranslate }],
                },
              ]}
            >
              {label}
            </Animated.Text>
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
  },
  label: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
});
