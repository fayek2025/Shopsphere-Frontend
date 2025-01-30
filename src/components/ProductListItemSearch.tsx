import React  from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MasonryList from 'reanimated-masonry-list';
import { useTheme } from '@react-navigation/native';
import useFavoriteStore from '../store/useFavorite.ts/useFavourite';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useCreateWishlist } from '../api';
import { useEffect } from 'react';

type ProductListItemSearchProps = { 
    navigation?: any;
    handleFavourite?: (id: number) => void;
    data?: any[];
  };

type Product = {
    id: string | number;
    product_id: string | number;
    thumbnail: string;
    title: string;
    description: string;
    price: number;
  };

const ProductListItemSearch = ({ navigation, data }: ProductListItemSearchProps) => {
    const createWishlistMutation = useCreateWishlist();
    const { colors } = useTheme();
    const { favorites, toggleFavorite } = useFavoriteStore();
    const fetchAndSetFavorites = useFavoriteStore((state) => state.fetchAndSetFavorites);
  useEffect(() => {
    fetchAndSetFavorites();
  }, [fetchAndSetFavorites]);
    

    return (
        <MasonryList
            data={data}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: any) => {
                
    const handleFavorite = () => {
        if (!favorites.has(item.product_id)) {
          createWishlistMutation.mutate({ product_id: item.product_id }, {
            onSuccess: (data) => {
              toggleFavorite(item.product_id);
            },
            onError: (error) => {
              console.error('Error creating wishlist item:', error.response?.data || error.message);
            },
          });
        } else {
          navigation.navigate('TabsStack', {
            screen: 'Wish',
          });
        }
      };
                const isFavorited = favorites.has(item.product_id);
                return(
                
                <TouchableOpacity
                    style={styles.cardContainer}
                    onPress={() =>
                        navigation.navigate('Details', {
                            id: item.product_id,
                            imageUrl: item.thumbnail,
                            title: item.title,
                        })
                    }
                >
                    {/* Image Section */}
                    <Image
                        source={{ uri: item.thumbnail }}
                        style={[ styles.productImage]}
                        resizeMode="cover"
                        loading = "eager"
                    />

                    {/* Text Content Section */}
                    <View style={styles.textContent}>
                        <Text style={styles.productTitle} >
                            {item.title}
                        </Text>
                        <Text style={styles.productDescription} numberOfLines={2}>
                            {item.description}
                        </Text>
                        <Text style={styles.productPrice}>
                            $ {item.price}
                        </Text>
                    </View>

                    {/* <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                backgroundColor: 'white',
                                borderRadius: 20,
                                padding: 5,
                            }}
                            onPress={() => handleFavorite()}
                        >
                            <Icons
                                name={isFavorited ? "favorite" : "favorite-border"}
                                size={24}
                                color={isFavorited ? "red" : "black"}
                            />
                        </TouchableOpacity> */}

                    
                </TouchableOpacity>

                
            )}}
            onEndReachedThreshold={0.1}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        marginHorizontal: 12,
        
    },
    cardContainer: {
        flex: 1,
        borderRadius: 16,
        backgroundColor: '#fff',
        overflow: 'hidden',
        marginBottom: 12,
        elevation: 2, // Adds subtle shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginHorizontal: 8,
        
    },
    productImage: {
        
        width: '100%',
        aspectRatio: 1, 
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    textContent: {
        padding: 12,
        paddingHorizontal: 16,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 14,
        fontWeight: '400',
        color: '#333',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
});

export default ProductListItemSearch;
