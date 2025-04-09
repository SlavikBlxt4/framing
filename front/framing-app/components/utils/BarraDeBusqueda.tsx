import { StyleSheet, View, Text, TextInput } from 'react-native';
import { MagnifyingGlass } from 'phosphor-react-native';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Buscar"
                placeholderTextColor={Colors.light.tint}
                style={styles.input}
            />
            <MagnifyingGlass size={20} color={Colors.light.tint} weight="bold"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: Colors.light.tint,
        borderRadius: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.light.accent,
        marginTop: 10,
    },
    input: {
        flex: 1,
        fontFamily: Fonts.semiBold,
        fontSize: 16,
        color: Colors.light.text,
        paddingVertical: 0,
        textAlignVertical: 'center',
        includeFontPadding: false,
    }
})