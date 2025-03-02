import React, { useState, useCallback, useRef } from "react";
import { View, SafeAreaView } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedRef,
} from "react-native-reanimated";
import { RootStackScreenProps } from "../Navigation/RootNavigator";
import { OnBoardingPrograms } from "../TypesCheck/OnboardingTypesCheck";
import { OnBoardingData } from "../Data/EcommerceAppData";

import OnBoardingItems from "../Components/OnboardingComponents/OnboardingItems";
import OnBoardingPagination from "../Components/OnboardingComponents/OnBoardingPagination";
import OnboardingButton from "../Components/OnboardingComponents/OnboardingButton";

const OnBoardingScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"OnBoardingScreen">) => {
  const [onBoardingItems] = useState<OnBoardingPrograms[]>(OnBoardingData);

  const flatListRef = useAnimatedRef<Animated.FlatList<OnBoardingPrograms>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScrollHandler}
        data={onBoardingItems}
        renderItem={({ item, index }) => (
          <OnBoardingItems item={item} index={index} x={x} />
        )}
        keyExtractor={(item) => item._id}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig.current}
      />

      {/* Điều hướng và phân trang */}
      <View
        style={{
          position: "absolute",
          bottom: 30,
          left: 20,
          right: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          borderRadius: 12,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
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
