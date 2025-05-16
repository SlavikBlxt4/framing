import Colors from '@/constants/Colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StyledText } from '../StyledText';
import { Trash } from 'phosphor-react-native';
import dayjs from 'dayjs';

type Props = {
  clientName: string;
  serviceName: string;
  sessionDate: string; // ISO 8601
};

const AppointmentCard = ({ clientName, serviceName, sessionDate }: Props) => {
  const hour = dayjs(sessionDate).format('HH:mm');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <StyledText style={styles.text}>{hour}</StyledText>
        <StyledText style={styles.text} weight="bold">
          {clientName} · {serviceName}
        </StyledText>
      </View>
      <View>
        <Trash color="red" />
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    backgroundColor: Colors.light.accent,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 10,
    flexDirection: 'row',
    borderLeftWidth: 20,
  },
  content: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
});
