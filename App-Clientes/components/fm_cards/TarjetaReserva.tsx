// React y React Native
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Navegación (expo-router)
import { router } from 'expo-router';

// Interfaces
import { SesionesProps } from '@/types/Sesiones.type';

interface Props {
  sesion: SesionesProps;
}


// Componente que muestra una tarjeta con información de una sesión fotográfica y permite reservarla
const TarjetaReserva: React.FC<Props> = ({ sesion }) => {
  // Función que navega a la pantalla de confirmación de reserva
  const handleReservar = () => {
    router.push({
      pathname: '/fotografo/confirmarReserva',
      params: {
        nombre: sesion.nombre,
        precio: sesion.precio.toString(),
        fotografoId: sesion.photographerId.toString(),
        duracion: sesion.duracion.toString(),
        fotografoNombre: sesion.fotografoNombre,
        serviceId: sesion.id.toString(),
      },
    });
  };

  const formatDuration = (minutes: number): string => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0 && mins > 0) return `${hrs}h ${mins}min`;
    if (hrs > 0) return `${hrs}h`;
    return `${mins}min`;
  };

  

  return (
    // Contenido principal de la tarjeta
    <View style={styles.card}>
      <View>
        <Text style={styles.nombre}>{sesion.nombre}</Text>
        <Text style={styles.detalle}>
          {formatDuration(sesion.duracion)} · <Text style={styles.precio}>{sesion.precio}€</Text>
        </Text>
      </View>

      {/* Boton para hacer la reserva */}
      <TouchableOpacity style={styles.boton} onPress={handleReservar}>
        <Text style={styles.botonTexto}>Reservar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#2a9d8f',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f0fefe',
    marginBottom: 12,
  },
  nombre: {
    fontWeight: 'bold',
    color: '#2a9d8f',
    fontSize: 16,
  },
  detalle: {
    fontSize: 14,
    marginTop: 4,
  },
  precio: {
    fontWeight: 'bold',
  },
  boton: {
    backgroundColor: '#2a9d8f',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TarjetaReserva;
