import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StyledText } from './StyledText';
import Colors from '@/constants/Colors';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.getStartedContainer}>
        <StyledText style={styles.getStartedText}>
          Abre el código de esta pantalla:
        </StyledText>

        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <StyledText weight="medium">{path}</StyledText>
        </View>

        <StyledText style={styles.getStartedText}>
          Cambia cualquier texto, guarda el archivo y tu aplicación se actualizará automáticamente.
        </StyledText>
      </View>

      <View style={styles.helpContainer}>
        <StyledText style={styles.helpLinkText}>
          Toca aquí si tu aplicación no se actualiza automáticamente después de hacer cambios
        </StyledText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
    backgroundColor: Colors.light.accent,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.light.text,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLinkText: {
    textAlign: 'center',
    color: Colors.light.tint,
  },
});
