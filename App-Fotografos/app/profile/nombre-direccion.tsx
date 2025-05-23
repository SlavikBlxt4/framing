import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';
import { FontFamily } from '@/constants/Fonts';
import api from '@/services/api';
import { StyledText } from '@/components/StyledText';

export default function NombreDireccionScreen() {
  const router = useRouter();
  const [studioName, setStudioName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    const fetchStudioInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');

        const response = await api.get('/users/me/photographer-profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { name, latitude: lat, longitude: lng } = response.data;
        setStudioName(name || '');
        setLatitude(lat?.toString() || '');
        setLongitude(lng?.toString() || '');
      } catch (error) {
        console.error('Error al cargar información del estudio:', error);
      }
    };

    fetchStudioInfo();
  }, []);

  const handleSave = async () => {
    if (!studioName) {
      return Alert.alert('Falta información', 'Por favor, ingresa el nombre del estudio');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado');

      const payload = {
        name: studioName.trim(),
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
      };

      await api.patch('/photographer/profile', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      Alert.alert('Éxito', 'Información actualizada correctamente');
      router.back();
    } catch (error: any) {
      console.error('Error al actualizar información:', error);
      const msg = error?.response?.data?.message;
      Alert.alert(
        'Error',
        Array.isArray(msg) ? msg.join('\n') : msg || 'No se pudo actualizar la información'
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StyledText style={styles.title} weight="bold">Información del estudio</StyledText>

      <LabeledInput
        label="Nombre del estudio *"
        value={studioName}
        onChangeText={setStudioName}
        placeholder="Ej: Estudio Fotográfico XYZ"
      />

      <LabeledInput
        label="Latitud"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="decimal-pad"
        placeholder="Ej: 41.6488"
      />

      <LabeledInput
        label="Longitud"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="decimal-pad"
        placeholder="Ej: -0.8891"
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <StyledText style={styles.buttonText} weight="bold">Guardar cambios</StyledText>
      </Pressable>
    </ScrollView>
  );
}

function LabeledInput({
  label,
  value,
  onChangeText,
  keyboardType,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad';
  placeholder?: string;
}) {
  return (
    <View style={styles.field}>
      <StyledText style={styles.label} weight="semiBold">{label}</StyledText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    color: Colors.light.text,
    marginBottom: 16,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: Colors.light.text,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 10,
    padding: 12,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
