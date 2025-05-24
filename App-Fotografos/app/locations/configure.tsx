import React, { useState, useEffect, useRef } from "react";
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
  const [direcciones, setDirecciones] = useState<string[]>([""]);
  const [sugerencias, setSugerencias] = useState<string[][]>([[]]);
  const [loading, setLoading] = useState(false);

  // Debounce timeout refs por cada campo
  const debounceRefs = useRef<NodeJS.Timeout[]>([]);

  const handleAddDireccion = () => {
    if (direcciones.length >= 4) return;
    setDirecciones([...direcciones, ""]);
    setSugerencias([...sugerencias, []]);
    debounceRefs.current.push(undefined as unknown as NodeJS.Timeout);
  };

  const handleChangeDireccion = (value: string, index: number) => {
    const nuevas = [...direcciones];
    nuevas[index] = value;
    setDirecciones(nuevas);

    // Reiniciar sugerencias si hay poco texto
    if (value.length < 3) {
      const nuevasSugerencias = [...sugerencias];
      nuevasSugerencias[index] = [];
      setSugerencias(nuevasSugerencias);
      return;
    }

    // Debounce por campo
    if (debounceRefs.current[index]) {
      clearTimeout(debounceRefs.current[index]);
    }

    debounceRefs.current[index] = setTimeout(async () => {
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
        const nuevasSugerencias = [...sugerencias];
        nuevasSugerencias[index] = data.map((item: any) => item.display_name);
        setSugerencias(nuevasSugerencias);
      } catch (err) {
        console.error("Error buscando sugerencias:", err);
      }
    }, 500); // 500ms de espera tras dejar de escribir
  };

  const traducirYEnviar = async () => {
    try {
      setLoading(true);
      const coordenadas: { lat: number; lon: number }[] = [];

      for (const direccion of direcciones) {
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

        coordenadas.push({
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        });
      }

      await api.post("/locations/create", coordenadas);
      Alert.alert("Éxito", "Ubicaciones guardadas correctamente");
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Error al enviar ubicaciones:", error);
      Alert.alert("Error", error.message ?? "No se pudieron guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>¿Dónde trabajas como fotógrafo?</Text>

      {direcciones.map((dir, index) => (
        <View key={index}>
          <TextInput
            style={styles.input}
            placeholder={`Dirección ${index + 1}`}
            value={dir}
            onChangeText={(value) => handleChangeDireccion(value, index)}
          />
          {sugerencias[index]?.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {sugerencias[index].map((sug, i) => (
                <Pressable
                  key={i}
                  onPress={() => {
                    const nuevas = [...direcciones];
                    nuevas[index] = sug;
                    setDirecciones(nuevas);

                    const nuevasSugerencias = [...sugerencias];
                    nuevasSugerencias[index] = [];
                    setSugerencias(nuevasSugerencias);
                  }}
                >
                  <Text style={styles.suggestionText}>{sug}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      ))}

      {direcciones.length < 4 && (
        <Pressable style={styles.addButton} onPress={handleAddDireccion}>
          <Text style={styles.addButtonText}>+ Añadir otra dirección</Text>
        </Pressable>
      )}

      <Pressable style={styles.saveButton} onPress={traducirYEnviar} disabled={loading}>
        <Text style={styles.saveButtonText}>
          {loading ? "Guardando..." : "Guardar ubicaciones"}
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
  addButton: {
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: Colors.light.tint,
    fontFamily: Fonts.semiBold,
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
