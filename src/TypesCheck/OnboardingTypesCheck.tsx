import { AnimationObject } from "lottie-react-native";
import { AnimatedRef, SharedValue } from "react-native-reanimated";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";

export interface OnBoardingPrograms {
  _id: string;
  text: string;
  textColor: string;
  backgroundColor: string;
  imageUrl: AnimationObject;
}

export interface OnBoardingItemsObj {
  item: OnBoardingPrograms;
  index: number;
  x: SharedValue<number>;
}

export interface OnBoardingPaginationParams {
  item: OnBoardingPrograms[];
  x: SharedValue<number>;
}
export interface OnBoardingDotParams {
  index: number;
  x: SharedValue<number>;
}

export interface OnBoardingButtonParams {
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<OnBoardingPrograms>>;
  itemLength: number;
  x: SharedValue<number>;
}
