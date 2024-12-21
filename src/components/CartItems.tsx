import { View, Text , Image, StyleSheet} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';


type CartItemsProps = { 
    imageUri: string;
    title: string;
    description: string;
    price: string;
    onPress: () => void;
}

const CartItems = ({imageUri , title , description , price } : CartItemsProps) => {
    const {colors} = useTheme();
    const [count, setCount] = React.useState(1);
  return (
    
    <View>

  
        
        <View style = {{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
           
            borderRadius: 16,
            marginBottom: 16,
            marginHorizontal: 24,
        
        }}>

                <Image source = {{uri: imageUri}} 
                style = { {
                    width: 100,
                    aspectRatio : 1,
                    borderRadius: 16,
                    shadowColor: '#171717',
                    shadowOffset: {width: -2, height: 4},
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                     

                }}
                resizeMode='cover'
                />  

                    <View style = {{marginHorizontal: 16 , flex : 1}}>
                        <Text style = {{fontSize: 16, fontWeight: '600'}}>{title}</Text>
                        <Text style = {{fontSize: 14, color: 'gray'}}>{description}</Text>
                        <Text style = {{fontSize: 16, fontWeight: '600'}}>{price}</Text>
                    </View>

                    
                    {/* Remove  */}
                    <View>

                    <View 
                    style = {{
                       
                        
                    }}
                    
                    >
                    <TouchableOpacity
                    style = {{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                        borderRadius: 100,
                        paddingHorizontal: 24,
                        justifyContent : 'flex-end',
                        left : 16,
                        position : 'relative',
                        marginVertical : 20,
                        bottom : 20,
                    }}
                    
                    >
                        <Icons name='delete' size={24} color={colors.text} />
                    </TouchableOpacity>
                    
                    </View>
                    
                    
                    
                    
                    
                    
                    
                    {/* Add or remove items */}

                    <View
            style ={{
              flexDirection : 'row',
              alignItems : 'center',
              gap:6,
              borderRadius : 100,
             
              padding : 4,
              
              

            }}>

              

                <TouchableOpacity
                onPress={() => setCount((count) => Math.max(0, count - 1))}
                style = {{
                  backgroundColor : colors.background,
                  width : 34,
                  aspectRatio : 1,
                  alignItems : 'center',
                  justifyContent : 'center',
                  borderRadius : 34,
                  borderWidth : 1,
                  borderColor : colors.text
                }}
                >
                  <Icons name='remove' size={20} colors = {"white"} />
                </TouchableOpacity>

                <Text style = {{fontWeight : '600' , fontSize : 16 , color : colors.text}}>
                    {count}
                </Text>


                <TouchableOpacity
                onPress={() => setCount((count) => Math.max(0, count + 1))}
                style = {{
                  backgroundColor : colors.primary,
                  width : 34,
                  aspectRatio : 1,
                  alignItems : 'center',
                  justifyContent : 'center',
                  borderRadius : 34
                }}
                >
                  <Icons name='add' size={20} color = '#fff' />
                </TouchableOpacity>

             

            </View>
            
            </View>


        </View>


                <View
                
                style = {{ 
                   
                   
                    
                    
                    paddingHorizontal : 24,
                    paddingVertical : 8,
                }}>
                <View 
        style = {{ 
            
            backgroundColor : colors.primary,
            width : '100%',
            height : 1,
            
        }}
        
        />
                </View>
        
        </View>
  )
}

export default CartItems