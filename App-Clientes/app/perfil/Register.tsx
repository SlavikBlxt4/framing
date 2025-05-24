// React y React Native
import { useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Alert } from "react-native";

// Navegación (expo-router)
import { router, useNavigation } from "expo-router";

// Íconos
import { Eye, EyeSlash } from "phosphor-react-native";

// Componentes propios
import ScrollWithAnimatedHeader from "@/components/framing/ScrollWithAnimatedHeader";

// Constantes del proyecto
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";

// Servicio
import { register } from "@/services/authService";
import { login } from "@/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "@/types/user";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleRegister = async () => {
    if (!acceptedTerms) {
      Alert.alert("Aviso", "Debes aceptar los términos y condiciones");
      return;
    }
  
    try {
        const response = await register({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
            phone_number: phoneNumber.trim(),
            role: "CLIENT", // siempre será CLIENT en esta app
        });  
        // Paso 2: Iniciar sesión automáticamente
    const token = await login({ email: email.trim(), password });

    if (!token) throw new Error("No se recibió token en la respuesta.");

    await AsyncStorage.setItem("token", token);

    const decoded = jwtDecode<TokenPayload>(token);
    console.log("Token decodificado:", decoded);

    await AsyncStorage.multiSet([
      ["userEmail", decoded.email],
      ["userId", decoded.sub.toString()],
      ["userRole", decoded.role],
    ]);

    // Paso 3: Redirigir a la pantalla principal
    router.replace("/(tabs)");

  } catch (error: any) {
    console.error("Error en registro/login:", error);
    const backendMessage =
      error?.response?.data?.message ?? "Error desconocido.";
    setErrorMessage(
      typeof backendMessage === "string"
        ? backendMessage
        : backendMessage.join?.(", ") || backendMessage
    );
  }
};
  

  return (
      <View style={styles.container}>
        <Text style={styles.logo}>FRAMING</Text>
        <Text style={styles.subtitle}>
          Regístrate para encontrar el fotógrafo perfecto
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nombre completo"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Teléfono"
            keyboardType="phone-pad"
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeSlash size={24} color={Colors.light.tint} />
              ) : (
                <Eye size={24} color={Colors.light.tint} />
              )}
            </Pressable>
          </View>

          <Pressable
            style={styles.checkboxContainer}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View
              style={[
                styles.checkbox,
                acceptedTerms && styles.checkboxChecked,
              ]}
            />
            <Text style={styles.checkboxText}>
              Acepto los términos y condiciones
            </Text>
          </Pressable>

        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            ¿Ya tienes una cuenta?{" "}
            <Text
              style={styles.registerLink}
              onPress={() => router.push("/perfil/Login")}
            >
              Inicia sesión aquí
            </Text>
          </Text>
        </View>

        {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>    
        )}


        <Pressable style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>REGISTRARSE</Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    backgroundColor: Colors.light.background,
    },
    logo: {
        fontSize: 40,
        fontFamily: Fonts.logo,
        includeFontPadding: false,
        paddingTop: 20,
    },
    subtitle: {
        fontSize: 20,
        fontFamily: Fonts.semiBold,
    },
    inputContainer: {
        gap: 15,
    },
    input: {
        backgroundColor: Colors.light.accent,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.light.tint,
        paddingHorizontal: 20,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.light.accent,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.light.tint,
        paddingHorizontal: 15,
    },
    passwordInput: {
        flex: 1,
        includeFontPadding: false,
        fontFamily: Fonts.regular,
    },
    loginButton: {
        marginTop: 25,
        backgroundColor: Colors.light.tint,
        paddingVertical: 20,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: Fonts.bold,
        includeFontPadding: false,
    },
    registerContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    registerText: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: "#333",
    },
    registerLink: {
        textDecorationLine: "underline",
        fontFamily: Fonts.semiBold,
        color: Colors.light.tint,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingHorizontal: 5,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: Colors.light.tint,
        borderRadius: 4,
        marginRight: 10,
        backgroundColor: "#fff",
    },
    checkboxChecked: {
        backgroundColor: Colors.light.tint,
    },
    checkboxText: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: "#333",
    },
    errorText: {
        color: "#DC2626", // rojo
        fontSize: 14,
        fontFamily: Fonts.semiBold,
        textAlign: "center",
        marginTop: 10,
    },      
});