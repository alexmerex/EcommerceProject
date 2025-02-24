import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import OnBoardingScreen from "../Screens/OnBoardingScreen";
import TabsNavigator, { TabsStackParams } from "./TabsNavigation";
import { NavigatorScreenParams } from "@react-navigation/native";
import ProductDetails from "../Screens/ProductDetails"; // Bổ sung import

export type RootStackParams = {
  OnBoardingScreen: undefined;
  TabsStack: NavigatorScreenParams<TabsStackParams>; // Cập nhật kiểu dữ liệu
  Deals: undefined; // Bổ sung
  Cart: undefined; // Bổ sung
  Profile: undefined; // Bổ sung
  productDetails: { // Bổ sung chi tiết tham số cho màn hình productDetails
    _id: string;
    images: [string];
    name: string;
    price: number;
    oldPrice?: number;
    inStock?: boolean;
    color?: string;
    size?: string;
    description?: string;
    quantity: number;
  };
};

const RootStack = createNativeStackNavigator<RootStackParams>();
export type RootStackScreenProps<T extends keyof RootStackParams> =
  NativeStackScreenProps<RootStackParams, T>;

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="TabsStack"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      {/* Bổ sung màn hình ProductDetails */}
      <RootStack.Screen
        name="productDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
