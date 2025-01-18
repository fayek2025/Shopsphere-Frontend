import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking,
  ScrollView,
  FlatList,
} from "react-native";
import { RootStackScreenProps } from "../navigators/RootNavigator";
import Icons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { useCreateOrder } from "../api"; // Assuming you have the createOrder hook

const Payment = ["bkash", "nagad", "rocket", "visa", "mastercard", "paypal", "amex", "cash"];

const ConfirmScreen = ({
  navigation,
  route: {
    params: { totalPrice, cart_id },
  },
}: RootStackScreenProps<"confirmScreen">) => {
  const { colors } = useTheme();
  const [payment, setPayment] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("123 Main Street, Cityville"); // Static for now, you can make this dynamic

  const { mutate: createOrder } = useCreateOrder(); // Hook to create order

  const handlePress = async () => {
    const requestBody = {
      shipping_address: shippingAddress,
      cart_id: cart_id,
    };

    try {
      await createOrder(requestBody); // Trigger the order creation
      Alert.alert("Success", "Order placed successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("OrderSuccessScreen"), // Navigate to success screen
        },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to place the order.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ marginVertical: 32 }}>
        {/* Header Section */}
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 24, paddingVertical: 12 }}>
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
              backgroundColor: colors.primary,
            }}
          >
            <Icons name="arrow-back" size={24} color={"#fff"} />
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "600", color: colors.text }}>Checkout</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView>
        {/* Shipping Address Section */}
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={{ fontWeight: "600" }}>Shipping Address</Text>
          <Text style={{ fontWeight: "600", paddingVertical: 8 }}>Home</Text>
          <Text style={{ color: colors.text }}>{shippingAddress}</Text>
        </View>

        {/* Payment Method Section */}
        <View style={{ paddingHorizontal: 24, paddingVertical: 24 }}>
          <Text style={{ fontWeight: "600", fontSize: 24 }}>Add Payment Method</Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12, marginBottom: 24 }}
          data={Payment}
          renderItem={({ item, index }) => {
            const isSelected = payment === index;
            return (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 12,
                  height: 40,
                  borderRadius: 52,
                  backgroundColor: isSelected ? colors.primary : "white",
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: colors.border,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setPayment(index)}
              >
                <Text style={{ color: isSelected ? "white" : colors.text, fontWeight: "600", paddingHorizontal: 24, paddingVertical: 8 }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Total Section */}
        <View style={{ position: "relative", bottom: 0, left: 0, right: 0, backgroundColor: colors.card }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 24, marginTop: 24, marginBottom: 16, borderRadius: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text, padding: 16 }}>Total</Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text, padding: 16 }}>$ {totalPrice}</Text>
          </View>

          <TouchableOpacity
            onPress={handlePress}
            style={{
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
            // disabled={isLoading}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ConfirmScreen;
