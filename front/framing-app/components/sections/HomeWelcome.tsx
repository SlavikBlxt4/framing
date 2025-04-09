import { StyleSheet, View, Text } from 'react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Fonts from '@/constants/Fonts';
import UserProfilePicture from '@/components/ui/UserPfp';
import SearchBar from '../utils/BarraDeBusqueda';

type Props = {
    username?: string; // Si no hay usuario, se mostrará "Iniciar sesión"
}

export default function HomeWelcome({ username }: Props ) {
    // Se muestra la fecha real en formato "x de mes de 20xx" a través del "es" se especifica el lenguaje del mes
    const today = format(new Date(), "d 'de' MMMM 'de' yyyy", { locale: es});

    return (
        <View style={styles.header}>
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
            <SearchBar />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'column',
    },
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