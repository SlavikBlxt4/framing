import { Text, TextProps } from 'react-native';
import { FontFamily } from '@/constants/Fonts';

interface StyledTextProps extends TextProps {
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

export function StyledText({ style, weight = 'regular', ...props }: StyledTextProps) {
  return (
    <Text
      style={[
        {
          fontFamily: FontFamily[weight],
        },
        style,
      ]}
      {...props}
    />
  );
}
