import { StyleSheet, View, Text, ImageBackground, Pressable } from "react-native";
import { useState } from "react";

// Navegación (expo-router)
import { useRouter } from 'expo-router';

// Íconos
import { ArrowRight, Star } from "phosphor-react-native";

// Constantes
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

// Interfaces
import { FotografosProps } from '@/types/Fotografos.type';

interface TarjetaFotografoProps {
  nombreEstudio: string;
  fotografiaUrl: string;
  puntuacion: number;
  direccion: string;
  fotoPortada: string;
  seguidores: number;
  verificado: boolean;
}

// Componente que representa una tarjeta interactiva de un fotógrafo o estudio fotográfico
export default function TarjetaFotografo({
  nombreEstudio,
  fotografiaUrl,
  puntuacion,
  direccion,
  fotoPortada,
  seguidores,
  verificado,
}: TarjetaFotografoProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handlePress = () => {
    router.push({
      pathname: '/fotografo/perfil',
      params: {
        nombreEstudio,
        fotografiaUrl,
        puntuacion: puntuacion.toString(),
        direccion,
        fotoPortada,
        seguidores: seguidores.toString(),
        verificado: verificado.toString(),
      },
    });
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <ImageBackground
        source={
          imageError || !fotografiaUrl
            ? require('@/assets/images/placeholder_photographer.png') // ✅ placeholder local
            : { uri: fotografiaUrl }
        }
        style={styles.imagen}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        resizeMode="cover"
        onError={() => setImageError(true)} // ✅ fallback si la imagen falla
      >
        <View style={styles.ratingContainer}>
          <Star size={16} color={Colors.light.background} weight="fill" />
          <Text style={styles.ratingText}>{puntuacion.toFixed(1)}</Text>
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
    height: 70,
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
});
