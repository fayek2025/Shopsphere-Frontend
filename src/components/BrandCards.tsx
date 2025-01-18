import { View, Text , Image, StyleSheet} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';


type BrandCardsProps = { 
    imageUri: string;
    title: string;
    description?: string;
    price?: string;
    onPress?: () => void;
}

const BrandCards = ({imageUri , title , description , price } : BrandCardsProps) => {
    const {colors} = useTheme();
    const [count, setCount] = React.useState(1);
  return (
    
    <View>

  
        
        <View style = {{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 12,
           
            borderRadius: 16,
            marginBottom: 16,
            marginHorizontal: 8 ,
        
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
                    borderWidth: 1,
                    borderColor: colors.border
                     

                }}
                resizeMode='cover'
                />  

                    <View style = {{marginHorizontal: 16 , flex : 1}}>
                        <Text style = {{fontSize: 16, fontWeight: '600'}}>{title}</Text>
                        <Text style = {{fontSize: 14, color: 'gray'}}>{description}</Text>
                        <Text style = {{fontSize: 16, fontWeight: '600'}}>{price}</Text>
                    </View>

                    
                    {/* Remove  */}
                    

                    <View 
                    style = {{
                       
                        
                    }}
                    
                    >

{/* <TouchableOpacity
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
                        <Icons name='favorite' size={24} color={colors.text} />
                    </TouchableOpacity> */}
                    
                        
                    
                    
                    </View>
                    

                    
                    
                    
                    
                    
                    
                    {/* Add or remove items */}

              

              

                

             

            
            
            


        </View>


              
        
        </View>
  )
}

export default BrandCards