import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import OnBoardingScreen from "../Screens/OnboardingScreen";
import TabsNavigator, { TabsStackParams } from "./TabsNavigation";
import ProductDetails from "../Screens/ProductDetails";
import CartScreen from "../Screens/CartScreen";
import PaymentScreen from "../Screens/PaymentScreen";
import UserAuth from "../Screens/LoginRegisterScreen";
import ProfileScreen from "../Screens/ProfileScreen";

export type RootStackParams = {
  OnBoardingScreen: undefined;
  TabsStack: NavigatorScreenParams<TabsStackParams>;
  productDetails: {
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
  Cart: {
    _id: string;
    images: [string];
    name: string;
    price: number;
    color?: string;
    size?: string;
    quantity: number;
  };
  Payment: { totalAmount: number }; // ✅ Chỉ giữ ở RootNavigator
  UserLogin: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    mobileNo?: string;
    screenTitle?: string;
  };
  Profile: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export type RootStackScreenProps<T extends keyof RootStackParams> =
  NativeStackScreenProps<RootStackParams, T>;

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <RootStack.Screen name="TabsStack" component={TabsNavigator} />
      <RootStack.Screen name="productDetails" component={ProductDetails} />
      <RootStack.Screen name="Cart" component={CartScreen} />
      <RootStack.Screen name="Payment" component={PaymentScreen} />
      <RootStack.Screen name="UserLogin" component={UserAuth} />
      <RootStack.Screen name="Profile" component={ProfileScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
