import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { OnBoardingItemsObj } from "../../TypesCheck/OnBoardingTypesCheck";
import LottieView from "lottie-react-native";

type Props = {};
const OnBoardingItems = ({ item, index, x }: OnBoardingItemsObj) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale: scale }],
    };
  });
  const lottieAnimation = useAnimatedStyle(() => {
    const translatey = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [45, 0, -100],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: translatey }],
    };
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 370,
        width: SCREEN_WIDTH,
      }}
    >
      <View style={sty.circularContainer}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              backgroundColor: item.backgroundColor,
              borderRadius: SCREEN_WIDTH / 2,
            },
          ]}
        />
      </View>
      <Animated.View style={[lottieAnimation]}>
        <LottieView
          source={item.imageUrl}
          style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9 }}
          autoPlay
        />
      </Animated.View>
      <Text
        style={{
          color: item.textColor,
          fontSize: 40,
          fontWeight: "bold",
          textAlign: "center",
          marginHorizontal: 20,
          marginBottom: 10,
        }}
      >
        {item.text}
      </Text>
    </View>
  );
};

export default OnBoardingItems;
const sty = StyleSheet.create({
  circularContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
