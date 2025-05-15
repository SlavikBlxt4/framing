import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { StyledText } from '@/components/StyledText';
import AppointmentCard from '../../components/fm_cards/TarjetaAgenda';
import NotificacionCard from '../../components/ui/NotificacionCard';

export default function NotificacionesScreen() {
  return (
    <View style={styles.container}>
      <StyledText style={styles.title} weight="bold">Notificaciones</StyledText>
      <Text style={styles.text}>Aquí podrás ver tus notificaciones y mensajes.</Text>
      <ScrollView>
        <NotificacionCard
        nombre="Fulanito"
        mensaje="ha solicitado una sesión"
        imagen={require('../../assets/images/placeholder_profile.png')} // Cambia la ruta si tu imagen está en otro lugar
      />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  title: {
    fontSize: 24,
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