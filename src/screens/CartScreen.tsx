import { View, Text , SafeAreaView , TouchableOpacity } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../navigators/RootNavigator'
import Icons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import CartItems from '../components/CartItems';
import { ScrollView, TextInput } from 'react-native';
const CartScreen = ({navigation} : RootStackScreenProps<"CartScreen">) => {
    const {colors}= useTheme();
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
                    
                    >Shoping Cart</Text>
                </View>
                   
            </View>
            
            

                  
            

        
        </SafeAreaView>
        <ScrollView>
                <View>
                <CartItems imageUri='https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
                    title='Product Title'
                    description='Product Description'
                    price='100'
                    onPress={()=>{}}

                    />

        <CartItems imageUri='https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
                    title='Product Title'
                    description='Product Description'
                    price='100'
                    onPress={()=>{}}

                    />

<CartItems imageUri='https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
                    title='Product Title'
                    description='Product Description'
                    price='100'
                    onPress={()=>{}}

                    />

<CartItems imageUri='https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
                    title='Product Title'
                    description='Product Description'
                    price='100'
                    onPress={()=>{}}

                    />

<CartItems imageUri='https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
                    title='Product Title'
                    description='Product Description'
                    price='100'
                    onPress={()=>{}}

                    />
                </View>

                <View
                 style = {{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 24,
                    marginTop: 24,
                    marginBottom: 16,
                    backgroundColor: colors.card,
                    borderRadius: 16,
                 }}
                >
                    <TextInput 
                    placeholder='Enter Promo Code'
                    style = {{
                        flex: 1,
                        padding: 16,
                        
                        borderRadius: 16,
                    }}
                    
                    />

                    <TouchableOpacity
                    style = {{
                        width : 80,
                        height: 40,
                        backgroundColor: colors.primary,
                        borderRadius: 8,
                        marginRight: 16,
                        alignItems : 'center',
                        justifyContent: 'center',
                        marginVertical: 16,
                    }}
                    
                    >

                      <Text style = {{ 
                          color: 'white',
                          fontWeight: '600',
                          fontSize:16
                          
                      }}>Apply</Text>
                    </TouchableOpacity>

                </View>
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
                      onPress={() => navigation.navigate('confirmScreen')}
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
                          Review Address and Payment
                        </Text>
                        </TouchableOpacity>                   
                    </View>
                  

                
       </ScrollView>

        
     
    </View>
  )
}

export default CartScreen