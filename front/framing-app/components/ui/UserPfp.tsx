import { Image, StyleSheet, View } from "react-native";

type Props = {
    imageUrl?: string;
}

export default function UserProfilePicture({ imageUrl }: Props) {
    const isRemote = !!imageUrl;

    return(
        <View style={styles.picture}>
            <Image 
                source={
                    isRemote 
                        ? { uri: imageUrl } // Imagen desde base de datos
                        : require ('@/assets/images/placeholder_profile.jpg') // Local - Por defecto
                    }
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    picture: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: 'gray',
    },
    image: {
        width: '100%',
        height: '100%',
    }
})