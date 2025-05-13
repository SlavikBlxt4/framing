import React from 'react';
import {
  House,
  Camera,
  Calendar,
  Storefront,
} from 'phosphor-react-native';
import { ViewStyle } from 'react-native';

type Props = {
  name: 'index' | 'sesiones' | 'calendario' | 'profile';
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
      return <House {...commonProps} />;
    case 'sesiones':
      return <Camera {...commonProps} />;
    case 'calendario':
      return <Calendar {...commonProps} />;
    case 'profile':
      return <Storefront {...commonProps} />;
    default:
      return null;
  }
} 