// components/CustomText.tsx
import { Text, TextProps } from "react-native";
import { fontConfig } from "@/constants/Theme";

export default function CustomText(props: TextProps) {
  return (
    <Text {...props} style={[{ fontFamily: fontConfig.regular }, props.style]}>
      {props.children}
    </Text>
  );
}
