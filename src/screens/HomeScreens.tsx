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

const avatar = "https://instagram.fdac12-1.fna.fbcdn.net/v/t51.2885-19/471905802_565543123116499_7645982300228500794_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=instagram.fdac12-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=uu5Ic6ixsjoQ7kNvgERgJJE&_nc_gid=86480d39b04c49bc9aee40260f735330&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYAQJSUUfr7zw5ak2ZzOqD-xFWrRKA21UFyC-aYG2UbpMg&oe=679FBC09&_nc_sid=8b3546"

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
          <Image source={{ uri: avatar }} style={{
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
             
              style={{
                flex: 1,
                
                paddingHorizontal: 8,
                alignItems: 'center',

               
                
              }}
            >
              <Text style={{
                fontSize: 16,
                fontWeight: '400',
                color: colors.text,
                opacity: 0.5
              }}
              >Search for products using text or image</Text>
          </View>

          </TouchableOpacity>

         


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