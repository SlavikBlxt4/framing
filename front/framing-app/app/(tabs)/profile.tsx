import { View, Text, StyleSheet, Pressable } from 'react-native';
import Fonts from '@/constants/Fonts';
import ScrollWithAnimatedHeader from '@/components/framing/ScrollWithAnimatedHeader';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Star, BookBookmark, Heart, CreditCard, User, Gear, Info } from 'phosphor-react-native';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollWithAnimatedHeader title="">
      <View style={styles.header}>
        <Text style={styles.title}>Tu Perfil</Text>
        <Text style={styles.subtitle}>Desde esta sección podrás gestionar tu cuenta</Text>
        <Pressable style={styles.boton} onPress={() => router.push('/perfil/Login')}>
          <Text style={styles.botonText}>Inicia sesión o regístrate</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.contentTitle}>Tu actividad</Text>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/Login')}> 
            <BookBookmark />
            <Text style={styles.contentText}>Historial de reservas</Text> 
          </Pressable>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/Login')}> 
            <Star />
            <Text style={styles.contentText}>Reseñas</Text> 
          </Pressable>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/Login')}> 
            <Heart />
            <Text style={styles.contentText}>Favoritos</Text> 
          </Pressable>
        </View>

        <View>
          <Text style={styles.contentTitle}>Métodos de pago</Text>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/Login')}> 
            <CreditCard />
            <Text style={styles.contentText}>Pago</Text> 
          </Pressable>
        </View>

        <View>
          <Text style={styles.contentTitle}>Información sobre ti</Text>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/Login')}> 
            <User />
            <Text style={styles.contentText}>Datos personales</Text> 
          </Pressable>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/Login')}> 
            <Gear />
            <Text style={styles.contentText}>Ajustes</Text> 
          </Pressable>
        </View>

        <View>
          <Text style={styles.contentTitle}>Centro de ayuda</Text>
          <Pressable style={styles.contentButton} onPress={() => router.push('/perfil/Login')}> 
            <Info />
            <Text style={styles.contentText}>Obtener ayuda</Text> 
          </Pressable>
        </View>

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
  }
})