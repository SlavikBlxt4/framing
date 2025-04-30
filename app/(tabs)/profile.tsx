// React - React Native
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

// Navegación
import { useRouter } from 'expo-router';

// Almacenamiento local
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componentes
import ScrollWithAnimatedHeader from '@/components/framing/ScrollWithAnimatedHeader';

// Íconos (Phosphor)
import { Star, BookBookmark, Heart, CreditCard, User, Gear, Info } from 'phosphor-react-native';

// Constantes
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';

// Datos simulados
import mockUsers from '@/mocks/mockUsuarios';
import { UsuarioProps } from '@/types/Usuario.type';


// Pantalla de perfil de un usuario

export default function ProfileScreen() {
  const router = useRouter();

  // Estado para almacenar el usuario actual (si está logueado)
  const [currentUser, setCurrentUser] = useState<UsuarioProps | null>(null);

  // Al montar el componente, busca el usuario guardado en AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        const user = mockUsers.find((u) => u.id === parseInt(id));
        if (user) {
          setCurrentUser(user);
        }
      }
    };   

    fetchUser();
  }, []);

  // Función para cerrar sesión: elimina el ID guardado y redirige
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    setCurrentUser(null);
    router.push('/profile');
  }


  return (
    <ScrollWithAnimatedHeader title="">
      {/* Sección del encabezado del perfil */}
      <View style={styles.header}>
        <Text style={styles.title}>Tu Perfil</Text>
        
        {/* Si el usuario está logueaado, muestra su email */}
        {currentUser ? (
          <>
            <Text style={styles.subtitle}>{currentUser.email}</Text>
          </>
        ) : (
          <>
          {/* Si no está logueado, muestra un mensaje y botón para login / register */}
            <Text style={styles.subtitle}>Desde esta sección podrás gestionar tu cuenta</Text>
            <Pressable style={styles.boton} onPress={() => router.push('/perfil/Login')}>
              <Text style={styles.botonText}>Inicia sesión o regístrate</Text>
            </Pressable>
          </>
        )}
      </View>

      {/* Contenido de la pantalla: accesos rápidos y configuraciones */}
      <View style={styles.content}>
        
        {/* Actividad del usuario */}
        <View>
          <Text style={styles.contentTitle}>Tu actividad</Text>
          <Pressable style={styles.contentButton} onPress={() => router.push('/inicio/reservas/GestorReservas')}> 
            <BookBookmark />
            <Text style={styles.contentText}>Gestor de reservas</Text> 
          </Pressable>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/MiniPantallas/Rate')}> 
            <Star />
            <Text style={styles.contentText}>Reseñas</Text> 
          </Pressable>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/MiniPantallas/Favoritos')}> 
            <Heart />
            <Text style={styles.contentText}>Favoritos</Text> 
          </Pressable>
        </View>

        {/* Métodos de pago */}
        <View>
          <Text style={styles.contentTitle}>Métodos de pago</Text>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/MiniPantallas/Pago')}> 
            <CreditCard />
            <Text style={styles.contentText}>Pago</Text> 
          </Pressable>
        </View>

        {/* Información personal del usuario */}
        <View>
          <Text style={styles.contentTitle}>Información sobre ti</Text>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/MiniPantallas/DatosPersonales')}> 
            <User />
            <Text style={styles.contentText}>Datos personales</Text> 
          </Pressable>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/MiniPantallas/Ajustes')}> 
            <Gear />
            <Text style={styles.contentText}>Ajustes</Text> 
          </Pressable>
        </View>

        {/* Centro de ayuda */}
        <View>
          <Text style={styles.contentTitle}>Centro de ayuda</Text>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/MiniPantallas/ObtenerAyuda')}> 
            <Info />
            <Text style={styles.contentText}>Obtener ayuda</Text> 
          </Pressable>
        </View>

        {/* Botón de cerrar sesión (solo visible si hay un usuario logueado) */}
        <Pressable style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>


      </View>
    </ScrollWithAnimatedHeader>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.light.text,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
    textAlign: 'center',
  },
  boton: {
    backgroundColor: Colors.light.accent,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  botonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.light.tint,
    includeFontPadding: false,
  },
  content: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: Colors.light.tint,
    paddingVertical: 12,
    gap: 20,
  },
  contentTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.light.tint,
  },
  contentButton: {
    flexDirection: 'row',
    gap: 10,
  },
  contentText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 5,
  },
  logout: {},
  logoutText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: '#DC2621',
  }
})