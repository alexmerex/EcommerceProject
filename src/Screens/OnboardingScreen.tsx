import { View, Text, ViewToken } from "react-native";
import React, { useState } from "react";
import { RootStackScreenProps } from "../Navigation/RootNavigator";
import { OnBoardingPrograms } from "../TypesCheck/OnboardingTypesCheck";
import { OnBoardingData } from "../Data/EcommerceAppData";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import OnBoardingItems from "../Components/OnboardingComponents/OnboardingItems";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import OnBoardingPagination from "../Components/OnboardingComponents/OnBoardingPagination";
import OnBoardingButton from "./../Components/OnboardingComponents/OnboardingButton";
type Props = {};

const OnBoardingScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"OnBoardingScreen">) => {
  const [onBoardingItems, setOnBoardingItems] =
    useState<OnBoardingPrograms[]>(OnBoardingData);
  const flatListRef = useAnimatedRef<FlatList<OnBoardingPrograms>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScrollHandler}
        data={onBoardingItems}
        renderItem={({ item, index }) => (
          <OnBoardingItems item={item} index={index} x={x} />
        )}
        keyExtractor={(item) => item._id}
        scrollEventThrottle={17}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 30,
          paddingVertical: 30,
        }}
      >
        <OnBoardingPagination item={onBoardingItems} x={x} />
        <OnBoardingButton
          x={x}
          itemLength={OnBoardingItems.length}
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
        />
      </View>
    </View>
  );
};

export default OnBoardingScreen;
