import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { OnBoardingItemsObj } from "../../TypesCheck/OnboardingTypesCheck";
import LottieView from "lottie-react-native";

const OnBoardingItems = ({ item, index, x }: OnBoardingItemsObj) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const circleAnimation = useAnimatedStyle(() => {
    const scale = withSpring(
      interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [1, 3.5, 1],
        Extrapolation.CLAMP
      ),
      { damping: 10, stiffness: 100 }
    );

    return {
      transform: [{ scale }],
    };
  });

  const lottieAnimation = useAnimatedStyle(() => {
    const translateY = withSpring(
      interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [80, 0, -80],
        Extrapolation.CLAMP
      ),
      { damping: 10, stiffness: 80 }
    );

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View style={[styles.container, { width: SCREEN_WIDTH }]}>
      {/* Vòng tròn động */}
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.circle,
            {
              backgroundColor: item.backgroundColor,
              width: SCREEN_WIDTH * 1.2,
              height: SCREEN_WIDTH * 1.2,
              borderRadius: SCREEN_WIDTH * 0.6,
            },
            circleAnimation,
          ]}
        />
      </View>

      {/* Hình ảnh động */}
      <Animated.View style={[lottieAnimation]}>
        <LottieView
          source={item.imageUrl}
          style={{
            width: SCREEN_WIDTH * 0.85,
            height: SCREEN_WIDTH * 0.85,
          }}
          autoPlay
        />
      </Animated.View>

      {/* Tiêu đề */}
      <Text style={[styles.text, { color: item.textColor }]}>{item.text}</Text>
    </View>
  );
};

export default OnBoardingItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    position: "absolute",
    opacity: 0.8,
  },
  text: {
    fontSize: 38,
    fontWeight: "700",
    textAlign: "center",
    marginHorizontal: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
