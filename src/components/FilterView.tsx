import { View, Text , TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import SlideHandler from './SlideHandler';
import Chip from './Chip';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from '@expo/vector-icons/MaterialIcons';

const Min = 0;
const Max = 1000;






const COLORS = [
    {
      color: "#D93F3E",
      label: "Red",
      itemCount: 4,
    },
    {
      color: "#FFFFFF",
      label: "White",
      itemCount: 2,
    },
    {
      color: "#58AB51",
      label: "Green",
      itemCount: 6,
    },
    {
      color: "#FB8C1D",
      label: "Orange",
      itemCount: 10,
    },
    {
      color: "#D3B38D",
      label: "Tan",
      itemCount: 10,
    },
    {
      color: "#FDE737",
      label: "Yellow",
      itemCount: 10,
    },
  ];
  
  type FilterViewProps = { 
    handleCloseModal: () => void;
  }

const FilterView = ({handleCloseModal} : FilterViewProps) => {
    const [minPrice , setMinPrice] = React.useState(50);
    const [maxPrice , setMaxPrice] = React.useState(1000);
    const insets = useSafeAreaInsets();


    const {colors} = useTheme();
  return (
    <View style = {{flex : 1}}>
        <BottomSheetScrollView >

        
        <View 
        style = {{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24,
            paddingVertical: 12,    
            
        }}>
            <Text style = {{flex : 1 , 
                fontSize: 24,
                fontWeight: '600'
            }}>Filter</Text>
            <Text>Clear</Text>



        </View>

        {/* Range Selector */}

        <View style = {{paddingHorizontal: 24 , marginBottom: 15}}>
            <View style = {{marginBottom: 15}}>
            <Text style = {{marginBottom : 8}}>Price Range</Text>
            </View>

            <View style = {{
                
                height : 1,
                width : '100%',
                backgroundColor: colors.border }}>
                    
                    <View 
                    style = {{ 
                         height: '100%',
                         left : `${(minPrice*100)/Max}%`,
                         width: `${((maxPrice - minPrice)/Max)*100}%`,
                         backgroundColor: colors.primary,
                        
                    }}
                    
                    />

                    {/* SLide handler */}
                    <View style = {{
                        position: 'absolute',
                        left: `${(minPrice*100)/Max}%`,
                    }}>
                            <SlideHandler />
                            

                    </View>


                    <View style = {{
                        position: 'absolute',
                        left: `${(maxPrice*100)/Max}%`,
                    }}>
                        <SlideHandler />
                    </View>

                </View>

                <View />



                <View
                    style  ={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                       position: 'relative',
                        marginTop: 15,
                    }}
                >

                    <Text>${Min}</Text>
                    <Text>${Max}</Text>

                </View>
            
        </View>

        {/* Sports  */}
        <View 
            style = {{ 
                paddingHorizontal: 24,
                marginBottom: 15,
            }}
        >
            <Text style = {{marginBottom: 15 , fontWeight : '600'}}>Sports</Text>
            <View style = {{
                 flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 10,
            }}>
                {
                    
                    new Array(20).fill("").map((_,index) => {

    const [isSelected , setIsSelected] = React.useState<number | null>(null);
    const handleSelect = (index: number) => {
        if(isSelected === index){
            setIsSelected(null);
            return;
        }
        setIsSelected(index);
      };
                        
                        
                        return (

                           <Chip isSelected = {isSelected} handleSelect = {handleSelect} index = {index} label='Item' 
                            />
                            
                        )
                    })
                }

            </View>


        </View>

        {/* Color Section */}


        <View style = {{paddingHorizontal: 24}}>

            <Text style = {{
                fontWeight: '600',
                fontSize: 16,
            }}>
                Color
            </Text>

            <View
            style = {{ 
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 10,
                marginTop: 15,
            }}
            
            >
                { COLORS.map((color , index) => { 

                    const [isSelected , setIsSelected] = React.useState<number | null>(null);
                    const handleSelect = (index: number) => {
                        if(isSelected === index){
                            setIsSelected(null);
                            return;
                        }
                        setIsSelected(index);
                      };
                  return ( 
                    <Chip isSelected = {isSelected} handleSelect = {handleSelect} index = {index} label={color.label}
                    left={
                        <View
                          style={{
                            backgroundColor: color.color,
                            width: 16,
                            height: 16,
                            borderRadius: 8,
                            flexDirection: 'row',
                          }}
                        />
                      }


                    
                    />
                  )  


                })}
             

            </View>


        </View>

        <View
        style = {{ 
            padding : 24,
            paddingBottom: 24 + insets.bottom,
            
        }}
        >
            <TouchableOpacity
            style = {{
                backgroundColor: colors.primary,
                paddingVertical: 16,
                borderRadius: 32,
                height: 64,
                alignItems: 'center',
                justifyContent: 'space-between',
                
                paddingHorizontal: 24,
            }}

            onPress={handleCloseModal}
            >
                <Text style = {{
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 20,
                }}>Apply Filter</Text>

<View
            style={{
              backgroundColor: colors.card,
              width: 40,
              aspectRatio: 1,
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 12,
              right: 12,
              bottom: 12,
            }}
          >
            <Icons name="arrow-forward" size={24} color={colors.text} />
          </View>
            </TouchableOpacity>
        </View>

        </BottomSheetScrollView>
        {/* Apply Filter */}

       
       
        
        
    </View>

    
  )
}

export default FilterView