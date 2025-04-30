import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, Linking } from "react-native";
import { PaperPlaneTilt } from "phosphor-react-native";
import Fonts from "@/constants/Fonts";
import { Colors } from "@/constants/Colors";
import { horariosSemana } from "@/mocks/mockHorario";

type Props = {
  nombre?: string;
  direccion: string;
};

export default function Detalles({ nombre = "Nombre", direccion }: Props) {
    const [expandido, setExpandido] = useState(false);
  
    const handleAbrirMaps = () => {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
      Linking.openURL(url);
    };
  
    const diasVisibles = expandido ? horariosSemana : [horariosSemana[0]];
  
    return (
      <View style={styles.container}>
        {/* Dirección */}
        <View>
          <Text style={styles.title}>Dirección</Text>
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.nombre}>{nombre}</Text>
              <Text style={styles.direccion}>{direccion}</Text>
            </View>
            <Pressable onPress={handleAbrirMaps}>
              <PaperPlaneTilt size={24} color={Colors.light.tint} weight="duotone" />
            </Pressable>
          </View>
        </View>
  
        {/* Horario */}
        <View>
          <Text style={styles.title}>Horario</Text>
          <View style={styles.horarioContainer}>
            {diasVisibles.map((dia, index) => (
              <View key={index} style={styles.horarioRow}>
                <Text style={styles.diaTexto}>{dia.day}</Text>
                <View style={styles.horariosColumn}>
                  {dia.hours.length === 0 ? (
                    <Text style={styles.horaTexto}>Cerrado</Text>
                  ) : (
                    dia.hours.map((hora, i) => (
                      <Text key={i} style={styles.horaTexto}>
                        {hora.start} - {hora.end}
                      </Text>
                    ))
                  )}
                </View>
              </View>
            ))}
          </View>
          <Pressable onPress={() => setExpandido(!expandido)}>
            <Text style={styles.expandirTexto}>
              {expandido ? "Colapsar horario" : "Expandir horario"}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    paddingHorizontal: 25,
  },
  card: {
    backgroundColor: Colors.light.accent,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.light.tint,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginBottom: 2,
    color: Colors.light.tint,
  },
  direccion: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.light.tint,
  },
  horarioContainer: {
    paddingHorizontal: 25,
    gap: 12,
  },
  horarioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  diaTexto: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
    width: 100,
  },
  horariosColumn: {
    flex: 1,
    alignItems: "flex-end",
  },
  horaTexto: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
  },  
  expandirTexto: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.light.tint,
    marginTop: 8,
    marginLeft: 25,
    textDecorationLine: "underline",
  },
});
