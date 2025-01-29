import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Icons from '@expo/vector-icons/MaterialIcons'
import Card from '../components/Card'
import { RefreshControl } from 'react-native'

import { useState, useRef} from 'react'


import BottomSheetModal from '@gorhom/bottom-sheet'



import { TabsStackScreenProps } from '../navigators/TabsNavigator'
import {  fetchTodos, useCreateWishlist , fetchUserInfo , fetchRecommendedProducts } from '../api';
import { Product, Todo , User } from '../entities/Todo'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/auth/useAuthStore'
import ProductListItem from '../components/ProductListItem'
import RecomendedProductListItem from '../components/RecomendedProductListItem'



const MESONARY_LIST_DATA = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80",
    title: "PUMA Everyday Hussle",
    price: 160,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 180,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1736177046343-32c5d0f9bcc6?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "PUMA Everyday Hussle",
    price: 200,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 180,
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    title: "PUMA Everyday Hussle",
    price: 120,
  },
];

const AVATAR_URL = "https://scontent.fdac24-5.fna.fbcdn.net/v/t39.30808-6/469896391_2687837268069061_6559928998212538282_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=BEvfaSe0YRkQ7kNvgFH2fjz&_nc_zt=23&_nc_ht=scontent.fdac24-5.fna&_nc_gid=A9A2t4toQbsegkHSHiLr6CG&oh=00_AYCwA5NPyFDCy2agnD64OHzjjsxhAz7VpH8gjOviTcbcZg&oe=675F7C70"
const Categoris = [
  "Clothing",
  "Shoes",
  "Accessories",
  "Jewellery",
  "Beauty",
  "Home",
  "Electronics",
]

const dummyData = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '5', title: 'Item 4' },
  { id: '6', title: 'Item 4' },
  { id: '7', title: 'Item 4' },
  { id: '8', title: 'Item 4' },
  { id: '9', title: 'Item 4' },
  { id: '10', title: 'Item 4' },
];

const HomeScreens = ({ navigation }: TabsStackScreenProps<"Home">) => {
  const accessToken = useAuthStore.getState().refreshToken;
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);


  const [search, setSearch] = useState('');
  const { data: todos = [], isLoading, isError, error } = useQuery<Todo[]>({
    queryKey: ['todos', { search }],
    queryFn: () => fetchTodos(search),
    staleTime: Infinity,
  });

  const { data: reco = [] } = useQuery<Product[]>({
    queryKey: ['recommendedProducts', { search }],
    queryFn: () => fetchRecommendedProducts(),
    staleTime: Infinity,
  });

  const {data: userInfo = []} = useQuery<User[]>({
    queryKey: ['user'],
    queryFn:  fetchUserInfo,
    staleTime: Infinity,
  })

  const onRefresh = () => {
    setRefreshing(true);
    queryClient.invalidateQueries(['todos', { search }]);
    queryClient.invalidateQueries(['recommendedProducts']);
    
    setRefreshing(false);
  };

  // console.log(todos);
  console.log(reco);
  const { colors } = useTheme();


  const bottomSheetRef = useRef<BottomSheetModal>(null);
  






  //handle Favourite Function
  const handleFavourite = (productId: number) => {
    const { mutate } = useCreateWishlist();

    const toggleFavourite = () => {
      if (isLoading) {
        console.log('Processing...');
        return;
      }

      mutate(
        { product_id: productId },
        {
          onSuccess: (data) => {
            console.log(`Product ${productId} added to wishlist successfully:`, data);
          },
          onError: (error) => {
            console.error(`Failed to add product ${productId} to wishlist:`, error);
          },
        }
      );
    };

    return toggleFavourite;
  };
  console.log("HomeScreen")
  console.log(accessToken);
  console.log(userInfo);
  return (

    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
      <SafeAreaView
        style={{
          paddingVertical: 24, gap: 24,
        }}
      >

        <View style={{
          paddingHorizontal: 24,
          paddingVertical: 24,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8

        }}>
          <Image source={{ uri: AVATAR_URL }} style={{
            width: 52,
            height: 50,
            aspectRatio: 1,
            borderRadius: 25
          }} />
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 18, fontWeight: "600", marginBottom: 8,
              color: colors.text
            }}
              numberOfLines={1}

            >Hi, {userInfo?.username}</Text>
            <Text > Discover fashion that suits your styles</Text>
          </View>
          <View
            style={{
              height: 12,
              width: 1,
              backgroundColor: colors.text,
              marginRight: 8


            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('CartScreen')}
            style={{
              backgroundColor: colors.card,
              padding: 4,
              borderRadius: 52,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: colors.border,
              borderWidth: 1,
              aspectRatio: 1
            }}
          >
            <Icons name="shopping-cart" size={24} color={colors.text} />
          </TouchableOpacity>







        </View>
        {/* Search Bar Section */}
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 24,
          // marginBottom: 12,
          gap: 8
        }}>

        
          <TouchableOpacity
            style={{
              flex: 1,
              height: 52,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 8,
              borderRadius: 52,
              flexDirection: 'row',
              alignItems: 'center',


            }}
            onPress={() => navigation.navigate('SearchScreen')}
          >

            <Icons name="search" size={24} color={colors.text}
              style={{ opacity: 0.5 }}
            />
            <View
              placeholder='Search'
              style={{
                flex: 1,
                paddingVertical: 8,
                color: colors.text,
                fontSize: 16,
                fontWeight: '500'
              }}
            />
          

          </TouchableOpacity>

         


        </View>

        {/* Grid View Section */}

        {/* <View style={{ paddingHorizontal: 24 }}> */}

          {/* text section */}
          {/* <View style={{
            flexDirection: 'row',

            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 24, fontWeight: "700" }}>
              New Collection
            </Text>
            <TouchableOpacity>
              <Text style={{ color: colors.primary, fontWeight: '600' }}>See All</Text>
            </TouchableOpacity> */}

          {/* </View> */}

          {/* <View
            style={{
              flexDirection: 'row',
              height: 200,
              paddingVertical: 12,
              gap: 12,
              borderRadius: 52,
            }}

          >


            <Card
              onPress={() => navigation.navigate('Details', {
                imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                title: 'Sample Title', // Add the title property
                price: '2500',
                description: 'Sample Description', // Add the description property
              })

              }
              imageUri='https://images.unsplash.com/photo-1532074662130-17f5486532b0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              price={120}

            />
            <View style={{ flex: 1, gap: 12 }}>
              <Card
                onPress={() => navigation.navigate('Details', {
                  imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  title: 'Sample Title', // Add the title property
                  price: '2500',
                  description: 'Sample Description',
                })}

                imageUri='https://images.unsplash.com/photo-1532074662130-17f5486532b0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                price={120}
              />
              <Card
                onPress={() => navigation.navigate('Details', {
                  imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  title: 'Sample Title', // Add the title property
                  price: '2500',
                  description: 'Sample Description',
                })}
                imageUri="https://plus.unsplash.com/premium_photo-1669688174106-05f7334f1e64?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                price={120}
              />


            </View>


          </View> */}


        {/* </View> */}

        {/* // Categories Section */}
        <View>


        </View>
        <Text 
          style = {{
            fontSize: 24,
            fontWeight: '700',
            paddingHorizontal: 24,
           
            color: colors.text
          }}
          
          >
          
            Recommended Products
          </Text>
        <RecomendedProductListItem 
          data={reco}
          navigation={navigation}
          handleFavourite={handleFavourite}
          />
        
          <Text 
          style = {{
            fontSize: 24,
            fontWeight: '700',
            paddingHorizontal: 24,
           
            color: colors.text
          }}
          
          >
          
            Featured Products
          </Text>
        
        


        <ProductListItem
          data={todos}
          navigation={navigation}
          handleFavourite={handleFavourite}

        />

     

       



      </SafeAreaView>




    </ScrollView>











  )
}

export default HomeScreens