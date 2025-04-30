import React, { useEffect, useRef, useState } from 'react';
import {Animated, Dimensions, Pressable, StyleSheet, Text, View, } from 'react-native';
import { Button, Portal } from 'react-native-paper';
import { X } from 'phosphor-react-native';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { useUser } from '@/context/UserContext';

const SCREEN_HEIGHT = Dimensions.get('window').height;

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function PremiumDrawer({ visible, onClose }: Props) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isMounted, setIsMounted] = useState(false);
  const { setPremiumUser } = useUser();

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false, // 🔧 Aquí el cambio
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: false, // 🔧 Aquí también
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
        setIsMounted(false); // solo desmonta después de la animación
      });
    }
  }, [visible]);

  if (!isMounted) return null;

  return (
    <Portal>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.bottomDrawer, { transform: [{ translateY }] }]}>
        <View style={styles.drawerContent}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <X size={20} weight="regular" />
          </Pressable>

          <View style={styles.innerContent}>
            <Text style={styles.title}>Descubre nuestro servicio premium</Text>
            <Text style={styles.description}>
              Con nuestro servicio premium obtendrás varios beneficios:
            </Text>

            <View style={styles.benefits}>
              <Text style={styles.benefit}>• Experiencia sin anuncios</Text>
              <Text style={styles.benefit}>• Códigos de descuento</Text>
            </View>

            <Button
              mode="contained"
              style={styles.botonSub}
              labelStyle={styles.botonSubLabel}
              onPress={() => {setPremiumUser(true); onClose();}}
            >
              Quiero Suscribirme
            </Button>
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
      backgroundColor: Colors.light.accent,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      borderWidth: 2,
      borderColor: Colors.light.tint,
      elevation: 20,
      zIndex: 9999,
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 30,
    },
    drawerContent: {
      flex: 1,
    },
    closeButton: {},
    innerContent: {
      padding: 10,
    },
    title: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: Colors.light.tint,
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      marginBottom: 10,
      color: Colors.light.text,
      fontFamily: Fonts.semiBold,
    },
    benefits: {
      marginBottom: 20,
    },
    benefit: {
      fontSize: 16,
      color: Colors.light.text,
      fontFamily: Fonts.regular,
    },
    botonSub: {
        backgroundColor: Colors.light.tint,
        borderRadius: 100,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    botonSubLabel: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        color: Colors.light.accent,
    },      
  });
