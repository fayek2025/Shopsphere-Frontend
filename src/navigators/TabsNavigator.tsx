import { View, Text } from "react-native";
import React from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreens";
import Icons from "@expo/vector-icons/MaterialIcons";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackScreenProps } from "./RootNavigator";
import CustomBottomTabs from "../components/CustomBottomTabs";
import wishlist from "../screens/wishlist";
import BrandScreen from "../screens/BrandScreen";
import Profile from "../screens/ProfileScreen";

export type TabsStackParamList = {
  Home: undefined;
  Wish: undefined;
  Brand: undefined;
  Profile: undefined;
};
const TabsStack = createBottomTabNavigator<TabsStackParamList>();

export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<"TabsStack">
  >;

const TabsNavigator = () => {
  return (
    <TabsStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <CustomBottomTabs {...props} />}
    >
      <TabsStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="home" {...props} />;
          },
        }}
      />
      
      <TabsStack.Screen
        name="Wish"
        component={wishlist}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="shopping-cart" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Brand"
        component={BrandScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="store" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="person" {...props} />;
          },
        }}
      />
    </TabsStack.Navigator>
  );
};

export default TabsNavigator;

const Example = () => {
  return <View />;
};