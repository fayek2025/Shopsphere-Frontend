import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSearchProductsByText, useSearchProductsByImage } from "../api";
import Icons from '@expo/vector-icons/MaterialIcons';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
}

const SearchScreen = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const textSearchMutation = useSearchProductsByText();
  const imageSearchMutation = useSearchProductsByImage();

  const handleSearch = () => {
    if (text.trim()) {
      textSearchMutation.mutate({ text_query: text.trim() });
    } else if (image) {
      imageSearchMutation.mutate(image);
    } else {
      Alert.alert("Input Required", "Please provide a search query or select an image.");
    }
  };

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access the image gallery."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const file = {
        uri,
        type: 'image/jpeg', // or 'image/png'
        name: uri.split('/').pop() || 'image.jpg',
      };
      setImage(file);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Search Product</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search products..."
            value={text}
            onChangeText={setText}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleImagePick} style={styles.imageIcon}>
            <Icons name="photo" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            (textSearchMutation.isLoading || imageSearchMutation.isLoading) && styles.confirmButtonDisabled
          ]}
          onPress={handleSearch}
          disabled={textSearchMutation.isLoading || imageSearchMutation.isLoading}
        >
          <Text style={styles.confirmButtonText}>
            {(textSearchMutation.isLoading || imageSearchMutation.isLoading) ? "Searching..." : "Search"}
          </Text>
        </TouchableOpacity>

        {(textSearchMutation.isLoading || imageSearchMutation.isLoading) && (
          <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
        )}

        {(textSearchMutation.isError || imageSearchMutation.isError) && (
          <Text style={styles.errorText}>
            Error: {textSearchMutation.error?.message || imageSearchMutation.error?.message}
          </Text>
        )}

        {(textSearchMutation.isSuccess || imageSearchMutation.isSuccess) && (
          <FlatList
            data={textSearchMutation.data?.data || imageSearchMutation.data?.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProduct}
            style={styles.productList}
            contentContainerStyle={styles.productListContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.noResultsText}>
                No products found
              </Text>
            }
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  imageIcon: {
    marginLeft: 10,
  },
  confirmButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  confirmButtonDisabled: {
    backgroundColor: "#999",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loader: {
    marginVertical: 20,
  },
  productList: {
    flex: 1,
  },
  productListContent: {
    paddingVertical: 10,
  },
  productContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default SearchScreen;