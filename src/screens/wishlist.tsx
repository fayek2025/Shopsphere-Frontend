import { View, Text, TouchableOpacity , SafeAreaView, FlatList   } from 'react-native'
import React from 'react'
import Icons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { TabsStackScreenProps } from '../navigators/TabsNavigator';
import WishListItem from '../components/WishListItem';
import { useQueryClient ,useQuery } from '@tanstack/react-query';
import { fetchWishlist } from '../api';
import { useDeleteWishlistItem } from '../api';
import { WishlistItem } from '../entities/Todo';
import { useState } from 'react';
import { Alert } from 'react-native';
const Avatar = 'https://plus.unsplash.com/premium_photo-1675186049419-d48f4b28fe7c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';


const wishlist = ({navigation} : TabsStackScreenProps<'Wish'>) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const deleteWishlistItemMutation = useDeleteWishlistItem();

  const { data: wishlist, isLoading, isError, error } = useQuery<WishlistItem[]>({
    queryKey: ['wishlist'],
    queryFn:  fetchWishlist,
    staleTime: Infinity,
  });



  const handleDelete = (wishlistId: number) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to remove this item from your wishlist?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteWishlistItemMutation.mutate(wishlistId, {
              onSuccess: () => {
                Alert.alert('Success', 'Wishlist item deleted successfully!');
              },
              onError: (error) => {
                Alert.alert('Error', 'Failed to delete wishlist item. Please try again.');
                console.error('Error deleting wishlist item:', error);
              },
            });
          },
        },
      ]
    );
  };
  
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
              Wishlist
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* <WishListItem title='Product' totalPrice={50} imageUri={Avatar}/> */}

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => 
            
            
            {
              console.log("wishlist id: " ,item.id)
              navigation.navigate('Details' , {id : item?.product_id})}}
          
          >

         
          <WishListItem
            title={item.product?.title}
            totalPrice={item.product?.price}
            imageUri={item.thumbnail}
            onRemove={() => handleDelete(item?.product_id)}
            />
             </TouchableOpacity>
          
          )}
            />
      </View>

  )
}

export default wishlist