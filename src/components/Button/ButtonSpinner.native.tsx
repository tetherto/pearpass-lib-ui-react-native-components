import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const nativeStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'currentColor',
    borderTopColor: 'transparent',
  },
});

export const ButtonSpinner = (): React.ReactElement => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 600, easing: Easing.linear }),
      -1,
      false,
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={nativeStyles.container} pointerEvents="none">
      <Animated.View style={[nativeStyles.spinner, animatedStyle]} />
    </View>
  );
};
