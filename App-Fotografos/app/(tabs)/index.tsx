import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { CalendarBlank } from 'phosphor-react-native';
import Colors from '@/constants/Colors';
import AppointmentCard from '@/components/fm_cards/TarjetaAgenda';
import { StyledText } from '@/components/StyledText';
import api from '../../services/api';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { AxiosError } from 'axios';

dayjs.locale('es');

type AgendaDay = {
  date: string;
  label: string;
  sessions: {
    bookingId: number;
    clientName: string;
    serviceName: string;
    date: string;
  }[];
};

export default function AgendaScreen() {
  const [agenda, setAgenda] = useState<AgendaDay[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          router.replace('/sign/login');
          return;
        }
        fetchAgenda();
      } catch (error) {
        console.error('Error verificando sesión:', error);
        router.replace('/sign/login');
      }
    };

    const fetchAgenda = async () => {
      try {
        const response = await api.get('/bookings/active-bookings-photographer/next-5-days');
        setAgenda(response.data);
      } catch (error) {
        console.error('Error cargando la agenda:', error);
        if (error instanceof AxiosError && error.response?.status === 401) {
          router.replace('/sign/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Título */}
      <StyledText weight="bold" style={styles.title}>Agenda</StyledText>

      {loading ? (
        <StyledText style={styles.noAppointmentsText}>Cargando agenda...</StyledText>
      ) : (
        agenda.map((day) => (
          <View key={day.date} style={styles.daySection}>
            <StyledText weight="bold" style={styles.date}>
              {day.label.toLowerCase()}
            </StyledText>

            {day.sessions.length === 0 ? (
              <View style={styles.noAppointmentsContainer}>
                <Text style={styles.noAppointmentsIcon}>
                  <CalendarBlank />
                </Text>
                <StyledText style={styles.noAppointmentsText}>No hay sesiones hoy</StyledText>
              </View>
            ) : (
              day.sessions.map((session) => (
                <AppointmentCard
                  key={session.bookingId}
                  clientName={session.clientName}
                  serviceName={session.serviceName}
                  sessionDate={session.date}
                />
              ))
            )}
          </View>
        ))
      )}
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
  },
  daySection: {
    marginBottom: 25,
  },
  date: {
    marginBottom: 10,
    fontSize: 16,
  },
  noAppointmentsContainer: {
    alignItems: 'center',
  },
  noAppointmentsIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  noAppointmentsText: {
    color: Colors.light.tint,
  },
});
