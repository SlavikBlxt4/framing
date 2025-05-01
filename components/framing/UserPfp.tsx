// React - React Native
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Pressable } from 'react-native';

// Navegación
import { useRouter } from 'expo-router';

// AsyncStorage (almacenamiento local)
import AsyncStorage from '@react-native-async-storage/async-storage';

// Datos simulados
import mockUsers from '@/mocks/mockUsuarios';


// Componente funcional que muestra la foto de perfil del usuario (o un placeholder)
// Al presionar la imagen, navega a la pantalla de perfil

export default function UserProfilePicture() {
  // Estado para guardar la URL de la imagen de perfil del usuario
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  // Hook de navegación de Expo Router
  const router = useRouter();

  // Hook que se ejecuta una vez al montar el componente
  useEffect(() => {
    const loadUser = async () => {
      // Se obtiene el ID del usuario almacenado en AsyncStorage
      const id = await AsyncStorage.getItem("userId");

      // Si existe un ID, se busca el usuario en el mock de usuarios
      if (id) {
        const user = mockUsers.find(u => u.id === parseInt(id));

        // Si se encuentra la URL de su fotografía, se guarda en el estado
        if (user?.fotografia_url) {
          setImageUrl(user.fotografia_url);
        }
      }
    };

    loadUser(); // Ejecuta la carga del usuario
  }, []);

  // Booleano para saber si la imaagen es remota (de internet) o local (placeholder)
  const isRemote = !!imageUrl;

  // Función que se ejecuta al presionar la imagen
  // Navega a la ruta "/profile"
  const handlePress = () => {
    router.push("/profile");
  };

  // Renderiza una imagen de perfil dentro de un Pressable (botón táctil)
  return (
    <Pressable style={styles.picture} onPress={handlePress}>
      <Image 
        source={
          isRemote 
            ? { uri: imageUrl }
            : require("@/assets/images/placeholder_profile.jpg")
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
