import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts'; // <-- Importante
import UserProfilePicture from '@/components/ui/UserPfp';
import HomeWelcome from '@/components/sections/HomeWelcome';
import SearchBar from '@/components/utils/BarraDeBusqueda';

export default function HomeScreen() {
  const colors = Colors.light;

  return (
    <View style={styles.container}>
      <HomeWelcome username=""/>
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: 14,
  },
});
