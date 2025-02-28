import React, { useState, useCallback, useRef } from "react";
import { View, SafeAreaView, ViewToken } from "react-native";
import { RootStackScreenProps } from "../Navigation/RootNavigator";
import { OnBoardingPrograms } from "../TypesCheck/OnboardingTypesCheck";
import { OnBoardingData } from "../Data/EcommerceAppData";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedRef,
} from "react-native-reanimated";

import OnBoardingItems from "../Components/OnboardingComponents/OnboardingItems";
import OnBoardingPagination from "../Components/OnboardingComponents/OnBoardingPagination";
import OnboardingButton from "../Components/OnboardingComponents/OnboardingButton";

const OnBoardingScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"OnBoardingScreen">) => {
  const [onBoardingItems] = useState<OnBoardingPrograms[]>(OnBoardingData);

  // ✅ Use useAnimatedRef with Animated.FlatList
  const flatListRef = useAnimatedRef<Animated.FlatList<OnBoardingPrograms>>();

  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        flatListIndex.value = viewableItems[0].index;
      }
    },
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.FlatList
        ref={flatListRef} // ✅ Fix: Ensure ref type matches Animated.FlatList
        onScroll={onScrollHandler}
        data={onBoardingItems}
        renderItem={({ item, index }: { item: OnBoardingPrograms; index: number }) => (
          <OnBoardingItems item={item} index={index} x={x} />
        )}
        keyExtractor={(item: OnBoardingPrograms) => item._id}
        scrollEventThrottle={17}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
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
          width: "100%",
        }}
      >
        <OnBoardingPagination data={onBoardingItems} x={x} />
        <OnboardingButton
          x={x}
          itemLength={onBoardingItems.length}
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
