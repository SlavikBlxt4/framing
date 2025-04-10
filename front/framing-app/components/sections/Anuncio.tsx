import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Pressable,
  Image,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import AnuncioDrawer from '@/components/framing/AnuncioDrawer'
import { useUser } from '@/context/UserContext';

type Props = {
  imagenUrl?: string;
  link?: string;
};

export default function Anuncio({ imagenUrl, link }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const { isPremiumUser } = useUser();

  if (isPremiumUser) return null;

  const handlePress = () => {
    if (link) Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <AnuncioDrawer visible={showPopup} onClose={() => setShowPopup(false)}></AnuncioDrawer>
      <Pressable style={styles.adContainer} onPress={handlePress}>
        <Image
          source={imagenUrl ? { uri: imagenUrl } : require('@/assets/images/placeholder_ad.png')}
          style={styles.adImage}
          resizeMode="cover"
        />
      </Pressable>

      <Pressable onPress={() => setShowPopup(true)}>
        <Text style={styles.removeText}>Eliminar anuncios</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    width: '100%',
    marginTop: 10,
  },
  adContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: Colors.light.accent,
    borderWidth: 2,
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
  removeText: {
    fontSize: 14,
    color: Colors.light.text,
    fontFamily: Fonts.bold,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
