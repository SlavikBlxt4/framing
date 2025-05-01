// React y React Native
import { useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

// Navegación (expo-router)
import { useNavigation, router } from "expo-router";

// Íconos
import { Eye, EyeSlash } from "phosphor-react-native";

// Componentes propios
import ScrollWithAnimatedHeader from "@/components/framing/ScrollWithAnimatedHeader";

// Constantes
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";

// Datos simulados
import mockUsers from "@/mocks/mockUsuarios";

// Almacenamiento local
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LoginScreen() {
    // Hook de navegiación de expo-router
    const navigation = useNavigation();

    // Estado para mostrar/ocultar la contraseña
    const [showPassword, setShowPassword] = useState(false);

    // Estado para guardar el mail y contraseña del input
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Oculta el header del navegador en esta pantalla (pantalla de login limpia)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation])

    // Funcion de login 
    const handleLogin = async () => {
        // Busca un usuario en el mock con email y contraseña iguales
        const user = mockUsers.find(
          (u) => u.email === email.trim() && u.password === password
        );
      
        if (user) {
          console.log("Inicio de sesión exitoso. ID del usuario:", user.id);
      
          try {
            // Guarda el ID del usuario en AsyncStorage
            await AsyncStorage.setItem("userId", String(user.id));

            // Navega a la pantalla de perfil reemplazando el historial
            router.replace("/profile");
          } catch (error) {
            console.error("Error al guardar el ID en AsyncStorage:", error);
          }
      
        } else {
          console.log("Credenciales incorrectas");
        }
    };     
    
    return (
        <ScrollWithAnimatedHeader title="">
            <View style={styles.container}>
                {/* Logo y saludo */}
                <>
                    <Text style={styles.logo}>FRAMING</Text> 
                    <Text style={styles.subtitle}>¡Hola de nuevo, nos alegramos de tenerte de vuelta!</Text>
                </>

                {/* Inputs: email y contraseña */}
                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder="Correo electrónico" 
                        keyboardType="email-address" 
                        autoCapitalize="none" 
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />

                    {/* Input de contraseña con boton de mostrar / ocultar */}
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

                    {/* Enlace para recuperación de contraseña */}
                    <Pressable onPress={() => console.log("Navegar a recuperar contraseña")}>
                        <Text style={styles.forgotPassword}>He olvidado mi contraseña</Text>
                    </Pressable>
                </View>

                {/* Enlace para registro si no tiene cuenta */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        ¿No tienes cuenta?{' '}
                        <Text
                            style={styles.registerLink}
                            onPress={() => router.push('/perfil/Register')}
                        >
                            Regístrate aquí
                        </Text>
                    </Text>
                </View>

                {/* Botón de login */}
                <Pressable style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
                </Pressable>

            </View>
        </ScrollWithAnimatedHeader>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
    },
    logo: {
        fontSize: 40,
        fontFamily: Fonts.logo,
        includeFontPadding: false,
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.accent,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.light.tint,
        paddingHorizontal: 15,
    },
    passwordInput: {
        flex: 1,
        // paddingVertical: 12,
        includeFontPadding: false,
        fontFamily: Fonts.regular,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 5,
        marginRight: 10,
        fontFamily: Fonts.semiBold,
        color: Colors.light.tint,
        fontSize: 14,
    }, 
    loginButton: {
        marginTop: 25,
        backgroundColor: Colors.light.tint,
        paddingVertical: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Fonts.bold,
        includeFontPadding: false,
    },
    registerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: '#333',
    },
    registerLink: {
        textDecorationLine: 'underline',
        fontFamily: Fonts.semiBold,
        color: Colors.light.tint,
    },   
})