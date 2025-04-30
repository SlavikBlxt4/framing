// TarjetaReserva.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type SesionFotografo = {
  nombre: string;
  precio: number;
  duracion: string;
};

interface Props {
  sesion: SesionFotografo;
}

const TarjetaReserva: React.FC<Props> = ({ sesion }) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.nombre}>{sesion.nombre}</Text>
        <Text style={styles.detalle}>
          {sesion.duracion} · <Text style={styles.precio}>{sesion.precio}€</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.boton}>
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
