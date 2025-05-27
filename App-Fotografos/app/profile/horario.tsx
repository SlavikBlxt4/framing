import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { StyledText } from '@/components/StyledText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/services/api';
import { Picker } from '@react-native-picker/picker';

interface DaySchedule {
  enabled: boolean;
  hasSecondShift: boolean;
  firstShiftStart: string;
  firstShiftEnd: string;
  secondShiftStart: string;
  secondShiftEnd: string;
}

interface WeekSchedule {
  [key: number]: DaySchedule;
}

const DAYS = [
  { id: 1, name: 'Lunes' },
  { id: 2, name: 'Martes' },
  { id: 3, name: 'Miércoles' },
  { id: 4, name: 'Jueves' },
  { id: 5, name: 'Viernes' },
  { id: 6, name: 'Sábado' },
  { id: 7, name: 'Domingo' },
];

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

export default function HorarioScreen() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<WeekSchedule>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await api.get('/photographer-availability');
        const data = response.data || [];
        const newSchedule: WeekSchedule = {};
        DAYS.forEach(day => {
          const dayData = data.find((d: any) => d.day === day.id);
          if (dayData && Array.isArray(dayData.slots) && dayData.slots.length > 0) {
            if (dayData.slots.length === 1) {
              // Solo un turno
              newSchedule[day.id] = {
                enabled: true,
                hasSecondShift: false,
                firstShiftStart: dayData.slots[0].start.substring(0,5),
                firstShiftEnd: dayData.slots[0].end.substring(0,5),
                secondShiftStart: '15:00',
                secondShiftEnd: '20:00',
              };
            } else if (dayData.slots.length === 2) {
              // Dos turnos
              newSchedule[day.id] = {
                enabled: true,
                hasSecondShift: true,
                firstShiftStart: dayData.slots[0].start.substring(0,5),
                firstShiftEnd: dayData.slots[0].end.substring(0,5),
                secondShiftStart: dayData.slots[1].start.substring(0,5),
                secondShiftEnd: dayData.slots[1].end.substring(0,5),
              };
            } else {
              // Más de dos turnos, solo tomamos los dos primeros
              newSchedule[day.id] = {
                enabled: true,
                hasSecondShift: true,
                firstShiftStart: dayData.slots[0].start.substring(0,5),
                firstShiftEnd: dayData.slots[0].end.substring(0,5),
                secondShiftStart: dayData.slots[1].start.substring(0,5),
                secondShiftEnd: dayData.slots[1].end.substring(0,5),
              };
            }
          } else {
            // Sin slots: día desactivado y valores por defecto
            newSchedule[day.id] = createEmptyDaySchedule();
          }
        });
        setSchedule(newSchedule);
      } catch (error) {
        console.error('Error cargando disponibilidad:', error);
        // Si hay error, inicializar vacío
        const emptySchedule: WeekSchedule = {};
        DAYS.forEach(day => {
          emptySchedule[day.id] = createEmptyDaySchedule();
        });
        setSchedule(emptySchedule);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, []);

  const createEmptyDaySchedule = (): DaySchedule => ({
    enabled: false,
    hasSecondShift: false,
    firstShiftStart: '09:00',
    firstShiftEnd: '14:00',
    secondShiftStart: '15:00',
    secondShiftEnd: '20:00',
  });

  const handleDayToggle = (dayId: number) => {
    setSchedule(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        enabled: !prev[dayId].enabled,
      },
    }));
  };

  const handleSecondShiftToggle = (dayId: number) => {
    setSchedule(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        hasSecondShift: !prev[dayId].hasSecondShift,
      },
    }));
  };

  const handleTimeChange = (dayId: number, field: keyof DaySchedule, value: string) => {
    setSchedule(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        [field]: value,
      },
    }));
  };

  const buildSlots = (daySchedule: DaySchedule) => {
    const slots = [];
    if (daySchedule.firstShiftStart && daySchedule.firstShiftEnd) {
      slots.push({ start: daySchedule.firstShiftStart, end: daySchedule.firstShiftEnd });
    }
    if (daySchedule.hasSecondShift && daySchedule.secondShiftStart && daySchedule.secondShiftEnd) {
      slots.push({ start: daySchedule.secondShiftStart, end: daySchedule.secondShiftEnd });
    }
    return slots;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Guardar cada día activo
      for (const day of DAYS) {
        const daySchedule = schedule[day.id];
        if (daySchedule.enabled) {
          const slots = buildSlots(daySchedule);
          await api.post('/photographer-availability', {
            day: day.id,
            slots,
          });
        } else {
          // Si quieres limpiar el día desactivado, puedes hacer un POST con slots vacío
          // await api.post('/photographer-availability', { day: day.id, slots: [] });
        }
      }
      Alert.alert('Horario guardado', 'La disponibilidad se ha actualizado correctamente.');
      router.back();
    } catch (error) {
      console.error('Error guardando horario:', error);
      Alert.alert('Error', 'Error al guardar el horario. Por favor, inténtalo de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <StyledText>Cargando horario...</StyledText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StyledText weight="bold" style={styles.title}>Configurar Horario</StyledText>
      {DAYS.map(day => (
        <View key={day.id} style={styles.dayContainer}>
          <View style={styles.dayHeader}>
            <Switch
              value={schedule[day.id].enabled}
              onValueChange={() => handleDayToggle(day.id)}
            />
            <StyledText weight="bold" style={styles.dayName}>{day.name}</StyledText>
          </View>
          {schedule[day.id].enabled && (
            <View style={styles.shiftsContainer}>
              <View style={styles.shiftContainer}>
                <StyledText style={styles.shiftLabel}>Primer turno</StyledText>
                <View style={styles.timePickerContainer}>
                  <Picker
                    selectedValue={schedule[day.id].firstShiftStart}
                    onValueChange={(value) => handleTimeChange(day.id, 'firstShiftStart', value)}
                    style={styles.picker}
                  >
                    {HOURS.map(hour => (
                      <Picker.Item key={`start-${hour}`} label={hour} value={hour} />
                    ))}
                  </Picker>
                  <StyledText>a</StyledText>
                  <Picker
                    selectedValue={schedule[day.id].firstShiftEnd}
                    onValueChange={(value) => handleTimeChange(day.id, 'firstShiftEnd', value)}
                    style={styles.picker}
                  >
                    {HOURS.map(hour => (
                      <Picker.Item key={`end-${hour}`} label={hour} value={hour} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.secondShiftToggle}>
                <StyledText>Segundo turno</StyledText>
                <Switch
                  value={schedule[day.id].hasSecondShift}
                  onValueChange={() => handleSecondShiftToggle(day.id)}
                />
              </View>
              {schedule[day.id].hasSecondShift && (
                <View style={styles.shiftContainer}>
                  <View style={styles.timePickerContainer}>
                    <Picker
                      selectedValue={schedule[day.id].secondShiftStart}
                      onValueChange={(value) => handleTimeChange(day.id, 'secondShiftStart', value)}
                      style={styles.picker}
                    >
                      {HOURS.map(hour => (
                        <Picker.Item key={`start2-${hour}`} label={hour} value={hour} />
                      ))}
                    </Picker>
                    <StyledText>a</StyledText>
                    <Picker
                      selectedValue={schedule[day.id].secondShiftEnd}
                      onValueChange={(value) => handleTimeChange(day.id, 'secondShiftEnd', value)}
                      style={styles.picker}
                    >
                      {HOURS.map(hour => (
                        <Picker.Item key={`end2-${hour}`} label={hour} value={hour} />
                      ))}
                    </Picker>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      ))}
      <TouchableOpacity 
        style={[styles.saveButton, saving && styles.saveButtonDisabled]} 
        onPress={handleSave}
        disabled={saving}
      >
        <StyledText weight="bold" style={styles.saveButtonText}>
          {saving ? 'Guardando...' : 'Guardar Horario'}
        </StyledText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  dayContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayName: {
    fontSize: 18,
    marginLeft: 10,
  },
  shiftsContainer: {
    marginTop: 10,
  },
  shiftContainer: {
    marginBottom: 15,
  },
  shiftLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.light.tint,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  picker: {
    flex: 1,
    height: 50,
  },
  secondShiftToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
