import React from 'react';
import { View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BottomNavigation = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#f8f8f8' }} edges={Platform.OS === 'ios' ? ['bottom'] : []}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#f8f8f8',
        paddingBottom: Platform.OS === 'ios' ? 0 : 10, // Ajuste dinámico solo en iOS
      }}>
        <Ionicons name="home" size={24} color="#008080" />
        <Ionicons name="book" size={24} color="#777" />
        <Ionicons name="person" size={24} color="#777" />
      </View>
    </SafeAreaView>
  );
};

export default BottomNavigation;
