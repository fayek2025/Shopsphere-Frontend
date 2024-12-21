import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';

const SlideHandler = () => {
    const {colors} = useTheme();
  return (
    <View
                    style ={{
                        position: 'absolute',
                        left: '10%',
                        aspectRatio: 1,
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        borderColor: colors.primary,
                        borderWidth: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        
                        transform: [
                                {translateX: -12.5},
                                {translateY:-12},
                        ],

                    }}
                    
                    >

                        <View 
                        style = {{
                            height: 4,
                            width : 4,
                            borderRadius: 2,
                            backgroundColor: colors.primary,
                        }}
                        
                        />
                    </View>
  )
}

export default SlideHandler