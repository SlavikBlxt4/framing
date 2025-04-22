import { StyleSheet, View, Text, ImageBackground, Pressable } from "react-native";
import { ArrowRight, Star } from "phosphor-react-native";
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

type Props = {
    nombreEstudio?: string;
    fotografiaUrl?: string;
    puntuacion?: number;
    onPress?: () => void;
}

export default function TarjetaFotografo({ nombreEstudio, fotografiaUrl, puntuacion, onPress }: Props) {
    return(
        <Pressable style={styles.container} onPress={onPress}>
            <ImageBackground
                source={{ uri: fotografiaUrl }}
                style={styles.imagen}
                imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12}}
            >
                <View style={styles.ratingContainer}>
                    <Star size={16} color={Colors.light.background} weight="fill" />
                    <Text style={styles.ratingText}>{puntuacion}</Text>
                </View>
            </ImageBackground>

            <View style={styles.infoContainer}>
                <View style={styles.textWrapper}>
                    <Text
                    style={styles.nombreEstudio}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    >
                    {nombreEstudio}
                    </Text>
                </View>
                <ArrowRight size={20} color={Colors.light.tint} weight="bold" />
            </View>
        </Pressable>
    )
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