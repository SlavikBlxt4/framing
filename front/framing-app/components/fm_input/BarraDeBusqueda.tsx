import React from 'react';
import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import { MagnifyingGlass, X } from 'phosphor-react-native';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar"
        placeholderTextColor={Colors.light.tint}
        style={styles.input}
      />
      {value ? (
        <Pressable onPress={() => onChangeText('')}>
          <X size={20} color={Colors.light.tint} weight="bold" />
        </Pressable>
      ) : (
        <MagnifyingGlass size={20} color={Colors.light.tint} weight="duotone" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.accent,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.light.text,
    paddingVertical: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginRight: 8, // espacio entre texto y el icono
  },
});
