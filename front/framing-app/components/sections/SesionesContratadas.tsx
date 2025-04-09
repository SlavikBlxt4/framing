import { StyleSheet, View, Text, Pressable } from 'react-native'
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import TarjetaSesiones from '@/components/ui/TarjetaSesiones';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'phosphor-react-native';

export default function SesionesContratadas() {
    const router = useRouter();
    const reserva = { id: '123', nombre: 'Estudio Fotográfico' };
    
    return (
        <View style={styles.container}>
            {/* Título con flecha */}
            <Pressable style={styles.header} onPress={() => router.push('/reservas/GestorReservas')}>
                <Text style={styles.title}>Sesiones contratadas</Text>
                <ArrowRight size={20} color={Colors.light.text} weight="bold"/>
            </Pressable>

            {/* Tarjeta de sesión */}
            <TarjetaSesiones />

            {/* Botón "Ver Reserva" */}
            <Pressable style={styles.button} onPress={() => router.push({pathname: '/reservas/DetalleReserva', params: reserva,})}>
                <Text style={styles.buttonText}>Ver reserva</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: Fonts.bold,
        fontSize: 20,
        color: Colors.light.text,
    },
    button: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.light.tint,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
    },
    buttonText: {
        color: Colors.light.background,
        fontFamily: Fonts.regular,
        fontSize: 16,
        includeFontPadding: false,
    }
})