// React y React Native
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// Componentes propios
import TarjetaCalificacion from "@/components/fm_cards/TarjetaCalificacion";

// Datos simulados
import { calificacionesMock } from "@/mocks/mockCalificaciones";

// Componente que renderiza una lista de tarjetas de calificaciones usando datos 
export default function Calificaciones() {
  return (
    // Contenedor principal de la vista
    <ScrollView style={styles.container}>

      {/* Mapeo de arreglo de calificaciones simuladas para renderizar una tarjeta por cada una */}
      {calificacionesMock.map((item, index) => (
        <TarjetaCalificacion
          key={index} // Se usa el índice como clave (idealmente usar ID único si existiera)
          nombre={item.nombre} // Nombre del usuario que calificó
          fecha={item.fecha} // Fecha de la calificación
          comentario={item.comentario} // Comentario dejado por el usuario
          puntuacion={item.puntuacion} // Valor númerico de la puntuación
          avatarUrl={item.avatarUrl} // Imagen de perfil del usuario
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
