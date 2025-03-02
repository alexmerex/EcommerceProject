import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackScreenProps } from "./RootNavigator";
import HomeScreen from "../Screens/HomeScreen";
import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import EditProfileScreen from "../Screens/EditProfileScreen";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

export type TabsStackParams = {
  Home: undefined;
  Cart?: {
    _id?: string;
    images?: [string];
    name?: string;
    price?: number;
    color?: string;
    size?: string;
    quantity?: number;
  };
  UserProfile: { updated?: boolean }; // ✅ Đổi tên Profile để tránh lỗi trùng tên
  EditProfile: { userData: any };
};

const TabsStack = createBottomTabNavigator<TabsStackParams>();
const ProfileStack = createNativeStackNavigator<TabsStackParams>();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="UserProfile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
};

const TabsNavigator = () => {
  return (
    <TabsStack.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <TabsStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#00970a" />
            ) : (
              <AntDesign name="home" size={24} color="#000" />
            ),
        }}
      />
      <TabsStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="shoppingcart" size={24} color="#00970a" />
            ) : (
              <AntDesign name="shoppingcart" size={24} color="#000" />
            ),
        }}
      />
      <TabsStack.Screen
        name="UserProfile"
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="#00970a" />
            ) : (
              <Ionicons name="person-outline" size={24} color="#000" />
            ),
        }}
      />
    </TabsStack.Navigator>
  );
};

export default TabsNavigator;
