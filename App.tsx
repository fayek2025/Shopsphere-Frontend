import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , useColorScheme } from 'react-native';
import {} from 'react-native';
import {} from '@react-navigation/native-stack'
import {} from '@react-navigation/bottom-tabs'
import {DefaultTheme, NavigationContainer , DarkTheme} from '@react-navigation/native'
import RootNavigator from './src/navigators/RootNavigator';
import TabsNavigator from './src/navigators/TabsNavigator';
import { useMemo , useRef } from 'react';
import { Theme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import  { BottomSheetModalProvider} from '@gorhom/bottom-sheet';4
import { QueryClientProvider , QueryClient, Query } from '@tanstack/react-query';



const queryClient = new QueryClient();


export default function App() {
    interface CustomTheme extends Theme {
      colors: Theme['colors'] & {
        whiteLabel: string;
      };
    }

    const colorSheme = useColorScheme();
    // const BottomSheetModalProviderRef = useRef<BottomSheetModalProvider>(null);

    const theme : CustomTheme = useMemo(() => ({
          ...DefaultTheme,
          colors:{
            ...DefaultTheme.colors,
            backgroundColor: '#f5f5f5',
          text: '#191919',
          border: '#D9D9D9',
          primary: '#191919',
          whiteLabel: '#fff',

          }
          



    }), 
    []);
  return (

    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
        
      <NavigationContainer theme={theme}>
      <BottomSheetModalProvider>
        <RootNavigator />
      
        <StatusBar style="dark" />
        </BottomSheetModalProvider>
      </NavigationContainer>
      
     </GestureHandlerRootView>

     </QueryClientProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
