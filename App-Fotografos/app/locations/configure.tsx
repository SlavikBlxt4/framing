import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import Colors from "@/constants/Colors";
import { FontFamily as Fonts } from "@/constants/Fonts";
import api from "@/services/api";
import { router } from "expo-router";

export default function ConfigurarUbicacionesScreen() {
  const [direccion, setDireccion] = useState("");
  const [sugerencias, setSugerencias] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChangeDireccion = (value: string) => {
    setDireccion(value);

    if (value.length < 3) {
      setSugerencias([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const resp = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
            value
          )}`,
          {
            headers: {
              "User-Agent": "FramingApp/1.0 (tfg@ejemplo.com)",
              "Accept": "application/json",
            },
          }
        );
        const data = await resp.json();
        setSugerencias(data.map((item: any) => item.display_name));
      } catch (err) {
        console.error("Error buscando sugerencias:", err);
      }
    }, 500);
  };

  const traducirYEnviar = async () => {
    try {
      setLoading(true);

      const resp = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
          direccion
        )}`,
        {
          headers: {
            "User-Agent": "FramingApp/1.0 (tfg@ejemplo.com)",
            "Accept": "application/json",
          },
        }
      );
      const data = await resp.json();

      if (data.length === 0) {
        throw new Error(`No se encontró la dirección: ${direccion}`);
      }

      const coordenadas = [
        {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        },
      ];

      await api.post("/locations/create", coordenadas);
      Alert.alert("Éxito", "Ubicación guardada correctamente");
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Error al enviar ubicación:", error);
      Alert.alert("Error", error.message ?? "No se pudo guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>¿Dónde trabajas como fotógrafo?</Text>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Introduce tu dirección"
          value={direccion}
          onChangeText={handleChangeDireccion}
        />
        {sugerencias.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {sugerencias.map((sug, i) => (
              <Pressable
                key={i}
                onPress={() => {
                  setDireccion(sug);
                  setSugerencias([]);
                }}
              >
                <Text style={styles.suggestionText}>{sug}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <Pressable style={styles.saveButton} onPress={traducirYEnviar} disabled={loading}>
        <Text style={styles.saveButtonText}>
          {loading ? "Guardando..." : "Guardar ubicación"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    backgroundColor: Colors.light.background,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.light.accent,
    borderColor: Colors.light.tint,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    zIndex: 1,
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 5,
    marginTop: -10,
    marginBottom: 10,
    padding: 5,
    zIndex: 10,
    elevation: 3,
  },
  suggestionText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: Fonts.regular,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
});
