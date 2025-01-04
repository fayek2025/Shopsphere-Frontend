import { View, Text, SafeAreaView , Image, TouchableOpacity, TextInput, StyleSheet, Modal} from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Icons from '@expo/vector-icons/MaterialIcons'
import Card from '../components/Card'
import { FlatList } from 'react-native'
import MasonryList from 'reanimated-masonry-list';
import { useState , useRef , useCallback , useMemo } from 'react'
import { BlurView } from 'expo-blur'
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheetModal from '@gorhom/bottom-sheet'
import CustomBackdrop from '../components/CustomBackdrop'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import FilterView from '../components/FilterView'
import { TabsStackScreenProps } from '../navigators/TabsNavigator'
import { addTodo, fetchTodos } from '../api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/auth/useAuthStore'


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

const HomeScreens = ({navigation} : TabsStackScreenProps<"Home">) => {
  const accessToken = useAuthStore.getState().refreshToken;
    const queryClient = useQueryClient();
     const [search, setSearch] = useState('');
    const { data: todos = [], isLoading, isError, error } = useQuery<Todo[]>({
        queryKey: ['todos', { search }],
        queryFn: () => fetchTodos(search),
        staleTime: Infinity,
      });
      console.log(todos);
    const {colors} = useTheme();
    const [categoryIndex , setCategoryIndex] = React.useState(0)
    const [selectMansory, setSelectMansory] = useState<number | null>(null);

    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [isModalVisible, setIsModalVisible] = useState(true);

  // callbacks
  const openFilterModal = useCallback(() => {
    setIsModalVisible(true);
    bottomSheetRef.current?.expand();
    console.log("Open Filter Modal");
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
    bottomSheetRef.current?.close();
  }, []);

  const snapPoints = useMemo(() => ['85%','95%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

    console.log("HomeScreen")
    console.log(accessToken);
  return (
   
        <ScrollView>
             <SafeAreaView
        style = {{
            paddingVertical: 24, gap: 24,
        }}
    >

        <View style = {{
        paddingHorizontal: 24,
        paddingVertical: 24,
        flexDirection: 'row', 
        alignItems: 'center', 
        gap:8
    
    }}>
        <Image source = {{uri: AVATAR_URL}} style = {{
            width: 52, 
            height: 50,
            aspectRatio: 1, 
            borderRadius: 25}}  />
            <View style= {{flex : 1}}>
            <Text style ={{fontSize:18 , fontWeight:"600" , marginBottom:8,
               color: colors.text 
            }}
            numberOfLines={1}
            
            >Hi, Fayek </Text>
            <Text > Discover fashion that suits your styles</Text>
            </View>
            <View 
            style = {{ 
                height : 24,
                width : 1,
                backgroundColor: colors.text,
                marginRight: 8


            }}
            />
            <TouchableOpacity
            onPress={() => navigation.navigate('CartScreen')}
            style = {{
                backgroundColor: colors.card,
                padding: 8,
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
    <View style = {{ 
                flexDirection: 'row',
                paddingHorizontal: 24,
                marginBottom: 12,
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

                <TouchableOpacity
                style = {{
                    backgroundColor: colors.primary,
                padding: 8,
                borderRadius: 52,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: colors.border,
                borderWidth: 1,
                aspectRatio: 1



                 }}
                onPress={openFilterModal}
                >

                    <Icons name="tune" size={24} color= "white" />
                </TouchableOpacity>


            </View>

            {/* Grid View Section */}

            <View style = {{paddingHorizontal: 24}}>

                    {/* text section */}
                    <View style = {{ 
                        flexDirection: 'row',
                        
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text style = {{fontSize : 24 , fontWeight : "700" }}>
                            New Collection
                        </Text>
                        <TouchableOpacity>
                            <Text style = {{color: colors.primary, fontWeight: '600'}}>See All</Text>
                        </TouchableOpacity>

                    </View>

                    <View 
                    style = {{ 
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
                        <View style = {{flex: 1 , gap: 12}}>
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


                    </View>


            </View>
            
            {/* // Categories Section */}
            <View>

              
            </View>
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
                        height: 40,
                        borderRadius: 52,
                        backgroundColor: isSelected ? colors.primary : 
                        "white" ,
                        borderWidth: isSelected ? 0 : 1,
                        borderColor: colors.border,
                        alignItems: 'center',
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

            {/* // Masonry List Section */}
            <MasonryList
  data={todos}
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
      onPress={() => navigation.navigate('Details', {
          id: item.product_id,
          imageUrl: item.thumbnail,
          title: item.title,
         
      })}
      
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
                      $ {item.price}
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
 
/>

<BottomSheetModal
        snapPoints={snapPoints}
        index={-1}
        ref={bottomSheetRef}
        onChange={
            (index) => {
                
                console.log("Current State" + " " + index);
                if (index === 0) {
                  // Programmatically dismiss when swiped down
                  bottomSheetRef.current?.close();
                  console.log(index);
                }
              }
            
            
            }
        enablePanDownToClose = {true}
        
        backdropComponent={(props) => <CustomBackdrop {...props} />}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.card,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <BottomSheetScrollView style={{flex:1}}>
  
         <FilterView handleCloseModal={handleCloseModal} />
      
      
       
       </BottomSheetScrollView>
      </BottomSheetModal>
        


</SafeAreaView>

                


        </ScrollView>

        
        
  
        
        
        

    

    
  )
}

export default HomeScreens