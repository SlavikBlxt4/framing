// React y React Native
import React, { useEffect, useRef, useState } from 'react';
import {Animated, Dimensions, Pressable, StyleSheet, Text, View, Switch } from 'react-native';

// UI (react-native-paper)
import { Portal } from 'react-native-paper';

// Íconos
import { Calendar, SortAscending, SortDescending, Check, } from 'phosphor-react-native';

// Constantes
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';


const SCREEN_HEIGHT = Dimensions.get('window').height; // Obtiene la altura total de la pantalla

// Tipos de opciones de ordenamiento
type SortOption = 'fecha-asc' | 'fecha-desc' | 'nombre-asc' | 'nombre-desc';

// Props que acepta el componente
type Props = {
  visible: boolean;                      // Controla visibilidad del drawer
  onClose: () => void;                   // Función para cerrar el drawer
  onSortChange: (option: SortOption) => void; // Callback para cambiar el orden seleccionado
  selectedSort: SortOption;             // Orden actual seleccionado
  showPastSessions: boolean;            // Estado del switch "mostrar sesiones pasadas"
  onTogglePastSessions: (value: boolean) => void; // Callback para cambiar estado del switch
};

export default function FilterDrawer({ visible, onClose, onSortChange, selectedSort, showPastSessions, onTogglePastSessions, }: Props) {
  // Estado animado para la transición vertical y opacidad del fondo
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Controla el montaje del componente animado
  const [isMounted, setIsMounted] = useState(false);

  // useEffect para manejar la animación cuando cambia a "visible"
  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsMounted(false);
      });
    }
  }, [visible]);

  // Si el drawer no ha sido montado, no se renderiza nada
  if (!isMounted) return null;

  // Opciones de ordenamiento
  const options = [
    {
      value: 'fecha-asc',
      label: 'Fecha (más próximo)',
      icon: <Calendar size={18} color={Colors.light.tint} weight="regular" />,
    },
    {
      value: 'fecha-desc',
      label: 'Fecha (más lejano)',
      icon: <Calendar size={18} color={Colors.light.tint} weight="fill" />,
    },
    {
      value: 'nombre-asc',
      label: 'Nombre (A-Z)',
      icon: <SortAscending size={18} color={Colors.light.tint} weight="regular" />,
    },
    {
      value: 'nombre-desc',
      label: 'Nombre (Z-A)',
      icon: <SortDescending size={18} color={Colors.light.tint} weight="regular" />,
    },
  ];

  return (
    <Portal>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.bottomDrawer, { transform: [{ translateY }] }]}>
        <View style={styles.drawerContent}>
          <Text style={styles.title}>Ordenar Reservas</Text>

          <View style={styles.innerContent}>
            {options.map((option) => {
              const isSelected = selectedSort === option.value;

              return (
                <Pressable
                  key={option.value}
                  style={[
                    styles.option,
                    isSelected && styles.optionSelected,
                  ]}
                  onPress={() => onSortChange(option.value as SortOption)}
                >
                  <View style={styles.optionContent}>
                    <View style={styles.iconText}>
                      {option.icon}
                      <Text
                        style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </View>
                    {isSelected && <Check size={18} color={Colors.light.tint} weight="bold" />}
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Mostrar sesiones pasadas</Text>
            <Switch
              value={showPastSessions}
              onValueChange={onTogglePastSessions}
              thumbColor={showPastSessions ? Colors.light.tint : '#ccc'}
              trackColor={{ false: '#ccc', true: Colors.light.accent }}
            />
          </View>
        </View>
      </Animated.View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 9998,
  },
  bottomDrawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 20,
    zIndex: 9999,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  drawerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.light.tint,
    marginBottom: 20,
  },
  innerContent: {
    gap: 12,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  optionSelected: {
    backgroundColor: Colors.light.accent,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Si no funciona en tu versión, reemplaza por marginLeft en el texto
  },
  optionText: {
    fontSize: 16,
    color: Colors.light.text,
    fontFamily: Fonts.regular,
  },
  optionTextSelected: {
    color: Colors.light.tint,
    fontFamily: Fonts.bold,
  },
  toggleContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.light.text,
  },  
});
