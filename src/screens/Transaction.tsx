import { View, Text, TouchableOpacity , SafeAreaView, FlatList   } from 'react-native'
import React from 'react'
import Icons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { TabsStackScreenProps } from '../navigators/TabsNavigator';
import { Order } from '../entities/Todo';
import { useQueryClient ,useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../api';
import { useState } from 'react';
import { Alert } from 'react-native';
import TransactionItem from '../components/TransactionItem';
import { RootStackScreenProps } from '../navigators/RootNavigator';
const Avatar = 'https://plus.unsplash.com/premium_photo-1675186049419-d48f4b28fe7c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';


const Transaction = ({navigation} : RootStackScreenProps<'Transaction'>) => {
    const { data: orders, isLoading, isError, error } = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn:  fetchOrders,
        staleTime: Infinity,
      });
    
 



  
  
  const {colors} = useTheme()
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ marginVertical: 32 }}>
        {/* Header Section */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingVertical: 12,
          }}
        >
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}

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
              Transaction
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* <TransactionItem title='Product' totalPrice={50} imageUri={Avatar}/> */}

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => 
            
            
            {
              console.log("Transaction id: " ,item.id)
              navigation.navigate('Details' , {id : item?.product_id})}}
          
          >

         
          <TransactionItem
            title={item.shipping_address}
            totalPrice={item.status}
            imageUri={item.thumbnail}
            description={item.created_at}
            // onRemove={() => handleDelete(item?.product_id)}
            />
             </TouchableOpacity>
          
          )}
            />
      </View>

  )
}

export default Transaction