import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserById } from '@/services/userInfoService';
import { UsuarioProps } from '@/types/user';

export function useCurrentUser() {
  const [user, setUser] = useState<UsuarioProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (!id) return;

        const data = await getUserById(parseInt(id));
        setUser(data);

        // Guarda también en AsyncStorage si quieres usarlo offline
        await AsyncStorage.setItem('userFullName', data.name);
        await AsyncStorage.setItem('userProfilePic', data.url_profile_image || '');
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
