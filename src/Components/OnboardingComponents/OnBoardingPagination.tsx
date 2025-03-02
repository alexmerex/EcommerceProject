import { View, StyleSheet } from "react-native";
import React from "react";
import { OnBoardingPrograms } from "../../TypesCheck/OnboardingTypesCheck";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

type OnBoardingPaginationParams = {
  data: OnBoardingPrograms[];
  x: Animated.SharedValue<number>;
};

const OnBoardingPagination: React.FC<OnBoardingPaginationParams> = ({ data, x }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        return <PaginationDot key={index} index={index} x={x} />;
      })}
    </View>
  );
};

const PaginationDot = ({ index, x }: { index: number; x: Animated.SharedValue<number> }) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [(index - 1) * 375, index * 375, (index + 1) * 375],
      [0.6, 1.2, 0.6]
    );

    const opacity = interpolate(
      x.value,
      [(index - 1) * 375, index * 375, (index + 1) * 375],
      [0.4, 1, 0.4]
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return <Animated.View style={[styles.dot, animatedDotStyle]} />;
};

export default OnBoardingPagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3478F6",
    marginHorizontal: 6,
  },
});
