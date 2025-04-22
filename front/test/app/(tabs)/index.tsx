import { SafeAreaView, StyleSheet } from 'react-native';
import GridTwoColumn from '@/components/ui/grid/GridTwoColumn';
import HorizontalGrid from '@/components/ui/grid/HorizontalGrid';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <GridTwoColumn/>
      <HorizontalGrid />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
