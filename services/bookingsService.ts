import api from './api';
import { BookingHistoryDto } from '@/types/bookings';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getBookingHistory = async (): Promise<BookingHistoryDto[]> => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('Token no encontrado');

  const response = await api.get('/bookings/history', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
