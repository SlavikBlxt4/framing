import { View, Text } from 'react-native';
import ScrollWithAnimatedHeader from '@/components/framing/ScrollWithAnimatedHeader';

export default function InboxScreen() {
    return (
        

        <ScrollWithAnimatedHeader title="Mi Título">
            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                <Text>Inbox funciona</Text>
            </View>
        </ScrollWithAnimatedHeader>

    )
}