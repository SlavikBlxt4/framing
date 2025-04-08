import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts'; // <-- Importante

export default function HomeScreen() {
  const colors = Colors.light;

  return (
    <View style={styles.container}>
      <View style={[styles.box, { backgroundColor: colors.tint }]}>
        <Text style={[styles.label, { color: colors.background }]}>Primary</Text>
      </View>
      <View style={[styles.box, { backgroundColor: colors.background, borderColor: colors.text, borderWidth: 1 }]}>
        <Text style={[styles.label, { color: colors.text }]}>Background</Text>
      </View>
      <View style={[styles.box, { backgroundColor: colors.text }]}>
        <Text style={[styles.label, { color: colors.background }]}>Text</Text>
      </View>
      <View style={[styles.box, { backgroundColor: colors.accent }]}>
        <Text style={[styles.label, { color: colors.text }]}>Accent</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  label: {
    fontFamily: Fonts.bold, // <-- Aquí está la clave
    fontSize: 14,
  },
});
