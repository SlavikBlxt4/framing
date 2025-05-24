import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import debounce from 'lodash.debounce';
import Colors from '@/constants/Colors';
import { FontFamily } from '@/constants/Fonts';
import api from '@/services/api';
import { StyledText } from '@/components/StyledText';

export default function NombreDireccionScreen() {
  const router = useRouter();
  const [studioName, setStudioName] = useState('');
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchStudioInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');

        const response = await api.get('/users/me/photographer-profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { name, phone_number, latitude: lat, longitude: lng } = response.data;
        setStudioName(name || '');
        setPhoneNumber(phone_number || '');
        setLatitude(lat?.toString() || '');
        setLongitude(lng?.toString() || '');
      } catch (error) {
        console.error('Error al cargar información del estudio:', error);
      }
    };

    fetchStudioInfo();
  }, []);

  const fetchSuggestions = async (text: string) => {
    if (text.length < 3) return;

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=es&q=${encodeURIComponent(text)}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'framing-tfg' }
      });
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Error buscando dirección:', err);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchSuggestions, 400), []);

  const handleAddressInput = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  const handleSelect = (item: any) => {
    setSearch(item.display_name);
    setLatitude(item.lat);
    setLongitude(item.lon);
    setSuggestions([]);
  };

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
        phone_number: phoneNumber || null,
        password: newPassword || undefined, // solo si se modifica
      };

      await api.patch('/users/photographers/me', payload, {
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
        label="Dirección del estudio"
        value={search}
        onChangeText={handleAddressInput}
        placeholder="Ej: Calle Mayor 10, Madrid"
      />

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <Pressable style={styles.suggestion} onPress={() => handleSelect(item)}>
            <Text>{item.display_name}</Text>
          </Pressable>
        )}
      />

      <LabeledInput
        label="Número de teléfono"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Ej: +34611222333"
      />

      <LabeledInput
        label="Nueva contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Déjalo en blanco para no cambiarla"
        secureTextEntry
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
  placeholder,
  secureTextEntry,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}) {
  return (
    <View style={styles.field}>
      <StyledText style={styles.label} weight="semiBold">{label}</StyledText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
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
  suggestion: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
