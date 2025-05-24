// React - React Native
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Pressable } from 'react-native';

// Navegación
import { useRouter } from 'expo-router';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente funcional que muestra la foto de perfil del usuario (o un placeholder)
export default function UserProfilePicture() {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const json = await AsyncStorage.getItem("currentUser");
        if (json) {
          const user = JSON.parse(json);
          const url = user?.url_profile_image;

          if (url && typeof url === "string" && url.startsWith("http")) {
            setImageUrl(url);
          }
        }
      } catch (error) {
        console.error("Error cargando imagen de perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handlePress = () => {
    router.push("/profile");
  };

  return (
    <Pressable style={styles.picture} onPress={handlePress}>
      <Image
        source={
          loading
            ? require("@/assets/images/placeholder_profile.png")
            : imageUrl
            ? { uri: imageUrl }
            : require("@/assets/images/placeholder_profile.png")
        }
        style={styles.image}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'gray',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
