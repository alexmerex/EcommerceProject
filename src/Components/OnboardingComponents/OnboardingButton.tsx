import React from "react";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnBoardingButtonParams } from "../../TypesCheck/OnboardingTypesCheck";
import { RootStackParams } from "../../Navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const OnBoardingButton = ({
  flatListIndex,
  flatListRef,
  itemLength,
  x,
}: OnBoardingButtonParams) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const buttonAnimation = useAnimatedStyle(() => ({
    width: flatListIndex.value === itemLength - 1 ? withSpring(160) : withSpring(70),
    height: 70,
    borderRadius: 35,
  }));

  const arrowAnimation = useAnimatedStyle(() => ({
    opacity: flatListIndex.value === itemLength - 1 ? withTiming(0) : withTiming(1),
    transform: [{ translateX: flatListIndex.value === itemLength - 1 ? withTiming(80) : withTiming(0) }],
  }));

  const textAnimation = useAnimatedStyle(() => ({
    opacity: flatListIndex.value === itemLength - 1 ? withDelay(150, withTiming(1)) : withTiming(0),
    transform: [{ translateX: flatListIndex.value === itemLength - 1 ? withTiming(0) : withTiming(50, { easing: Easing.out(Easing.exp) }) }],
  }));

  const colorAnimation = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["#ff7eb3", "#7a52ff", "#3d348b"]
    ),
  }));

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < itemLength - 1) {
          flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
        } else {
          navigation.replace("TabsStack");
        }
      }}
    >
      <Animated.View style={[styles.container, buttonAnimation, colorAnimation]}>
        <LinearGradient
          colors={["#ff7eb3", "#7a52ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
        <Animated.Text style={[styles.textButton, textAnimation]}>
          Get Started
        </Animated.Text>
        <Animated.View style={[styles.iconWrapper, arrowAnimation]}>
          <Ionicons name="arrow-forward" size={30} color="#fff" />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default OnBoardingButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
  },
  textButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
  },
  iconWrapper: {
    position: "absolute",
  },
});
