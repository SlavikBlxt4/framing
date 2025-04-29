import { Image, StyleSheet, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import mockUsers from "@/mocks/mockUsuarios";
import { useRouter } from "expo-router";

export default function UserProfilePicture() {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const id = await AsyncStorage.getItem("userId");
      if (id) {
        const user = mockUsers.find(u => u.id === parseInt(id));
        if (user?.fotografia_url) {
          setImageUrl(user.fotografia_url);
        }
      }
    };

    loadUser();
  }, []);

  const isRemote = !!imageUrl;

  const handlePress = () => {
    router.push("/profile");
  };

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
