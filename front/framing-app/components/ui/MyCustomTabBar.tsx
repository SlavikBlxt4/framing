import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  useColorScheme,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBarIcon from './TabBarIcon';
import { Colors } from '@/constants/Colors'; // Asegúrate de usar la exportación correcta
import Fonts from '@/constants/Fonts';

export default function MyCustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useColorScheme();
  const colors = Colors[theme ?? 'light'];

  return (
    <View style={[styles.tabBar, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;

        const isFocused = state.index === index;
        const iconTranslate = useRef(new Animated.Value(isFocused ? -0: 6)).current;
        const textOpacity = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
        const textTranslate = useRef(new Animated.Value(isFocused ? 0 : 8)).current;

        useEffect(() => {
          Animated.parallel([
            Animated.timing(iconTranslate, {
              toValue: isFocused ? -0 : 6,
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
                color={isFocused ? colors.tabIconSelected : colors.tabIconDefault}
                weight={isFocused ? 'duotone' : 'regular'}
              />
            </Animated.View>
            <Animated.Text
              style={[
                styles.label,
                {
                  color: isFocused ? colors.tabIconSelected : colors.tabIconDefault,
                  fontFamily: isFocused ? Fonts.bold : Fonts.regular,
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
    height: 80,
    borderTopWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});
