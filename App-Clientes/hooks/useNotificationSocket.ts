// hooks/useNotificationSocket.ts
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Notification } from '@/types/notification';
import api from '@/services/api';


export const useNotificationSocket = (
  userId: number,
  token: string,
  onNotification: (n: Notification) => void,
) => {
  const socketRef = useRef<Socket>();
  console.log('🔑 Socket auth:', { userId, token });


  useEffect(() => {
    const socket = io(api.defaults.baseURL || 'http://ec2-3-87-201-29.compute-1.amazonaws.com:3000', {
        transports: ['websocket'],
        auth: {
            userId,
            token,
        },
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🟢 Conectado al WebSocket');
    });

    socket.on('new_notification', (data: Notification) => {
      console.log('📨 Notificación recibida:', data);
      onNotification(data);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Desconectado del WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, token]);
};
