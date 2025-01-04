import { View, Text, TouchableOpacity, Image } from 'react-native'
import React , {useState}from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { RootStackScreenProps } from '../navigators/RootNavigator'
import Icons from '@expo/vector-icons/MaterialIcons'
import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { StatusBar } from 'react-native'
import { fetchProductById , useCreateCart } from '../api'
import BottomSheet, { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native'


import { clamp } from 'react-native-reanimated'
  const URL = 'https://images.unsplash.com/photo-1491756975177-a13d74ed1e2f?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
const DetailsScreen = ({navigation , route: {params : {id , imageUrl ,title }}} : RootStackScreenProps<"Details">) => {
  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['todos', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Product ID is undefined');
      }
      return fetchProductById(id);
    },
    staleTime: Infinity,
  })

  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  const [count , setCount] = useState(1);
  const [size , setSize] = useState(SIZES[0])  ; 
  const {mutate : createCart} = useCreateCart();

 const handleAddToCart = () => {
  if (!id || !count) {
    Alert.alert("Error", "Invalid product details or quantity.");
    return;
  }

  // Prepare the cart item
  const cartItem = {
    cart_items: [
      {
        product_id: id, // Product ID
        quantity: count, // Quantity of the product
      },
    ],
  }

  // Call the mutation
  createCart(cartItem, {
    onSuccess: (data) => {
      console.log("Cart created successfully!", data);
      Alert.alert("Success", "Product added to your cart!");
    },
    onError: (error) => {
      console.error("Error adding product to cart:", error);
      Alert.alert("Error", "Unable to add product to your cart. Please try again.");
    },
  });
};

  console.log(product);
  console.log(id);
  
  return (
    // header Section
    <View
    style = {{
      flex: 1
    }}
    > 
    <Image source={{uri: product?.thumbnail}} style={StyleSheet.absoluteFill} resizeMode='cover' />

      
<SafeAreaView
        edges={["top"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0
          , marginVertical: 24,
         }
      }
      >
        <StatusBar />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            gap: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: "#fff",
            }}
          >
            <Icons name="arrow-back" size={24} color={"#fff"} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: "#fff",
            }}
          >
            <Icons name="favorite-border" size={24} color={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: "#fff",
            }}
          >
            <Icons name="add-shopping-cart" size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <BottomSheet
      detached
       snapPoints={[64 , 400]}
       index={0}
       style={{
        marginHorizontal: 24,
        
        
       }}
       backgroundStyle={{ 
        borderRadius: 24,
        backgroundColor: colors.background,
       }}
       bottomInset= {100}
      >
        <BottomSheetView>

       
        <View style  ={{padding:16}}>

            <Text style ={{
                fontWeight: '600',
                fontSize: 20,
            }}>
              {product?.title}
             
            </Text>
            <View 
            style = {{
              flexDirection : 'row',
              alignItems : 'center',

            }}
            >


            <View style = {{flex : 1}}> 
              <View
              style = {{flexDirection : 'row' , gap : 2}}
              >
                {
                  new Array(5).fill("").map((_, i) =>
                    <Icons 
                  key={i}
                  name={i < 3 ? "star" : "star-border"}
                  color="#facc15"
                  size={20}
                    />
                  
                  )
                }
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.text,
                  opacity: 0.5,
                  marginTop: 4,
                }}
              >
                 {product?.rating} (250K Reviews) 
              </Text>


            </View>
            <View
            style ={{
              flexDirection : 'row',
              alignItems : 'center',
              gap:6,
              borderRadius : 100,
              backgroundColor : colors.primary  ,
              padding : 6,
              
              

            }}>

              

                <TouchableOpacity
                onPress={() => setCount((count) => Math.max(1, count - 1))}
                style = {{
                  backgroundColor : colors.card,
                  width : 34,
                  aspectRatio : 1,
                  alignItems : 'center',
                  justifyContent : 'center',
                  borderRadius : 34
                }}
                >
                  <Icons name='remove' size={20} colors = {"white"} />
                </TouchableOpacity>

                <Text style = {{fontWeight : '600' , fontSize : 16 , color : colors.background}}>
                    {count}
                </Text>


                <TouchableOpacity
                onPress={() => setCount((count) => Math.max(1, count + 1))}
                style = {{
                  backgroundColor : colors.card,
                  width : 34,
                  aspectRatio : 1,
                  alignItems : 'center',
                  justifyContent : 'center',
                  borderRadius : 34
                }}
                >
                  <Icons name='add' size={20} colors = {"white"} />
                </TouchableOpacity>

             

            </View>
                {/* Size */}
           

            </View>

        

            
            


        </View>
         <View
            style = {{
             
              paddingHorizontal : 12
            }}
            >
              <Text style = {{
                fontSize : 16,
                fontWeight : '600',
                color : colors.text,  
              }}>
                Size Guide
              </Text>

              {/* Size Selector */}
              <View style = {{
                flexDirection : 'row',
                alignItems : 'center',
                flexWrap : 'wrap',
              }}>

                {
                  SIZES.map((s , index) => (
                    <TouchableOpacity
                    onPress={() =>{
                      setSize(s)
                    }}                    key={index}
                    style = {{
                      backgroundColor : size === s ? colors.primary : colors.card,
                      width : 44,
                      aspectRatio : 1,
                      alignItems : 'center',
                      justifyContent : 'center',
                      borderRadius : 52,
                      marginVertical : 8,
                      marginRight : 8,
                    }}
                    >
                      <Text style = {{
                        color : size === s ? colors.background : colors.text,
                        fontWeight : '600',
                        fontSize : 16,
                      }}>
                        {s}
                      </Text>
                    </TouchableOpacity>
                  ))
                }

              </View>


              {/* Descriptions */}

              <View style = {{
                
              }}>

                <Text style = {{ 
                  fontSize : 24,
                  fontWeight : '600',
                  color : colors.text,
                }}

                >
                  {/* {description} */}
                </Text>

                <Text>
                Stay cozy and chic with this timeless ribbed knit sweater. 
                </Text>
              </View>

              {/* Add to the cart button */}
              <View style={{ flex: 1 , marginBottom: 12 }} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: colors.text, opacity: 0.75, marginBottom: 4 }}
              >
                Total
              </Text>
              <Text
                style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}
              >
                $ {product?.price * count}
              </Text>
            </View>

            <TouchableOpacity
            onPress={handleAddToCart
            }
              style={{
                backgroundColor: colors.primary,
                height: 64,
                borderRadius: 64,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                flexDirection: "row",
                padding: 12,
                marginBottom : 20
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.background,
                  paddingHorizontal: 16,
                }}
              >
                Add to cart
              </Text>

              <View
                style={{
                  backgroundColor: colors.card,
                  width: 40,
                  aspectRatio: 1,
                  borderRadius: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icons name="arrow-forward" size={24} color={colors.text} />
              </View>
            </TouchableOpacity>
          </View>
            </View>
        </BottomSheetView>

      </BottomSheet>

    </View>
  )
}

export default DetailsScreen