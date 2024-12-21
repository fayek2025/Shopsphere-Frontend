import { View, Text , SafeAreaView , TouchableOpacity } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../navigators/RootNavigator'
import Icons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import CartItems from '../components/CartItems';
import { ScrollView, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const Payment = ['bkash', 'nagad', 'rocket', 'visa', 'mastercard', 'paypal', 'amex', 'cash'];

const confirmScreen = ({navigation} : RootStackScreenProps<"confirmScreen">) => {
    const {colors}= useTheme();
    const [payment , setPayment] = React.useState(0);
  return (
    <View style ={{flex:1}}>
        <SafeAreaView style = {{marginVertical: 32}}>
            {/* Header Section */}
           
            <View 
            style = {{
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
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: "#fff",
              backgroundColor : colors.primary,
              
            }}
          >
            <Icons name="arrow-back" size={24} color={"#fff"} />
          </TouchableOpacity>

                <View style = {{flex: 1
                    ,flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                <Text
                    style ={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: colors.text,
                    }}
                    
                    > Checkout</Text>
                </View>
                   
            </View>
            
            

                  
            

        
        </SafeAreaView>
        <ScrollView>
                <View style = {{ 
                    paddingHorizontal: 24,
                }}>
                <Text
                style = {{
                    fontWeight: '600',
                }}
                >
                    Shipping Address
                </Text>
                <Text 
                style ={{fontWeight: '600',
                    paddingVertical: 8,


                }}
                > Home</Text>

                <Text style = {{
                    color : colors.text,
                }}>
                    123 Main Street

                </Text>
        
                </View>

                <View
                style = {{
                    paddingHorizontal: 24,
                    paddingVertical: 24,
                }}
                >
                    <Text
                    style = {{
                        fontWeight: '600',
                        fontSize: 24,

                    }}
                    
                    >
                        Add Payment Method
                    </Text>
                </View>

              


                <FlatList 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle = {{ 
                                paddingHorizontal: 24,
                                gap: 12,
                                marginBottom: 24,
                            }}
                            data={Payment}
                            renderItem={({item , index}) => {
                                const isSelected = payment === index;
                                
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
                                    
                                    onPress={() => setPayment(index)} 
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
                         {/* TOtal section */}

                  <View style = {{ 
                      position: 'relative',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      
                      backgroundColor: colors.card,
                      
                  }}>
                      <View
                      style = {{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginHorizontal: 24,
                          marginTop: 24,
                          marginBottom: 16,
                          
                          borderRadius: 16,
                      }}
                      >
                          <Text style = {{
                              fontSize: 16,
                              fontWeight: '600',
                              color: colors.text,
                              padding: 16,
                          }}>Total</Text>

                          <Text style = {{
                              fontSize: 16,
                              fontWeight: '600',
                              color: colors.text,
                              padding: 16,
                          }}>$100</Text>
                      </View> 

                      <TouchableOpacity
                      onPress={() => navigation.navigate('TabsStack' , {screen: 'Home'})}
                        style ={{
                          backgroundColor: colors.primary,
                          height: 64,
                          borderRadius: 16,
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          flexDirection: "row",
                          padding: 12,
                          marginHorizontal: 24,
                          marginVertical: 16,
                           
                        }}
                      >
                        <Text style ={{
                            color: 'white',
                            fontWeight: '600',
                            
                        }}>
                          Confirm Payment
                        </Text>
                        </TouchableOpacity>                   
                    </View>
                  

                
       </ScrollView>

        
     
    </View>
  )
}

export default confirmScreen