import { StyleSheet, View } from 'react-native';
import { StyledText } from '@/components/StyledText';
import Colors from '@/constants/Colors';
import EditScreenInfo from '@/components/EditScreenInfo';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <StyledText weight="bold" style={styles.title}>
        Bienvenido a Framing
      </StyledText>
      <View style={styles.separator} />
      <StyledText style={styles.subtitle}>
        Tu aplicación de gestión fotográfica
      </StyledText>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.text,
    opacity: 0.8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: Colors.light.border,
  },
});
