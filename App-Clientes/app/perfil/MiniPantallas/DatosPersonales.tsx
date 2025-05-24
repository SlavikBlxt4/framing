import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Eye, EyeSlash } from 'phosphor-react-native';

// Constantes
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

// Servicios
import { updateClientProfile } from '@/services/userService';

// Contexto
import { useUser } from '@/context/UserContext';

export default function DatosPersonales() {
  const router = useRouter();
  const { user, setUser } = useUser();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Cargar datos desde el contexto global una sola vez
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone_number || '');
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!user) return;

    try {
      await updateClientProfile({
        name: name.trim() || undefined,
        phone_number: phone.trim() || undefined,
        password: password.trim() || undefined,
      });

      // ✅ Crear objeto actualizado correctamente tipado
      const updatedUser = {
        ...user,
        name: name.trim(),
        phone_number: phone.trim(),
      };

      // ✅ Guardar en caché y actualizar contexto
      await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);

      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      router.back();
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edita tus datos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Nueva contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeSlash size={20} color={Colors.light.text} />
          ) : (
            <Eye size={20} color={Colors.light.text} />
          )}
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.light.text,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 10,
    padding: 12,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: Colors.light.background,
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
});
