import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { RootStackScreenProps } from '../navigators/RootNavigator';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import CartItems from '../components/CartItems';
import { fetchCarts } from '../api';
import { useUpdateCart } from '../api'; // Adjust the path to match your file structure
import { Alert } from 'react-native';

import { useQuery, useQueryClient } from '@tanstack/react-query';
const CartScreen = ({ navigation }: RootStackScreenProps<'CartScreen'>) => {
  
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const [search , setSearch] = useState('');
  const updateCartMutation = useUpdateCart();


  const { data: carts = [], isLoading, isError, error } = useQuery({
    queryKey: ['carts' , { search }],
    queryFn:() => fetchCarts(search), // Pass the function reference, NOT the result
    staleTime: Infinity,
  })
  // Example cart items data with quantity
  const [cartData, setCartData] = useState([
    {
      id: '1',
      imageUri:
        'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Product Title 1',
      description: 'Product Description 1',
      price: 100,
      quantity: 1,
    },
    {
      id: '2',
      imageUri:
        'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Product Title 2',
      description: 'Product Description 2',
      price: 150,
      quantity: 1,
    },
    {
      id: '3',
      imageUri:
        'https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Product Title 3',
      description: 'Product Description 3',
      price: 200,
      quantity: 1,
    },
  ]);

  // Calculate total price dynamically
  const totalPrice = useMemo(
    () =>
      cartData.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartData]
  );

  // Handle quantity increment
  const handleIncrement = (cartId: number, productId: number, currentQuantity: number) => {
    const newQuantity = currentQuantity + 1;
  
    const updatedCartData = {
      cart_items: [
        {
          product_id: productId,
          quantity: newQuantity,
        },
      ],
    };
  
    updateCartMutation.mutate(
      { cartId, updatedCartData },
      {
        onSuccess: (data) => {
          console.log('Cart updated successfully:', data);
          Alert.alert('Success', 'Quantity updated successfully!');
        },
        onError: (error) => {
          console.error('Error updating cart:', error);
          Alert.alert('Error', 'Failed to update quantity. Please try again.');
        },
      }
    );
  };
  

  // Handle quantity decrement
  const handleDecrement = (cartId: number, productId: number, currentQuantity: number) => {
    const newQuantity = currentQuantity - 1;
  
    if (newQuantity <= 0) {
      Alert.alert('Error', 'Quantity must be at least 1.');
      return;
    }
  
    const updatedCartData = {
      cart_items: [
        {
          product_id: productId,
          quantity: newQuantity,
        },
      ],
    };
  
    updateCartMutation.mutate(
      { cartId, updatedCartData },
      {
        onSuccess: (data) => {
          console.log('Cart updated successfully:', data);
          Alert.alert('Success', 'Quantity updated successfully!');
        },
        onError: (error) => {
          console.error('Error updating cart:', error);
          Alert.alert('Error', 'Failed to update quantity. Please try again.');
        },
      }
    );
  };
  

  const renderCartItem = ({ item }: { item: any }) => {
    return (
      <>
        {item.cart_items.map((cartItem: any) => (
          <CartItems
            key={cartItem.id}
            imageUri={cartItem.product?.thumbnail} 
            title={cartItem.product?.title} 
            description={cartItem.product?.description} 
            price={cartItem.subtotal} 
            quantity={cartItem.quantity} 
            onIncrement={() => handleIncrement(cartItem.id)} 
            onDecrement={() => handleDecrement(cartItem.id)} 
          />
        ))}
      </>
    );
  };

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
              Shopping Cart
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <FlatList
        data={carts}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      {/* Total Section */}
      <View
        style={{
          position: 'relative',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.card,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 24,
            marginTop: 24,
            marginBottom: 16,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: colors.text,
              padding: 16,
            }}
          >
            Total
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: colors.text,
              padding: 16,
            }}
          >
            ${totalPrice}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('confirmScreen')}
          style={{
            backgroundColor: colors.primary,
            height: 64,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            padding: 12,
            marginHorizontal: 24,
            marginVertical: 16,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
            }}
          >
            Review Address and Payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
