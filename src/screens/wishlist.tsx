import { useIsFocused } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { TabsStackScreenProps } from '../navigators/TabsNavigator';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchWishlist } from '../api';
import { useDeleteWishlistItem } from '../api';
import { WishlistItem } from '../entities/Todo';
import WishListItem from '../components/WishListItem';

const Avatar = 'https://plus.unsplash.com/premium_photo-1675186049419-d48f4b28fe7c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const Wishlist = ({ navigation }: TabsStackScreenProps<'Wish'>) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const deleteWishlistItemMutation = useDeleteWishlistItem();
  
  // Fetch wishlist using react-query
  const { data: wishlist, isLoading, isError, error, refetch } = useQuery<WishlistItem[]>({
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
    staleTime: Infinity,
    refetchOnWindowFocus: true, // refetch when window gains focus
    refetchOnMount: 'always', // refetch when mounted
  });

  // Handle delete functionality
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

  // Automatically refetch the wishlist when the screen is focused
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      refetch(); // Trigger refetch whenever the screen is focused
    }
  }, [isFocused, refetch]);

  const { colors } = useTheme();
  
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ marginVertical: 32 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingVertical: 12,
          }}
        >
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

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log('wishlist id: ', item.id);
              navigation.navigate('Details', { id: item?.product_id });
            }}
          >
            <WishListItem
              title={item.product?.title}
              totalPrice={item.product?.price}
              imageUri={item.product?.thumbnail}
              onRemove={() => handleDelete(item?.product_id)}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Wishlist;
