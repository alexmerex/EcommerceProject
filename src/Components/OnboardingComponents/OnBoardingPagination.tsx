import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { OnBoardingPaginationParams } from "../../TypesCheck/OnboardingTypesCheck";
import OnBoardingDots from "./OnBoardingDots";

type Props = {};

const OnBoardingPagination = ({ item, x }: OnBoardingPaginationParams) => {
  return (
    <View style={sty.paginationContainer}>
      {item.map((_, index) => {
        return <OnBoardingDots index={index} x={x} key={index} />;
      })}
    </View>
  );
};

export default OnBoardingPagination;

const sty = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
});
