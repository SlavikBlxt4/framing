import React from 'react';
import {
  Calendar,
  Camera,
  Tray,
  Storefront,
} from 'phosphor-react-native';
import { ViewStyle } from 'react-native';

type Props = {
  name: 'index' | 'sesiones' | 'notificaciones' | 'profile';
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
    style: { color, fill: color, ...style },
  };

  switch (name) {
    case 'index':
      return <Calendar {...commonProps} />;
    case 'sesiones':
      return <Camera {...commonProps} />;
    case 'notificaciones':
      return <Tray {...commonProps} />;
    case 'profile':
      return <Storefront {...commonProps} />;
    default:
      return null;
  }
} 