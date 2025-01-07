import { View, Text, TouchableOpacity  } from 'react-native'
import React from 'react'
import Icons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';


const wishlist = () => {
  const {colors} = useTheme()
  return (
    <View
    style = {{flex : 1}}
    >
      <View
      style = {{
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 12,
      }}
      >

<TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 44,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              borderWidth: 1,
              borderColor: '#fff',
              backgroundColor: colors.primary,
            }}
          >
            <Icons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: colors.text,
              }}
            >
              BookMark
            </Text>
          </View>

        

      </View>
      <Text>wishlist</Text>
    </View>
  )
}

export default wishlist