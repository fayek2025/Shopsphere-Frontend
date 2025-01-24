import { View, Text, TouchableOpacity, Image ,FlatList } from 'react-native'
import React, { useState , useRef , useCallback , useMemo } from 'react'
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
import { fetchBrandsPopularProduct } from '../api'
import PopularProduct from '../components/popular_Product'
import { ScrollView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheetModal from '@gorhom/bottom-sheet'
import CustomBackdrop from '../components/CustomBackdrop'
import FilterView from '../components/FilterView'


const BrandDetailScreens = ({
  navigation,
  route: { params: {id , imageUrl, title, price } },
}: RootStackScreenProps<"BrandScreenDetails">) => {
  const [isSelected, setIsSelected] = React.useState<number | null>
  (null);
  const [selectMansory, setSelectMansory] = useState<number | null>(null);
  
  const [categoryIndex , setCategoryIndex] = React.useState(0);
  const { colors } = useTheme();

  const { data: Brandproduct=[] } = useQuery({
    queryKey: ['Brandproduct', id , false],
    queryFn: () => {
      if (!id) {
        throw new Error('Product ID is undefined');
      }
      return fetchBrandsProduct(id , false );
    },
    staleTime: Infinity,
  })


  const { data: popular=[], isLoading, isError, error } = useQuery({
    queryKey: ['brandPopularProducts', id , false],
    queryFn: () => {
      if (!id) {
        throw new Error('Product ID is undefined');
      }
      return fetchBrandsPopularProduct(id , true );
    },
    staleTime: Infinity,
  })

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

  const snapPoints = useMemo(() => ['85%', '95%'], []);


  console.log("Popular:", popular);
  const handleSelect = (index: number) => {
    if (isSelected === index) {
      setIsSelected(null);
      return;
    }
    setIsSelected(index);
  };
  console.log("brandProduct:",  Brandproduct);
  console.log(id);
  const handlePress = () => {
    navigation.navigate('CartScreen');
  }
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
        <TopBar handlePress={handlePress} />
       
      </View>

          
             
      <ScrollView>

        <View>

        <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: 8,
              borderRadius: 52,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: colors.border,
              borderWidth: 1,
              aspectRatio: 1,
              width: 40,
              height: 40,



            }}
            onPress={openFilterModal}
          >

            <Icons name="tune" size={24} color="white" />
          </TouchableOpacity>

        </View>

  <Text style = {{
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  }}
  >Popular Products</Text>
  <PopularProduct data={popular} 
  navigation={navigation}
  
/>

<View 
  style ={{
    marginTop: 24,
  }}
>
  <Text
  style = {{
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  }}>
    All Products
  </Text>
</View>
<ProductListItem data={Brandproduct} 
  navigation={navigation}
  
/>

</ScrollView>

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
          enablePanDownToClose={true}

          backdropComponent={(props) => <CustomBackdrop {...props} />}
          backgroundStyle={{
            borderRadius: 24,
            backgroundColor: colors.card,
          }}
          handleIndicatorStyle={{
            backgroundColor: colors.primary,
          }}
        >
          <BottomSheetScrollView style={{ flex: 1 }}>

            <FilterView handleCloseModal={handleCloseModal} />



          </BottomSheetScrollView>
        </BottomSheetModal>
    </View>
    
  );
};

export default BrandDetailScreens;
