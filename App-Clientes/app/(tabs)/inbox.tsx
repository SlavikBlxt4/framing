// React - React Native
import { Text, StyleSheet, ScrollView, Pressable } from 'react-native';

// Navegación
import { useRouter } from 'expo-router';

// Componentes propios
import ScrollWithAnimatedHeader from '@/components/framing/ScrollWithAnimatedHeader';
import NotificacionesList from '@/components/fm_lists/NotificacionesList';

// Constantes
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

// Pantalla de "Recibidos" que muestra notificaciones y un acceso directo a las fotografías recibidas
export default function InboxScreen() {
    // Hook de navegación proporcionado por expo-router
    const router = useRouter();

    return (
        // Componente que renderiza una cabecera animada con scroll integrado
    <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Titulo principal de la pantalla */}
        <Text style={styles.label}>Notificaciones</Text>

        {/* Botón que navega a la pantalla de fotografías recibidas */}
        <Pressable
            style={styles.button}
            onPress={() => router.push('/recibidos/FotografiasRecibidas')}
        >
            <Text style={styles.buttonText}>Fotografías recibidas</Text>
        </Pressable>

        {/* Lista de notificaciones */}
        <NotificacionesList />

    </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 20,
        backgroundColor: Colors.light.background,
        flex: 1,
        paddingVertical: 40,
    },
    label: {
        fontFamily: Fonts.bold,
        fontSize: 24,
    },
    button: {
        marginVertical: 24,
        backgroundColor: Colors.light.tint,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Fonts.regular,
        includeFontPadding: false,
    },
});
