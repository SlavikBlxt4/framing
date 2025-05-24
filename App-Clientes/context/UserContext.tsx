import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UsuarioProps } from '@/types/user';

type UserContextType = {
  user: UsuarioProps | null;
  setUser: (user: UsuarioProps | null) => void;
  refreshUserFromCache: () => Promise<void>;
  isPremiumUser: boolean;
  setPremiumUser: (value: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UsuarioProps | null>(null);
  const [isPremiumUser, setPremiumUser] = useState(false); // false -> hay anuncios

  const refreshUserFromCache = async () => {
    try {
      const json = await AsyncStorage.getItem('currentUser');
      if (json) {
        const parsed: UsuarioProps = JSON.parse(json);
        setUser(parsed);
      }
    } catch (e) {
      console.error('Error al cargar currentUser desde caché:', e);
    }
  };

  useEffect(() => {
    refreshUserFromCache();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, refreshUserFromCache, isPremiumUser, setPremiumUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
