// React y React Native
import { useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

// Navegación (expo-router)
import { router, useNavigation } from "expo-router";

// Íconos
import { Eye, EyeSlash } from "phosphor-react-native";

// Componentes propios
import ScrollWithAnimatedHeader from "@/components/framing/ScrollWithAnimatedHeader";

// Constantes del proyecto
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";

// Datos simulados
import mockUsers from "@/mocks/mockUsuarios";

export default function RegisterScreen() {
    // Hook de navegación de expo-router
    const navigation = useNavigation();

    // EEstados del formulario 
    const [showPassword, setShowPassword] = useState(false); // Mostrar u ocultar contraseña
    const [email, setEmail] = useState(""); // Campo de correo
    const [password, setPassword] = useState(""); // Campo de contraseña
    const [acceptedTerms, setAcceptedTerms] = useState(false); // Checkbox de términos

    // Oculta el header de navegación al entrar en esta pantalla
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation])

    // Lógica del botón de registro
    const handleRegister = () => {
        // Verificar que el usuario acepte los términos antes de continuar
        if (!acceptedTerms) {
          console.log("Debes aceptar los términos y condiciones");
          return;
        }
      
        // Aqui esta haciendo una simulacion: verifica si el usuario ya existe
        const user = mockUsers.find(
          (u) => u.email === email.trim() && u.password === password
        );
      
        if (user) {
          console.log("Cuenta creada"); // Aqui deberiamos prevenir duplicados
        } else {
          console.log("Credenciales incorrectas");
        }
    };
      
      

    return (
        <ScrollWithAnimatedHeader title="">
            <View style={styles.container}>
                {/* Encabezado visual */}
                <>
                    <Text style={styles.logo}>FRAMING</Text> 
                    <Text style={styles.subtitle}>Registrate para encontrar el fotógrafo perfecto</Text>
                </>

                {/* Campos del formulario */}
                <View style={styles.inputContainer}>
                    {/* Campo de correo */}
                    <TextInput 
                        placeholder="Correo electrónico" 
                        keyboardType="email-address" 
                        autoCapitalize="none" 
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />

                    {/* Campo de contraseña con icono para mostrar / ocultar */}
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

                    {/* Checkbox de aceptación de terminos */}
                    <Pressable
                        style={styles.checkboxContainer}
                        onPress={() => setAcceptedTerms(!acceptedTerms)}
                    >
                        <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]} />
                        <Text style={styles.checkboxText}>
                            Acepto los términos y condiciones
                        </Text>
                    </Pressable>
                </View>

                {/* Enlace para iniciar sesión si ya tiene una cuenta */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        ¿Ya tienes una cuenta?{' '}
                        <Text
                            style={styles.registerLink}
                            onPress={() => router.push('/perfil/Login')}
                        >
                            Inicia sesión aqui
                        </Text>
                    </Text>
                </View>

                {/* Botón de registro */}
                <Pressable style={styles.loginButton} onPress={handleRegister}>
                    <Text style={styles.loginButtonText}>REGISTRARSE</Text>
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
      
    checkboxChecked: {
        backgroundColor: Colors.light.tint,
    },
      
    checkboxText: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: '#333',
    },      
})