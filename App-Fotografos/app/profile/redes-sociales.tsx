import { StyleSheet, View } from 'react-native';
import { StyledText } from '@/components/StyledText';
import Colors from '@/constants/Colors';

export default function RedesSocialesScreen() {
  return (
    <View style={styles.container}>
      <StyledText style={styles.title} weight="bold">Redes Sociales</StyledText>
      <StyledText style={styles.placeholder}>Pantalla en desarrollo</StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  placeholder: {
    fontSize: 16,
    color: Colors.light.tabIconDefault,
  },
}); 