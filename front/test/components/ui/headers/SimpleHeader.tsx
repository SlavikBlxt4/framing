// components/headers/SimpleHeader.tsx
import { View, StyleSheet } from 'react-native';

export default function SimpleHeader() {
  return <View style={styles.header} />;
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#f2f2f2',
  },
});
