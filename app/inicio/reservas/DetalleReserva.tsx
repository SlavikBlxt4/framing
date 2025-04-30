import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Dialog, Portal, Button, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import { PaperPlaneTilt, CalendarX } from 'phosphor-react-native';
import Fonts from '@/constants/Fonts';
import { Colors } from '@/constants/Colors';

export default function DetalleReserva() {
  const navigation = useNavigation();
  const { nombre, fecha, direccion, fotografiaUrl, hora } = useLocalSearchParams();
  const fechaStr = typeof fecha === 'string' ? fecha : fecha?.[0];
  const horaStr = typeof hora === 'string' ? hora : hora?.[0];

  const [dialogVisible, setDialogVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Detalles de la reserva',
    });
  }, [navigation]);

  const abrirEnGoogleMaps = () => {
    if (!direccion) return;
    const query = encodeURIComponent(typeof direccion === 'string' ? direccion : direccion[0]);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url);
  };

  const calcularTiempoFaltante = () => {
    if (!fechaStr || !horaStr) return null;

    const [d, m, y] = fechaStr.split('/').map(Number);
    const [h, min] = horaStr.split(':').map(Number);
    const fechaSesion = new Date(y, m - 1, d, h, min);
    const ahora = new Date();

    const diffMs = fechaSesion.getTime() - ahora.getTime();
    if (diffMs <= 0) return 'La sesión ya ocurrió';

    const totalMin = Math.floor(diffMs / (1000 * 60));
    const minutos = totalMin % 60;
    const totalHoras = Math.floor(totalMin / 60);
    const horas = totalHoras % 24;
    const dias = Math.floor(totalHoras / 24);
    const meses = Math.floor(dias / 30);

    if (dias === 0 && horas === 0) {
      return `${minutos} minuto${minutos !== 1 ? 's' : ''}`;
    } else if (dias === 0) {
      return `${horas} hora${horas !== 1 ? 's' : ''} y ${minutos} minuto${minutos !== 1 ? 's' : ''}`;
    } else if (meses >= 1) {
      return `${meses} mes${meses !== 1 ? 'es' : ''}`;
    } else if (dias > 2) {
      return `${dias} días`;
    } else {
      return `${dias} día${dias !== 1 ? 's' : ''} y ${horas} hora${horas !== 1 ? 's' : ''}`;
    }
  };

  const tiempoFaltante = calcularTiempoFaltante();

  const mostrarDialogo = () => setDialogVisible(true);
  const cerrarDialogo = () => setDialogVisible(false);
  const confirmarCancelacion = () => {
    cerrarDialogo();
    console.log('Reserva cancelada');
    // Puedes navegar o mostrar otra alerta aquí
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.content}>
          {fotografiaUrl && (
            <Image
              source={{ uri: fotografiaUrl.toString() }}
              style={styles.imagen}
              resizeMode="cover"
            />
          )}
          <Text style={styles.nombre}>{nombre}</Text>

          <Text style={styles.sesion}>Próxima sesión en:</Text>
          <Text style={styles.tiempo}>{tiempoFaltante}</Text>
          <Text style={styles.fecha}>{fecha} {hora}</Text>

          {direccion && (
            <>
              <Text style={styles.direccion}>{direccion}</Text>
              <Pressable onPress={abrirEnGoogleMaps} style={styles.boton}>
                <Text style={styles.botonTexto}>Ver en Google Maps</Text>
                <PaperPlaneTilt color='white' weight='fill' />
              </Pressable>
            </>
          )}
        </View>

        <Pressable onPress={mostrarDialogo} style={styles.botonCancelar}>
          <Text style={styles.botonCancelarTexto}>Quiero cancelar mi reserva</Text>
          <CalendarX weight='fill' color='#fff' />
        </Pressable>

        <Portal>
          <Dialog style={styles.dialogo} visible={dialogVisible} onDismiss={cerrarDialogo}>
            <Dialog.Title style={styles.dialogText}>¿Estás seguro?</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={styles.dialogText}>¿Deseas cancelar esta reserva? Esta acción no se puede deshacer.</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button labelStyle={styles.dialogButtonText} onPress={cerrarDialogo}>No</Button>
              <Button labelStyle={styles.dialogButtonText} onPress={confirmarCancelacion}>Sí, cancelar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    color: Colors.light.text,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  nombre: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    marginBottom: 25,
  },
  sesion: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.light.tint,
  },
  tiempo: {
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  fecha: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    opacity: 0.5,
    marginBottom: 25,
  },
  direccion: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.light.text,
  },
  boton: {
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    flexDirection: 'row',
    gap: 15,
    marginTop: 12,
  },
  botonTexto: {
    color: Colors.light.background,
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    includeFontPadding: false,
  },
  botonCancelar: {
    marginTop: 40,
    backgroundColor: '#e63946',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 50,
    flexDirection: 'row',
    gap: 10,
  },
  botonCancelarTexto: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Fonts.regular,
    textAlign: 'center',
  },
  dialogo: {
    backgroundColor: Colors.light.accent,
  },
  dialogText: {
    color: Colors.light.text,
  },
  dialogButtonText: {
    color: Colors.light.tint,
  }  
});
