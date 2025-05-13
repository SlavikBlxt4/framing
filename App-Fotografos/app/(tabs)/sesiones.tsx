import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

export default function SesionesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sesiones</Text>
      <View style={styles.separator} />
      <Text style={styles.text}>Aquí podrás gestionar tus sesiones fotográficas.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    fontSize: 16,
  },
}); 