import api from './api';
import { RatingRequestDto } from '@/types/ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const rateService = async (payload: RatingRequestDto): Promise<void> => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('Token no encontrado');

  await api.post('/ratings/rate', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
