import { View, Text, StyleSheet } from 'react-native';
import ScrollWithAnimatedHeader from '@/components/framing/ScrollWithAnimatedHeader';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import NotificacionesList from '@/components/fm_lists/NotificacionesList';

export default function InboxScreen() {
    return (
        <ScrollWithAnimatedHeader title="">
            <View style={styles.container}>
                <Text style={styles.label}>Notificaciones</Text>
                <NotificacionesList />
            </View>
        </ScrollWithAnimatedHeader>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontFamily: Fonts.bold,
        fontSize: 24,
    }
});