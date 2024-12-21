import { View, Text, SafeAreaView , TextInput , Image ,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons';
import BrandCards from '../components/BrandCards';
import { FlatList } from 'react-native-gesture-handler';
import { TabsStackScreenProps } from '../navigators/TabsNavigator';
import { fetchBrands } from '../api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Brand } from '../entities/Todo';

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
        "https://images.unsplash.com/photo-1556217477-d325251ece38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1020&q=80",
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

  const AVATAR_URL ="https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80";



const BrandScreen = ({navigation} : TabsStackScreenProps<"Brand">) => {

  const queryClient = useQueryClient();
     const [search, setSearch] = useState('');
    const { data: brand , isLoading, isError, error } = useQuery({
        queryKey: ['todos'],
        queryFn:  fetchBrands,
        staleTime: Infinity,
      });
      console.log("brand");
      console.log("brand",brand );

    const {colors} = useTheme();
  return (
    <SafeAreaView
        style = {{
            paddingVertical: 36, gap: 12,
        }}
    >

        
              {/* Search Bar Section */}
  

            {/* card section */}

            <View style = {{ 
                paddingHorizontal : 24,
                
            }}> 
           
            <FlatList 
                data = {brand}
                keyExtractor = {(item, index) => index.toString()}
                numColumns = {1}
                showsVerticalScrollIndicator = {false}

                renderItem = {({item}) => {
                    return (
                      <TouchableOpacity
                      onPress={()=>{navigation.navigate('BrandScreenDetails', {
                        id: item.id,
                        imageUrl: item.logo,
                        
                      })
                      }}
                      
                      >

                      
                        <BrandCards 
                        imageUri = {item.logo}
                        title = {item.name}
                        description = {item.description}
                        />

                      </TouchableOpacity>
                    )
                }}
                
                ListHeaderComponent={
                    <View style = {{ 
                        flexDirection: 'row',
                        paddingHorizontal: 12,
                        
                        gap:24 
                    }}>
        
        
                        <TouchableOpacity
                        style = {{
                            flex: 1,
                            height: 52,
                            borderWidth: 1,
                            borderColor: colors.border,
                            padding: 8,
                            borderRadius: 52,
                            flexDirection: 'row',
                            alignItems: 'center',
                            
                            
                        }}
                        >
        
                            <Icons name="search" size={24} color={colors.text}
                                style = {{opacity: 0.5}}
                            />
                            <TextInput
                            placeholder='Search'
                            style = {{
                                flex: 1,
                                paddingVertical: 8,
                                color: colors.text,
                                fontSize: 16,
                                fontWeight: '500'
                            }}
                            />
        
                            
                        </TouchableOpacity>
        
                       
        
        
                    </View>
        
                    
                }
                />

            </View>
                
            

            </SafeAreaView>
  )
}

export default BrandScreen