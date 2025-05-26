// React - React Native
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Íconos (Phosphor)
import {
  Star,
  BookBookmark,
  Heart,
  CreditCard,
  User,
  Gear,
  Info,
  Image as ImageIcon,
} from 'phosphor-react-native';

// Constantes
import Fonts from '@/constants/Fonts';
import Colors from '@/constants/Colors';

// Contexto
import { useUser } from '@/context/UserContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, setUser } = useUser(); // ✅ usar contexto

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      'token',
      'userId',
      'userEmail',
      'userRole',
      'currentUser',
    ]);
    setUser(null); // ✅ limpiar contexto
    router.push('/perfil/Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tu Perfil</Text>

        {user ? (
          <Text style={styles.subtitle}>Hola, {user.name}</Text>
        ) : (
          <>
            <Text style={styles.subtitle}>
              Desde esta sección podrás gestionar tu cuenta
            </Text>
            <Pressable
              style={styles.boton}
              onPress={() => router.push('/perfil/Login')}
            >
              <Text style={styles.botonText}>Inicia sesión o regístrate</Text>
            </Pressable>
          </>
        )}
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.contentTitle}>Tu actividad</Text>
          <Pressable
            style={styles.contentButton}
            onPress={() => router.push('/inicio/reservas/GestorReservas')}
          >
            <BookBookmark />
            <Text style={styles.contentText}>Gestor de reservas</Text>
          </Pressable>
          <Pressable
            style={styles.contentButton}
            onPress={() => router.push('/perfil/MiniPantallas/Rate')}
          >
            <Star />
            <Text style={styles.contentText}>Reseñas</Text>
          </Pressable>
          <Pressable
            style={styles.contentButton}
            onPress={() => router.push('/perfil/MiniPantallas/Favoritos')}
          >
            <Heart />
            <Text style={styles.contentText}>Favoritos</Text>
          </Pressable>
        </View>

        <View>
          <Text style={styles.contentTitle}>Métodos de pago</Text>
          <Pressable
            style={styles.contentButton}
            onPress={() => router.push('/perfil/MiniPantallas/Pago')}
          >
            <CreditCard />
            <Text style={styles.contentText}>Pago</Text>
          </Pressable>
        </View>

        <View>
          <Text style={styles.contentTitle}>Información sobre ti</Text>
          <Pressable
            style={styles.contentButton}
            onPress={() => router.push('/perfil/MiniPantallas/DatosPersonales')}
          >
            <User />
            <Text style={styles.contentText}>Datos personales</Text>
          </Pressable>
          <Pressable
            style={styles.contentButton}
            onPress={() => router.push('/perfil/MiniPantallas/FotoPerfil')}
          >
            <ImageIcon />
            <Text style={styles.contentText}>Foto de perfil</Text>
          </Pressable>
          <Pressable
            style={styles.contentButton}
            onPress={() => router.push('/perfil/MiniPantallas/Ajustes')}
          >
            <Gear />
            <Text style={styles.contentText}>Ajustes</Text>
          </Pressable>
        </View>

        <View>
          <Text style={styles.contentTitle}>Centro de ayuda</Text>
          <Pressable
            style={styles.contentButton}
            onPress={() => router.push('/perfil/MiniPantallas/ObtenerAyuda')}
          >
            <Info />
            <Text style={styles.contentText}>Obtener ayuda</Text>
          </Pressable>
        </View>

        <Pressable style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
    paddingVertical: 40,
  },
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
  },
});
