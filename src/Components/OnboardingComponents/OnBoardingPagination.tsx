import { View, StyleSheet } from "react-native";
import React from "react";
import { OnBoardingPrograms } from "../../TypesCheck/OnboardingTypesCheck";
import OnBoardingDots from "./OnBoardingDots";

type OnBoardingPaginationParams = {
  data: OnBoardingPrograms[]; // ✅ Changed from `item` to `data`
  x: any;
};

const OnBoardingPagination: React.FC<OnBoardingPaginationParams> = ({ data, x }) => {
  return (
    <View style={sty.paginationContainer}>
      {data.map((_, index) => (
        <OnBoardingDots index={index} x={x} key={index} />
      ))}
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
