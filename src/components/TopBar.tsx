import { View, Text , StatusBar , TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Icons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

type TopBarProps = { 
    color?: string;
    borderColor?: string;
    handlePress?: () => void;
}


const TopBar = ({color , borderColor , handlePress} : TopBarProps) => {
    const navigation = useNavigation();
  return (
    <SafeAreaView
    
    style={{ position: "absolute", top: 0, left: 0, right: 0
      
     }
  }
  >
    <StatusBar />
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        gap: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 52,
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 52,
          borderWidth: 1,
          borderColor: "#fff",
          backgroundColor: "white",
          shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
        }}
      >
        <Icons name="arrow-back" size={24} color={color} />
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
      {/* <TouchableOpacity
        style={{
          width: 52,
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 52,
          borderWidth: 1,
          borderColor: color,
        }}
      >
        <Icons name="favorite-border" size={24} color={"color"} />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{
          width: 52,
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 52,
          borderWidth: 1,
          borderColor: "#fff",
          backgroundColor: "white",
          shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
        }}

        onPress={handlePress}
      >
        <Icons name="add-shopping-cart" size={24} color={"color"} />
      </TouchableOpacity>
    </View>
  </SafeAreaView>

  )
}

export default TopBar