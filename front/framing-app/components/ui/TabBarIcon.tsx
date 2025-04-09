/**
 * Iconos que aparecerán en la barra de navegación
 */

import React from 'react';
import {
  House,
  Compass,
  Tray,
  User,
} from 'phosphor-react-native';
import { ViewStyle } from 'react-native';

type Props = {
  name: 'index' | 'explore' | 'inbox' | 'profile';
  color: string;
  size?: number;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  style?: ViewStyle;
};

export default function TabBarIcon({
    name,
    color,
    size = 24,
    weight = 'regular',
    style = {},
  }: Props) {
    const commonProps = {
      size,
      weight,
      color,
      style: [{ color, fill: color }, style],
    };
  
    switch (name) {
      // Ignorar errores
      case 'index':
        return <House {...commonProps} />;
      case 'explore':
        return <Compass {...commonProps} />;
      case 'inbox':
        return <Tray {...commonProps} />;
      case 'profile':
        return <User {...commonProps} />;
      default:
        return null;
    }
  }
  