import { StyleSheet, View, Text } from 'react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Fonts from '@/constants/Fonts';
import UserProfilePicture from '@/components/ui/UserPfp';

type Props = {
    username?: string; // Si no hay usuario, se mostrará "Iniciar sesión"
}

export default function HomeWelcome({ username }: Props ) {
    const today = format(new Date(), "d 'de' MMMM 'de' yyyy", { locale: es});

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.date}>{today}</Text>
                <Text style={styles.welcome}>
                    Bienvenido, <Text style={styles.username}>
                        {username ? username: 'Inicia Sesión'}
                    </Text>
                </Text>
            </View>

            <UserProfilePicture />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 35,
    },
    date: {
        fontSize: 14,
        color: '#000',
        fontFamily: Fonts.semiBold,
    },
    welcome: {
        fontSize: 20,
        marginTop: 4,
        color: '#000',
        fontFamily: Fonts.regular,
    },
    username: {
        fontFamily: Fonts.bold,
    }
})