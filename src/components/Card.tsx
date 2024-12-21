import { View, Text , TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

type CardProps = { 
    imageUri: string;
    price: number;
    onPress: () => void;
}


const Card = ({imageUri , price , onPress} : CardProps) => {
  return (
    <TouchableOpacity

    onPress={onPress}
    style={{ 
        flex : 1,
        overflow: 'hidden',
        borderRadius: 24,
        
    }}
    
    >
        <Image source={{uri: imageUri}} 
        // style={{
       
          
        //   height : 200,
        //   width: 200,
         
        // }}
        style={StyleSheet.absoluteFillObject}
        
        resizeMode='cover'/>

<View
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: "rgba(0,0,0,0.25)",
          borderRadius: 52,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
          ${price}
        </Text>
      </View>


        </TouchableOpacity>
  )
}

export default Card