import React, { useEffect, useState } from 'react';
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
import { Picker } from '@react-native-picker/picker';

export default function CrearServicioScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [minimumMinutes, setMinimumMinutes] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  const durations = Array.from({ length: 16 }, (_, i) => (i + 1) * 15); // 15 a 240 min

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) return `${hours}h ${mins}min`;
    if (hours > 0) return `${hours}h`;
    return `${mins}min`;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error cargando categorías:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleCreate = async () => {
  if (!name || !price || !minimumMinutes || !categoryId) {
    return Alert.alert(
      'Faltan datos',
      'Por favor, rellena todos los campos obligatorios'
    );
  }

  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Token no encontrado');

    const payload: any = {
      name: name.trim(),
      description: description.trim() || undefined,
      price: parseFloat(price),
      minimum_minutes: parseInt(minimumMinutes),
      categoryId: Number(categoryId),
    };

    const response = await api.post('/photographer/services/create', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Alert.alert('Éxito', 'Servicio creado correctamente');
    router.back();
  } catch (error: any) {
    console.error('❌ Error al crear servicio:', error);

    const msg = error?.response?.data?.message;
    Alert.alert(
      'Error',
      Array.isArray(msg) ? msg.join('\n') : msg || 'No se pudo crear el servicio'
    );
  }
};


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Crear nuevo servicio</Text>

      <LabeledInput label="Nombre del servicio *" value={name} onChangeText={setName} />
      <LabeledInput
        label="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
        height={100}
      />
      <LabeledInput
        label="Precio (€) *"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />

      <View style={styles.field}>
        <Text style={styles.label}>Duración mínima *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={minimumMinutes}
            onValueChange={(value) => setMinimumMinutes(value)}
          >
            <Picker.Item label="Selecciona duración" value="" />
            {durations.map((d) => (
              <Picker.Item key={d} label={formatDuration(d)} value={String(d)} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Categoría o estilo *</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={categoryId}
            onValueChange={(value) => setCategoryId(Number(value))}
          >
            <Picker.Item label="Selecciona una categoría" value="" />
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
            ))}
          </Picker>
        </View>
      </View>

      <Pressable style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Crear servicio</Text>
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
  multiline,
  height,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad';
  placeholder?: string;
  multiline?: boolean;
  height?: number;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && { height: height || 80, textAlignVertical: 'top' },
        ]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        multiline={multiline}
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
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.light.text,
    marginBottom: 16,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontFamily: FontFamily.semiBold,
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
    color: Colors.light.background,
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
});
