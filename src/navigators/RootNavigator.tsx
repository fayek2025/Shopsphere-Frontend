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

export type RootStackParamList = {
    TabsStack: NavigatorScreenParams<TabsStackParamList>;
    Details : {
      id? : string;
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

    confirmScreen: undefined;
   
    
}

//root stack
const RootStack = createNativeStackNavigator<RootStackParamList>()    

export type RootStackScreenProps <T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>
    


const RootNavigator = () => {
  return (
    <RootStack.Navigator>
        <RootStack.Screen name="TabsStack" component={TabsNavigator} options={{headerShown :false}} />   
        <RootStack.Screen name="Details" component={DetailsScreen} 
        options={{headerShown : false}}
        
        />
         <RootStack.Screen name="CartScreen" component={CartScreen} 
        options={{headerShown : false}}
        
        
        />

        <RootStack.Screen name="BrandScreenDetails" component={BrandScreenDetails}
        options={{headerShown : false}}
        
        /> 

<RootStack.Screen name="confirmScreen" component={confirmScreen}
        options={{headerShown : false}}
        
        /> 
       

    </RootStack.Navigator>
  )
}

export default RootNavigator