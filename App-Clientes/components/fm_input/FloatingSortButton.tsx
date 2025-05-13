// components/FloatingSortButton.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { FadersHorizontal } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

interface Props {
  onPress: () => void;
}

const FloatingSortButton: React.FC<Props> = ({ onPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { bottom: insets.bottom + 20 } as ViewStyle]}>
      <Pressable style={styles.button} onPress={onPress}>
        <FadersHorizontal size={20} color="#fff" weight="bold" />
        <Text style={styles.text}>Ordenar</Text>
      </Pressable>
    </View>
  );
};

export default FloatingSortButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    zIndex: 1000,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    elevation: 4,
  },
  text: {
    color: '#fff',
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginLeft: 6,
    includeFontPadding: false,
  },
});
