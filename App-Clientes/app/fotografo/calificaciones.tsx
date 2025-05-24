import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import TarjetaCalificacion from "@/components/fm_cards/TarjetaCalificacion";
import api from "@/services/api";
import { useUser } from "@/context/UserContext";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";

interface Calificacion {
  nombre: string;
  fecha: string;
  comentario: string;
  puntuacion: number;
  avatarUrl: string;
}

export default function Calificaciones() {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        if (user?.id) {
          const resp = await api.get<Calificacion[]>(`/ratings/photographer/${user.id}`);
          setCalificaciones(resp.data);
        }
      } catch (err) {
        console.error("Error al obtener calificaciones:", err);
        setError("No se pudieron cargar las calificaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.fullScreenCenter}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.fullScreenCenter}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (calificaciones.length === 0) {
    return (
      <View style={styles.fullScreenCenter}>
        <Text style={styles.emptyText}>Este fotógrafo aún no ha sido calificado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {calificaciones.map((item, index) => (
        <TarjetaCalificacion
          key={index}
          nombre={item.nombre}
          fecha={item.fecha}
          comentario={item.comentario}
          puntuacion={item.puntuacion}
          avatarUrl={item.avatarUrl}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  fullScreenCenter: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  errorText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
