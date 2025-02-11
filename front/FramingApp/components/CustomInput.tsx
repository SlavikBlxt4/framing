import React from 'react';
import { View, TextInput, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomInputProps {
  placeholder: string;
  icon?: keyof typeof Ionicons.glyphMap;
  value?: string;
  onChangeText?: (text: string) => void;
  isSearch?: boolean; // Si es un input de búsqueda o un campo normal
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, icon, value, onChangeText, isSearch = false }) => {
  return (
    <View style={[styles.container, isSearch && styles.searchContainer]}>
      {icon && <Ionicons name={icon} size={20} color="#008080" />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#008080"
        style={[styles.input, isSearch && styles.searchInput]}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#008080',
      backgroundColor: '#F0FFFF',
      borderRadius: 15,
      paddingHorizontal: 15,
      paddingVertical: 8,
      marginVertical: 10,
    },
    searchContainer: {
      borderRadius: 25,
    },
    input: {
      flex: 1,
      fontFamily: 'Poppins-Bold',
      fontSize: 16,
      color: '#008080',
      marginLeft: 10,
      paddingVertical: Platform.OS === 'android' ? 2 : 0, // 🔹 Solución: Ajusta el padding en Android
      textAlignVertical: 'center', // 🔹 Solución: Asegura alineación vertical en Android
    },
    searchInput: {
      textAlign: 'left',
    }
  });

export default CustomInput;
