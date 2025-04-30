// components/framing/FilterDrawerExplorar.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Portal } from 'react-native-paper';
import { SortAscending, SortDescending, Check } from 'phosphor-react-native';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';

const SCREEN_HEIGHT = Dimensions.get('window').height;

type SortOption = 'nombre-asc' | 'nombre-desc';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSortChange: (option: SortOption) => void;
  selectedSort: SortOption;
};

export default function FilterDrawerExplorar({
  visible,
  onClose,
  onSortChange,
  selectedSort,
}: Props) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isMounted, setIsMounted] = useState(false);

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

  if (!isMounted) return null;

  const options = [
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
          <Text style={styles.title}>Ordenar Fotógrafos</Text>
          <View style={styles.innerContent}>
            {options.map((option) => {
              const isSelected = selectedSort === option.value;

              return (
                <Pressable
                  key={option.value}
                  style={[styles.option, isSelected && styles.optionSelected]}
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
                    {isSelected && (
                      <Check size={18} color={Colors.light.tint} weight="bold" />
                    )}
                  </View>
                </Pressable>
              );
            })}
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
    gap: 10,
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
});
