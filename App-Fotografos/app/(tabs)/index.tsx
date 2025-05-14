import { StyleSheet, View } from 'react-native';
import { StyledText } from '@/components/StyledText';
import Colors from '@/constants/Colors';
import EditScreenInfo from '@/components/EditScreenInfo';
import AppointmentCard from '@/components/fm_cards/TarjetaAgenda';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <StyledText weight="bold" style={styles.title}>
        Agenda
      </StyledText>
      <AppointmentCard></AppointmentCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    color: Colors.light.text,
  },
});
