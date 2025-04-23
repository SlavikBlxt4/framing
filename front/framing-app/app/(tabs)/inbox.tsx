import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import ScrollWithAnimatedHeader from '@/components/framing/ScrollWithAnimatedHeader';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import NotificacionesList from '@/components/fm_lists/NotificacionesList';

export default function InboxScreen() {
    const router = useRouter();

    return (
        <ScrollWithAnimatedHeader title="">
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.label}>Notificaciones</Text>
                <Pressable
                    style={styles.button}
                    onPress={() => router.push('/recibidos/FotografiasRecibidas')}
                >
                    <Text style={styles.buttonText}>Fotografías recibidas</Text>
                </Pressable>
                <NotificacionesList />

            </ScrollView>
        </ScrollWithAnimatedHeader>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 32,
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
