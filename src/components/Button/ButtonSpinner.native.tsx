import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface ButtonSpinnerProps {
  color?: string;
}

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
    borderTopColor: 'transparent',
  },
});

export const ButtonSpinner = ({ color = '#FFFFFF' }: ButtonSpinnerProps): React.ReactElement => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withTiming(360 * 1000, {
      duration: 600 * 1000,
      easing: Easing.linear,
    });
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={nativeStyles.container} pointerEvents="none">
      <Animated.View style={[nativeStyles.spinner, { borderColor: color }, animatedStyle]} />
    </View>
  );
};
