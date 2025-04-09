/**
 * Barra de búsqueda reutilizable (Falta aplicar funcionalidad real)
 */

import { StyleSheet, View, TextInput, Text, Linking, Pressable, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

type Props = {
    imagenUrl?: string;
    link?: string;
    onRemoveAds?: () => void;
}

export default function Anuncio({ imagenUrl, link, onRemoveAds }: Props) {
    const handlePress = () => {
        if (link) Linking.openURL(link);
    }
    return (
        <View style={styles.container}>
            <Pressable style={styles.adContainer} onPress={handlePress}>
                {imagenUrl ? (
                    <Image source={{uri: imagenUrl}} style={styles.adImage} resizeMode='cover' />
                ) : (
                    <Text style={styles.placeholderText}>[Espacio reservado para anuncio]</Text>
                )}
            </Pressable>
            <Pressable onPress={onRemoveAds}>
                <Text style={styles.removeText}>Eliminar anuncios</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
        width: '100%',
      },
      adContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: Colors.light.accent,
        borderWidth: 1,
        borderColor: Colors.light.tint,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
      adImage: {
        width: '100%',
        height: '100%',
      },
      placeholderText: {
        color: Colors.light.text,
        fontFamily: Fonts.regular,
      },
      removeText: {
        fontSize: 14,
        color: Colors.light.tint,
        fontFamily: Fonts.bold,
        textAlign: 'center',
      },
})