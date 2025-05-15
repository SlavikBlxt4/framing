import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyledText } from '@/components/StyledText';
import { CalendarBlank } from 'phosphor-react-native';
import AppointmentCard from '@/components/fm_cards/TarjetaAgenda';
import Colors from '@/constants/Colors';

const months = [
  'enero', 'febrero', 'marzo', 'abril',
  'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre',
];

export default function AgendaScreen() {
  const [selectedMonth, setSelectedMonth] = useState('febrero');

  return (
    <ScrollView style={styles.container}>
      {/* Título */}
      <StyledText weight="bold" style={styles.title}>Agenda</StyledText>

      {/* Dropdown de mes */}
      <View style={styles.monthSelector}>
        <StyledText style={{ marginBottom: 5 }}>Selecciona un mes</StyledText>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.picker}
            dropdownIconColor={Colors.light.text}
          >
            {months.map((month) => (
              <Picker.Item key={month} label={month} value={month} />
            ))}
          </Picker>
        </View>
      </View>

      {/* HOY */}
      <View style={styles.todaySection}>
        <StyledText weight="bold" style={styles.sectionTitle}>HOY</StyledText>
        <Text style={styles.noAppointmentsIcon}> <CalendarBlank /> </Text>
        <StyledText style={styles.noAppointmentsText}>No hay próximas citas</StyledText>
      </View>

      {/* Día: mié, 12 feb */}
      <View style={styles.daySection}>
        <StyledText weight="bold" style={styles.date}>mié, 12 feb</StyledText>
        <AppointmentCard />
        <View style={styles.spacing} />
        <AppointmentCard />
      </View>

      {/* Día: jue, 13 feb */}
      <View style={styles.daySection}>
        <StyledText weight="bold" style={styles.date}>jue, 13 feb</StyledText>
        <AppointmentCard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: Colors.light.text,
  },
  monthSelector: {
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: Colors.light.text,
    backgroundColor: Colors.light.accent,
  },
  todaySection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  noAppointmentsIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  noAppointmentsText: {
    color: Colors.light.tint,
  },
  daySection: {
    marginBottom: 25,
  },
  date: {
    marginBottom: 10,
  },
  spacing: {
    height: 10,
  },
});
