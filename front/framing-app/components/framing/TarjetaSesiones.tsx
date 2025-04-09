import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

type Props = {
    nombreEstudio?: string;
    fechaSesion?: string;
}

export default function TarjetaSesiones({ nombreEstudio, fechaSesion }: Props) {
    const estudio = nombreEstudio || '[Estudio fotográfico]';
    let fechaFormateada = 'Sin fecha';
    if (fechaSesion) {
        try {
            const fechaParseada = parse(fechaSesion, 'dd/MM/yyyy', new Date());
            fechaFormateada = format(fechaParseada, "d 'de' MMMM 'de' yyyy", { locale: es });
        } catch (error) {
            console.warn('Formato de fecha inválida: ', fechaSesion);
        }
    }

    return (
        <ImageBackground
            source={require('@/assets/images/placeholder_estudio.jpg')}
            style={styles.container}
            imageStyle={styles.image} // esto aplica el borderRadius a la imagen
            >
                <View style={styles.overlay} />
            <View style={styles.textoSuperior}>
                <Text style={styles.boldText}>{estudio}</Text>
            </View>
            <View style={styles.textoInferior}>
                <Text style={styles.regularText}>Próxima sesión:</Text>
                <Text style={styles.boldText}>{fechaFormateada}</Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        backgroundColor: 'gray',
        borderRadius: 15,
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: Colors.light.tint,
        overflow: 'hidden',
    },
    image: {
        borderRadius: 15,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(21, 99, 97, 0.5)',
        borderRadius: 15,
    },
    boldText: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: Colors.light.background,
    },
    regularText: {
        fontSize: 16,
        fontFamily: Fonts.regular,
        color: Colors.light.background,
    },
    textoSuperior: {
        padding: 20,
    },
    textoInferior: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    }
})