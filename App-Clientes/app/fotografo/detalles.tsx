import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
  ScrollView,
} from "react-native";
import {
  PaperPlaneTilt,
  Phone,
  EnvelopeSimple,
} from "phosphor-react-native";

import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Colors";
import { DetallesProps } from "@/types/Detalles.type";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function Detalles({ email, phone, direccion, availability }: DetallesProps) {
  const [expandido, setExpandido] = useState(false);

  const handleAbrirMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
    Linking.openURL(url);
  };

  const disponibilidadOrdenada = useMemo(() => {
    return diasSemana.map((nombreDia, index) => {
      const disponibilidadDelDia = availability.find((a) => a.day === index + 1);
      const slots = disponibilidadDelDia?.slots || [];
      return {
        day: nombreDia,
        hours: slots.map((slot) => ({
          start: slot.start.slice(0, 5),
          end: slot.end.slice(0, 5),
        })),
      };
    });
  }, [availability]);

  const diasVisibles = expandido ? disponibilidadOrdenada : [disponibilidadOrdenada[0]];

  return (
    <ScrollView style={styles.container}>
      {/* Dirección */}
      <View>
        <Text style={styles.title}>Dirección</Text>
        <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.nombre}>Ubicación</Text>
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

      {/* Contacto */}
      <View>
        <Text style={styles.title}>Contacto</Text>
        {phone && (
          <View style={styles.contactRow}>
            <Phone size={20} color={Colors.light.text} />
            <Text style={styles.contactText}>{phone}</Text>
          </View>
        )}
        {email && (
          <View style={styles.contactRow}>
            <EnvelopeSimple size={20} color={Colors.light.text} />
            <Text style={styles.contactText}>{email}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    textDecorationLine: "underline",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },
  contactText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 8,
  },
});
