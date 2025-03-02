import { View, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import { OnBoardingDotParams } from "../../TypesCheck/OnboardingTypesCheck";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const OnboardingDots = ({ index, x }: OnBoardingDotParams) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = withSpring(
      interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [10, 35, 10],
        Extrapolation.CLAMP
      )
    );

    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  const colorAnimation = useAnimatedStyle(() => {
    const background = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["#8a14d4", "#39d4ba", "#F14546"]
    );

    return {
      backgroundColor: background,
    };
  });

  return <Animated.View style={[styles.dots, animatedDotStyle, colorAnimation]} />;
};

export default OnboardingDots;

const styles = StyleSheet.create({
  dots: {
    height: 12,
    borderRadius: 99,
    marginHorizontal: 8,
    backgroundColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
