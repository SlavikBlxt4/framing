import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

import { getBookingHistory } from '@/services/bookingsService';
import { BookingHistoryDto } from '@/types/bookings';

export default function TarjetaSesiones() {
  const [proxima, setProxima] = useState<null | BookingHistoryDto>(null);

  useEffect(() => {
    const hoy = new Date();
    getBookingHistory().then((reservas) => {
      const activasFuturas = reservas
        .filter(r => r.status === 'active')
        .filter(r => new Date(r.date) >= hoy)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setProxima(activasFuturas[0] || null);
    });
  }, []);

  const fechaFormateada = proxima
    ? format(new Date(proxima.date), "d 'de' MMMM 'de' yyyy", { locale: es })
    : 'Sin próximas sesiones';

  return (
    <ImageBackground
      source={require('@/assets/images/placeholder_estudio.jpg')}
      style={styles.container}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />

      <View style={styles.textoSuperior}>
        <Text style={styles.regularText}>Estudio:</Text>
        <Text style={styles.boldText}>{proxima?.serviceName || '[Estudio fotográfico]'}</Text>
      </View>

      <View style={styles.textoInferior}>
        <Text style={styles.regularText}>Próxima sesión:</Text>
        <Text style={styles.boldText}>{fechaFormateada}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: 'gray',
    borderRadius: 15,
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: Colors.light.tint,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(21, 99, 97, 0.5)',
    borderRadius: 15,
  },
  boldText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.light.background,
  },
  regularText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.light.background,
  },
  textoSuperior: {
    padding: 20,
  },
  textoInferior: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
