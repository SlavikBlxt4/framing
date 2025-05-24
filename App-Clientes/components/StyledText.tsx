import { Text, TextProps } from 'react-native';

interface StyledTextProps extends TextProps {
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

const FontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
}; 

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


