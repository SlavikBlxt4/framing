import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { StyledText } from '../StyledText';
import { CaretRight } from 'phosphor-react-native';

type Props = {
  bookingDate: string;
  clientName: string;
  serviceName: string;
  onPress?: () => void;
};

const BookingCard = ({ bookingDate, clientName, serviceName, onPress }: Props) => {
  // Formatear la fecha: 2024-11-01 -> 01-11-2024
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <StyledText style={styles.dateText} weight="bold">
          {formatDate(bookingDate)}
        </StyledText>
        <StyledText style={styles.detailsText}>
          {clientName} · {serviceName}
        </StyledText>
      </View>
      <CaretRight size={18} color={Colors.light.text} />
    </TouchableOpacity>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.accent,
    borderColor: Colors.light.tint,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderLeftWidth: 10,
  },
  content: {
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    marginBottom: 2,
  },
  detailsText: {
    fontSize: 14,
  },
});
