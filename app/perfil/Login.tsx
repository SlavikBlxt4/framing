import ScrollWithAnimatedHeader from "@/components/framing/ScrollWithAnimatedHeader";
import { Colors } from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { Eye, EyeSlash } from "phosphor-react-native";
import { useState } from "react";
import mockUsers from "@/mocks/mockUsuarios";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation])

    const handleLogin = async () => {
        const user = mockUsers.find(
          (u) => u.email === email.trim() && u.password === password
        );
      
        if (user) {
          console.log("Inicio de sesión exitoso. ID del usuario:", user.id);
      
          try {
            await AsyncStorage.setItem("userId", String(user.id));
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
                <>
                    <Text style={styles.logo}>FRAMING</Text> 
                    <Text style={styles.subtitle}>¡Hola de nuevo, nos alegramos de tenerte de vuelta!</Text>
                </>

                <View style={styles.inputContainer}>
                    <TextInput 
                        placeholder="Correo electrónico" 
                        keyboardType="email-address" 
                        autoCapitalize="none" 
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
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
                        <Pressable onPress={() => console.log("Navegar a recuperar contraseña")}>
                            <Text style={styles.forgotPassword}>He olvidado mi contraseña</Text>
                        </Pressable>
                </View>

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