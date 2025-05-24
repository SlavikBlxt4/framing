import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useUser } from '@/context/UserContext';

export default function UserProfilePicture() {
  const { user } = useUser();
  const router = useRouter();

  const handlePress = () => {
    router.push("/profile");
  };

  return (
    <Pressable style={styles.picture} onPress={handlePress}>
      <Image
        source={
          user?.url_profile_image
            ? { uri: `${user.url_profile_image}?t=${Date.now()}` }
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
