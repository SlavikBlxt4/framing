import React, { ReactNode, useRef } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import AnimatedHeader from '../fm_headers/AnimatedHeader';


const HEADER_MAX_HEIGHT = 70;

type Props = {
  children: ReactNode;
  title?: string;
};

export default function ScrollWithAnimatedHeader({ children, title = 'Título' }: Props) {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" />
      <AnimatedHeader scrollY={scrollY} title={title} />

      <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={styles.innerContent}>
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingTop: HEADER_MAX_HEIGHT,
    paddingBottom: 20,
  },
  innerContent: {
    paddingHorizontal: 20,
    gap: 20,
  },
});
