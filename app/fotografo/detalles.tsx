// React y React Native
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, Linking } from "react-native";

// Íconos (Phosphor)
import { PaperPlaneTilt, Phone, EnvelopeSimple } from "phosphor-react-native";

// Constantes del proyecto
import Fonts from "@/constants/Fonts";
import Colors from "@/constants/Colors";

// Datos simulados
import { horariosSemana } from "@/mocks/mockHorario";

// Interfaces
import { DetallesProps } from "@/types/Detalles.type";

// Componente que muestra inforamción detallada: dirección, horario y contacto
export default function Detalles({ nombre = "Nombre", direccion }: DetallesProps) {
  // Estado para controlar si se muestra el horario completo o solo el primer día 
  const [expandido, setExpandido] = useState(false);
  
  // Función que abre Google Maps con la dirección proporcionada
  const handleAbrirMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
    Linking.openURL(url); // Abre la URL en el navegador o en la app de Maps
  };
  
  // Dependiendo del estado, muestra todos los días o solo el primero
  const diasVisibles = expandido ? horariosSemana : [horariosSemana[0]];
  
  return (
    <View style={styles.container}>
      {/* Sección Dirección */}
      <View>
        <Text style={styles.title}>Dirección</Text>

        <View style={styles.card}>
          {/* Información textual */}
          <View style={styles.info}>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.direccion}>{direccion}</Text>
          </View>

          {/* Botón con ícono que abre la dirección en maps */}
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
              {/* Dia de la semana */}
              <Text style={styles.diaTexto}>{dia.day}</Text>

              {/* Horas de apertura / cierre */}
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

        {/* Botón para expandir o colapsar el horario */}
        <Pressable onPress={() => setExpandido(!expandido)}>
          <Text style={styles.expandirTexto}>
            {expandido ? "Colapsar horario" : "Expandir horario"}
          </Text>
        </Pressable>
      </View>

      {/* Sección: Contacto */}
      <View>
          <Text style={styles.title}>Contacto</Text>
          
          {/* Teléfono */}
          <View style={styles.contactRow}>
              <Phone size={20} color={Colors.light.text} />
              <Text style={styles.contactText}>123 456 789</Text>
          </View>

          {/* Correo */}
          <View style={styles.contactRow}>
              <EnvelopeSimple size={20} color={Colors.light.text} />
              <Text style={styles.contactText}>correo@gmail.com</Text>
          </View>
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
    // paddingHorizontal: ,
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
    // marginLeft: 25,
    textDecorationLine: "underline",
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  contactText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 8,
  },  
});
