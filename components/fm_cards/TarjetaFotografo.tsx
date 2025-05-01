// React Native
import { StyleSheet, View, Text, ImageBackground, Pressable } from "react-native";

// Navegación (expo-router)
import { useRouter } from 'expo-router';

// Íconos
import { ArrowRight, Star } from "phosphor-react-native";

// Constantes
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

// Interfaces
import { FotografosProps } from '@/types/Fotografos.type';

// Componente que representa una tarjeta interactiva de un fotógrafo o estudio fotógrafico
export default function TarjetaFotografo({ nombreEstudio, fotografiaUrl, puntuacion, direccion, fotoPortada, seguidores, verificado }: FotografosProps) {
    // Hook de navegación de Expo Router
    const router = useRouter();

    // Función que maneja el evento de presionar la tarjeta
    const handlePress = () => {
        router.push({
            pathname: '/fotografo/perfil', // Ruta a la que se navega
            params: {
            nombreEstudio,
            fotografiaUrl,
            puntuacion: puntuacion?.toString(), // Se convierte en string para pasar por parámetros
            direccion,
            fotoPortada,
            seguidores: seguidores?.toString(),
            verificado: verificado ? 'true' : 'false', // Booleano convertido a string
            },
          });
          
    };

    return (
        // Contenedor principal que actúa como botón
        <Pressable style={styles.container} onPress={handlePress}>
            {/* Imagen de portada con fondo y contenedor de calificación */}
            <ImageBackground
                source={{ uri: fotografiaUrl }}
                style={styles.imagen}
                imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            >
                {/* Contenedor de calificación */}
                <View style={styles.ratingContainer}>
                    <Star size={16} color={Colors.light.background} weight="fill" />
                    <Text style={styles.ratingText}>{puntuacion}</Text>
                </View>
            </ImageBackground>

            {/* Contenedor con el nombre del estudio y flecha de acción */}
            <View style={styles.infoContainer}>
                <View style={styles.textWrapper}>
                    <Text
                        style={styles.nombreEstudio}
                        numberOfLines={2} // Limita el nombre a 2 líneas
                        ellipsizeMode="tail" // Agrega "..." si el texto es muy largo
                    >
                        {nombreEstudio}
                    </Text>
                </View>

                {/* Flecha a la derecha indicando navegación */}
                <ArrowRight size={20} color={Colors.light.tint} weight="bold" />
            </View>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    container: {
        width: 170,
        height: 220,
        borderRadius: 12,
        backgroundColor: Colors.light.background,
        borderWidth: 1,
        borderColor: Colors.light.tint,
    },
    imagen: {
        flex: 1.75,
        justifyContent: 'flex-end',
        padding: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(21, 99, 97, 0.5)',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    ratingText: {
        color: Colors.light.background,
        marginLeft: 4,
    },
    infoContainer: {
        height: 70, // altura fija
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: Colors.light.accent,
        borderBottomEndRadius: 12,
        borderBottomStartRadius: 12,
      },
      textWrapper: {
        width: '75%',
      },
      nombreEstudio: {
        fontSize: 16,
        color: Colors.light.text,
        fontFamily: Fonts.bold,
        lineHeight: 20,
      },
      
})