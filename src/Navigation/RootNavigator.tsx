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
import PaymentScreen from "../Screens/PaymentScreen"; // ✅ Thêm PaymentScreen
import UserAuth from "../Screens/LoginRegisterScreen";
import ProfileScreen from "../Screens/ProfileScreen";

// Định nghĩa kiểu dữ liệu cho RootStackParams
export type RootStackParams = {
  OnBoardingScreen: undefined;
  TabsStack: NavigatorScreenParams<TabsStackParams>;
  Deals: undefined;
  Profile: undefined;
  Cart: {
    _id: string;
    images: [string];
    name: string;
    price: number;
    color?: string;
    size?: string;
    quantity: number;
  };
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
  Payment: { totalAmount: number }; // ✅ Thêm Payment vào RootStackParams
  UserLogin: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    mobileNo?: string;
    screenTitle?: string;
  };
};

// Khởi tạo Stack Navigator
const RootStack = createNativeStackNavigator<RootStackParams>();
export type RootStackScreenProps<T extends keyof RootStackParams> =
  NativeStackScreenProps<RootStackParams, T>;

// Component điều hướng chính
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
      <RootStack.Screen
        name="productDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Payment" // ✅ Thêm màn hình Payment vào RootNavigator
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="UserLogin"
        component={UserAuth}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
