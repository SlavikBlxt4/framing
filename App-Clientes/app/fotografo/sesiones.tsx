// React - React Native
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

// Componentes
import TarjetaReserva from '@/components/fm_cards/TarjetaReserva';
import { Service } from '@/types/photographer';

// Datos simulados
import { sesionesFotografos } from '@/mocks/mockSesionesFotografo'; 

interface Props {
  services: Service[];
  photographerId: number;
  photographerName: string;
}

// Componente que muestra una lista de sesiones ofrecidas por un fotógrafo
export default function Sesiones({ services, photographerId, photographerName }: Props) {
  return (
    // Contenedor principal
    <ScrollView style={styles.container}>
      {/* Mapea el arreglo de sesiones y renderiza una tarjeta por cada una */}
      {services.map((service) => (
        <TarjetaReserva
          key={service.id}
          sesion={{
            id: service.id.toString(),
            nombre: service.name,
            descripcion: service.description,
            precio: service.price,
            duracion: service.minimum_minutes,
            descuento: parseFloat(service.discount),
            imagenUrl: service.imageUrl,
            categoria: service.category.name,
            photographerId: photographerId,
            fotografoNombre: photographerName,
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
