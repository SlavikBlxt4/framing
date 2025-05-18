import api from './api';
import { Notification } from '@/types/notification';

export const getMyNotifications = async (): Promise<Notification[]> => {
  const res = await api.get<Notification[]>('/notifications');
  return res.data;
};

export const markNotificationAsRead = async (id: number, token: string) => {
  await api.patch(`/notifications/${id}/read`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
