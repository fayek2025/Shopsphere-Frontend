import { View, Text, TouchableOpacity, Image ,FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { RootStackScreenProps } from '../navigators/RootNavigator'
import Icons from '@expo/vector-icons/MaterialIcons'
import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { StatusBar } from 'react-native'
import TopBar from '../components/TopBar'
import Chip from '../components/Chip'
import MasonryList from 'reanimated-masonry-list';
import { BlurView } from 'expo-blur';
import { fetchBrandsProduct } from '../api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ProductListItem from '../components/ProductListItem'


const Categoris = [ 
    "Clothing",
    "Shoes",
    "Accessories",
    "Jewellery",
    "Beauty",
    "Home",
    "Electronics",
]

const MESONARY_LIST_DATA = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80",
      title: "PUMA Everyday Hussle",
      price: 160,
      description : "This is a description"
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      title: "PUMA Everyday Hussle",
      price: 180,
      description : "This is a description"
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1556217477-d325251ece38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1020&q=80",
      title: "PUMA Everyday Hussle",
      price: 200,
      description : "This is a description"
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      title: "PUMA Everyday Hussle",
      price: 180,
      description : "This is a description"
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      title: "PUMA Everyday Hussle",
      price: 120,
      description : "This is a description"
    },
  ];


const BrandDetailScreens = ({
  navigation,
  route: { params: {id , imageUrl, title, price } },
}: RootStackScreenProps<"BrandScreenDetails">) => {
  const [isSelected, setIsSelected] = React.useState<number | null>
  (null);
  const [selectMansory, setSelectMansory] = useState<number | null>(null);
  
  const [categoryIndex , setCategoryIndex] = React.useState(0);
  const { colors } = useTheme();

  const { data: Brandproduct=[], isLoading, isError, error } = useQuery({
    queryKey: ['Brandproduct', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Product ID is undefined');
      }
      return fetchBrandsProduct(id);
    },
    staleTime: Infinity,
  })
  const handleSelect = (index: number) => {
    if (isSelected === index) {
      setIsSelected(null);
      return;
    }
    setIsSelected(index);
  };
  console.log("brandProduct:",  Brandproduct);
  console.log(id);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Image Section */}
      <View style={{ height: '25%', borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: 'hidden' }}>
        <Image
          source={{ uri: imageUrl }}
          resizeMode='cover'
          style={{
            width: '100%',
            height: '100%',
          }}
        />
        <TopBar />
      </View>

      {/* Chips Section */}
     <View
     style ={{
        height: 60,
        paddingVertical : 12,
     }}
     
     >

     <FlatList 
                 horizontal
                 showsHorizontalScrollIndicator={false}
                 contentContainerStyle = {{ 
                     paddingHorizontal: 24,
                     gap: 12,
                 }}
                 data={Categoris}
                 renderItem={({item , index}) => {
                     const isSelected = categoryIndex === index;
                     
                     return (
                         <TouchableOpacity
                         style = {{
                             paddingHorizontal: 12,
                             borderRadius: 52,
                             backgroundColor: isSelected ? colors.primary : 
                             "white" ,
                             borderWidth: isSelected ? 0 : 1,
                             borderColor: colors.border,
                             justifyContent: 'center',
                             
                         }}
                         
                         onPress={() => setCategoryIndex(index)} 
                         >
                         <Text
                             style = {{ 
                                 color: isSelected ? 'white' : colors.text,
                                 fontWeight: '600',
                                 paddingHorizontal: 24,
                                 paddingVertical: 8,
     
                             }}
                         >{item}</Text>
                     </TouchableOpacity>
     
                     )
                 }
                     
                     
                 }
     
                 />
     </View>

               {/* // Masonry List Section */}
               {/* <MasonryList
  data={Brandproduct}
  keyExtractor={(item) => item.id}
  contentContainerStyle = {{
    paddingHorizontal : 24,
    gap: 12,
  }}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  renderItem={({item , i} : any) => {

    const isSelected = selectMansory === i;

    return (
        <TouchableOpacity
        onPress={() => {
                navigation.navigate('Details', {
                    id: item.product_id,
                    imageUrl: item.imageUrl,
                    title: item.title,
                    price: item.price.toString(),
                    description: item.description
                })
        }}
        >

       
        <View 
        style = {{
            padding: 6
        }} >
        <View
        style = {{
            paddingHorizontal: 12,
            paddingVertical: 12,
            aspectRatio : i  === 0 ? 1 : 2/3,
            borderRadius: 24,
            position: 'relative',
            overflow : 'hidden',
           padding: 12,
        }}
        >
            <Image source={{uri: item.thumbnail}} 
            style = {[StyleSheet.absoluteFillObject , {
                borderRadius: 24,
                paddingHorizontal: 12,
                paddingVertical: 12,
                
            }]}
            
            />
    
            <View style = {[StyleSheet.absoluteFillObject  , {
                padding : 12
            }]
                
            }>
    
                <View
                style = {{ 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                    
                    
                }}
                >
    
                    <Text style = {{
                        fontSize: 16,
                        fontWeight: '600',
                        color: colors.primary,
                        
                        flex: 1,
                        
                    }}>
    
                       {item.title}
    
                    </Text>
    
                    <TouchableOpacity 
                    style = {{
                        padding: 8,
                        borderRadius: 52,
                        backgroundColor: isSelected ? colors.primary : colors.card,
                        alignItems: 'center',
                        justifyContent: 'center',
                       
                       

                    }}
                    onPress={() => {
                        if(isSelected){
                            setSelectMansory(null);
                            console.log("Unselected");
                            return;
                        }
                        setSelectMansory(i);
                        console.log("Selected");
                        console.log(i);

                    }
                        
                    }
                    >
    
                    
                    <Icons name="favorite" size={24} color={isSelected ? "red" : colors.text} />
                    </TouchableOpacity>


                    
    
                </View>

               

               
    
            </View>

            <View style ={{flex : 1 ,
                justifyContent: 'flex-end',
               
               
            }}>
                    <BlurView intensity={50} 
                   tint='dark'
                    style = {{

                flexDirection: "row",
            backgroundColor: "rgba(0,0,0,0.25)",
            
            alignItems: "center",
            padding: 6,
            borderRadius: 100,
            overflow: "hidden",

                     }}>
                         <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#fff",
                        alignItems: 'center',
                        padding: 6,
                        
                      }}
                      numberOfLines={1}

                    >
                      ${item.price}
                    </Text>

                    <TouchableOpacity
                    style ={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        backgroundColor: "#fff",
                        borderRadius: 52,
                    }}
                    >
                        <Icons name="add-shopping-cart" size={24} color="black" />
                    </TouchableOpacity>
                    </BlurView>

            </View>
            

            
       
            </View>

            </View>
            </TouchableOpacity>

            
    )
        }
    
  }
  
  
  onEndReachedThreshold={0.1}
 
/> */}

<ProductListItem data={Brandproduct} 
  navigation={navigation}
  
/>

     
    </View>
  );
};

export default BrandDetailScreens;
