import { SafeAreaView, StyleSheet, Text } from 'react-native';
import GridTwoColumn from '@/components/ui/grid/GridTwoColumn';
import HorizontalGrid from '@/components/ui/grid/HorizontalGrid';
import { fontConfig } from '@/constants/Theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la App!</Text>
      <GridTwoColumn/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontFamily: fontConfig.bold, // Usa Poppins_700Bold
    marginBottom: 12,
  },
});
