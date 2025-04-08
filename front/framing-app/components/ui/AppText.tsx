import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import Fonts from '@/constants/Fonts';

export default function AppText(props: TextProps) {
  return (
    <RNText
      {...props}
      style={[styles.defaultText, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: Fonts.regular,
    fontSize: 16, // Puedes ajustar si quieres
  },
});
