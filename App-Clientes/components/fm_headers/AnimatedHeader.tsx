import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const HEADER_MAX_HEIGHT = 70;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

type Props = {
  scrollY: Animated.Value;
  title?: string;
};

export default function AnimatedHeader({ scrollY, title = '¡Hola!' }: Props) {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 130],
    outputRange: [70, 0],
    extrapolate: 'clamp',
  });

  const headerFontSize = scrollY.interpolate({
    inputRange: [0, 130],
    outputRange: [28, 18],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <Animated.Text style={[styles.headerText, { fontSize: headerFontSize }]}>
        {title}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.background,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1000,
  },
  headerText: {
    color: Colors.light.text,
  },
});
