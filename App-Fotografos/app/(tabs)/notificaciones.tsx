import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

export default function NotificacionesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      <View style={styles.separator} />
      <Text style={styles.text}>Aquí podrás ver tus notificaciones y mensajes.</Text>
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