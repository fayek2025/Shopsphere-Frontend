import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreens'
import DetailsScreen from '../screens/DetailsScreen'    
import TabsNavigator, { TabsStackParamList } from "./TabsNavigator";
import { NavigatorScreenParams  } from "@react-navigation/native";
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import CartScreen from '../screens/CartScreen'
import BrandScreen from '../screens/BrandScreen'
import BrandScreenDetails from '../screens/BrandDetailScreens'
import confirmScreen from '../screens/ConfirmScreen'
import EditProfile from '../screens/EditProfile'
import Login from '../screens/login'
import signUp from '../screens/signUp'
import OnboardingScreen from '../screens/OnboardingScreen'
import { useAuthStore } from '../store/auth/useAuthStore'
import Transaction from '../screens/Transaction'
import SearchScreen from '../screens/SearchScreen'
import AboutUs from '../screens/AboutUs'
import SplashScreen from '../screens/SplashScreen'
import useSplashStore from '../store/useSplashStore'

export type RootStackParamList = {
  Splash : undefined;
    TabsStack: NavigatorScreenParams<TabsStackParamList>;
    Details : {
      id? : number;
      imageUrl?: string;
      title?: string;
      description?: string;
      price?: string;
    };
    CartScreen: undefined;
    BrandScreenDetails : {
      id ?: number;
      imageUrl?: string;
      title?: string;
      description?: string;
      price?: string;
    };

    confirmScreen: {
      totalPrice: number;
      cart_id : number;
    };
    Login : undefined;
    signUp: undefined;
    onBoarding : undefined;
    EditProfile : {
      name: string;
      email: string;
      username: string;
    };
    Transaction : undefined;
    SearchScreen: undefined;
    AboutUs : undefined;
   
    
}

//root stack
const RootStack = createNativeStackNavigator<RootStackParamList>()    

export type RootStackScreenProps <T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>
    


const RootNavigator = () => {
  const { isAuthenticated } = useAuthStore();
  const { hasShownSplash } = useSplashStore();

  return (

    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      
      
      {!isAuthenticated ? (
        <>
          <RootStack.Screen name="Splash" component={SplashScreen} />
          <RootStack.Screen name="onBoarding" component={OnboardingScreen} />
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="signUp" component={signUp} />
        </>
      ) : (
        <>
          <RootStack.Screen name="TabsStack" component={TabsNavigator} />
          <RootStack.Screen name="Details" component={DetailsScreen} />
          <RootStack.Screen name="CartScreen" component={CartScreen} />
          <RootStack.Screen
            name="BrandScreenDetails"
            component={BrandScreenDetails}
          />
          <RootStack.Screen name="confirmScreen" component={confirmScreen} />
          <RootStack.Screen name="EditProfile" component={EditProfile} />
          <RootStack.Screen name = "Transaction" component={Transaction} />
          <RootStack.Screen name = "SearchScreen" component={SearchScreen} />
          <RootStack.Screen name = "AboutUs" component={AboutUs} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator