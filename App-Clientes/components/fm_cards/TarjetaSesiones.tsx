import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import api from '@/services/api';

type ProximaSesion = {
  photographerName: string;
  date: string;
};

export default function TarjetaSesiones() {
  const [proxima, setProxima] = useState<ProximaSesion | null>(null);

  useEffect(() => {
    const fetchProximaSesion = async () => {
      try {
        const resp = await api.get<ProximaSesion | { message: string }>('/bookings/next-active');

        if ('photographerName' in resp.data) {
          setProxima(resp.data);
        } else {
          setProxima(null); // No hay sesión próxima
        }
      } catch (error) {
        console.error("Error al cargar próxima sesión:", error);
        setProxima(null);
      }
    };

    fetchProximaSesion();
  }, []);

  const fechaFormateada = proxima
    ? format(new Date(proxima.date), "d 'de' MMMM 'de' yyyy", { locale: es })
    : "Sin próximas sesiones";

  return (
    <ImageBackground
      source={require('@/assets/images/placeholder_estudio.jpg')}
      style={styles.container}
      imageStyle={styles.image}
    >
      <View style={styles.overlay} />

      <View style={styles.textoSuperior}>
        <Text style={styles.regularText}>Próxima sesión:</Text>
        <Text style={styles.boldText}>{fechaFormateada}</Text>
      </View>

      {proxima && (
        <View style={styles.textoInferior}>
          <Text style={styles.regularText}>Estudio:</Text>
          <Text style={styles.boldText}>{proxima.photographerName}</Text>
        </View>
      )}
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
