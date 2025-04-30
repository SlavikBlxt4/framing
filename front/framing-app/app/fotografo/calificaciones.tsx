import React from "react";
import { View, StyleSheet } from "react-native";
import TarjetaCalificacion from "@/components/fm_cards/TarjetaCalificacion";
import { calificacionesMock } from "@/mocks/mockCalificaciones";

export default function Calificaciones() {
  return (
    <View style={styles.container}>
      {calificacionesMock.map((item, index) => (
        <TarjetaCalificacion
          key={index}
          nombre={item.nombre}
          fecha={item.fecha}
          comentario={item.comentario}
          puntuacion={item.puntuacion}
          avatarUrl={item.avatarUrl}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
