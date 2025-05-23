import { ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import { StyledText } from '@/components/StyledText';
import Colors from '@/constants/Colors';
import { PencilSimple } from 'phosphor-react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'userEmail', 'userId', 'userRole']);
      router.replace('/sign/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      {/* Cabecera de perfil */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/placeholder_profile.png')} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <StyledText style={styles.studioName} weight="bold">Estudio Fotográfico</StyledText>
          <StyledText style={styles.address}>C. Violeta Parra 9, 50015. Zaragoza</StyledText>
        </View>
      </View>

      {/* Sección Información pública */}
      <StyledText style={styles.sectionTitle} weight="bold">Información pública</StyledText>
      <View style={styles.card}>
        <Option label="Nombre y dirección" onPress={() => router.push('/profile/nombre-direccion')} />
        <Option label="Logo y portada" onPress={() => router.push('/profile/logo-portada')} />
        <Option label="Horario del estudio" onPress={() => router.push('/profile/horario')} />
        <Option label="Portfolio" onPress={() => router.push('/profile/portfolio')} />
        <Option label="Sesiones" onPress={() => router.push('/profile/sesiones')} />
        <Option label="Servicios" onPress={() => router.push('/profile/servicios')} />
      </View>

      {/* Sección Compartir - Comentada temporalmente
      <StyledText style={styles.sectionTitle} weight="bold">Compartir</StyledText>
      <View style={styles.card}>
        <Option label="Compartir perfil" onPress={() => router.push('/profile/compartir-perfil')} />
        <Option label="Agregar redes sociales" onPress={() => router.push('/profile/redes-sociales')} />
      </View>
      */}

      {/* Sección Cerrar sesión */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <StyledText style={styles.logoutText}>Cerrar sesión</StyledText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Option({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <StyledText style={styles.optionText}>{label}</StyledText>
      <Text style={styles.caret}>{'>'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  studioName: {
    fontSize: 17,
    marginBottom: 2,
  },
  address: {
    fontSize: 13,
    color: Colors.light.tabIconDefault,
  },
  editButton: {
    padding: 6,
    borderRadius: 20,
    marginLeft: 4,
  },
  sectionTitle: {
    color: Colors.light.tint,
    fontSize: 15,
    marginTop: 10,
    marginBottom: 6,
    marginLeft: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 2,
    gap: 2,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
  },
  caret: {
    fontSize: 18,
    color: Colors.light.tabIconDefault,
    marginLeft: 8,
  },
  logoutButton: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  logoutText: {
    color: '#DC2621',
    fontSize: 15,
    fontWeight: '600',
  }
}); 