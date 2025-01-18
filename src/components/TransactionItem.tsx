import { View, Text, TouchableOpacity , Image } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons';


type TransactionItemProps = { 
    imageUri?: string;
    title?: string;
    description?: string;
    totalPrice?: number;
    quantity?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onRemove?: () => void;
}


const TransactionItem = ({imageUri , title , description , totalPrice , quantity , onRemove } : TransactionItemProps) => {
    const {colors} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        marginHorizontal: 24,
        backgroundColor: colors.card,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      }}
    >
      {/* Product Image */}
     

      {/* Product Details */}
      <View style={{ marginHorizontal: 16, flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>
          {title}
        </Text>
        
        <Text style={{ fontSize: 16, fontWeight: '600', color: 'red' }}>
          {totalPrice}
        </Text>
        <Text style={{ fontSize: 14, color: 'gray' }}>
          {description}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={{ alignItems: 'center' }}>
        {/* Remove Button */}
        

        
       
        
      </View>
    </View>
  )
}

export default TransactionItem