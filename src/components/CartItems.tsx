import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

type CartItemsProps = {
  id: number;
  imageUri: string;
  title: string;
  description?: string;
  price: number;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove?: () => void;
};

const CartItems = ({
  id,
  imageUri,
  title,
  description,
  price,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemsProps) => {
  const { colors } = useTheme();
  const totalPrice = (price * quantity).toFixed(2);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        marginHorizontal: 24,
        backgroundColor: colors.card,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      }}
    >
      {/* Product Image */}
      <Image
        source={{ uri: imageUri }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 16,
        }}
        resizeMode="cover"
      />

      {/* Product Details */}
      <View style={{ marginLeft: 16, flex: 1 }}>
        <Text style={{ fontSize: 12, fontWeight: '400', color: colors.text , paddingBottom: 5 }}>
          {title}
        </Text>
        {description && (
          <Text style={{ fontSize: 14, color: 'gray', marginVertical: 4 }}>
            {description}
          </Text>
        )}
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>
          ${totalPrice}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={{ alignItems: 'center' }}>
        {/* Remove Button */}
        {onRemove && (
          <TouchableOpacity
            onPress={onRemove}
            style={{
              marginBottom: 16,
              alignSelf: 'flex-end',
            }}
          >
            <Icons name="delete" size={24} color={colors.text} />
          </TouchableOpacity>
        )}

        {/* Quantity Controls */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* Decrement Button */}
          <TouchableOpacity
            onPress={onDecrement}
            style={{
              backgroundColor: colors.background,
              width: 34,
              height: 34,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 17,
              borderWidth: 1,
              borderColor: colors.text,
            }}
          >
            <Icons name="remove" size={20} color={colors.text} />
          </TouchableOpacity>

          {/* Quantity Display */}
          <Text
            style={{
              fontWeight: '600',
              fontSize: 16,
              color: colors.text,
              marginHorizontal: 8,
            }}
          >
            {quantity}
          </Text>

          {/* Increment Button */}
          <TouchableOpacity
            onPress={onIncrement}
            style={{
              backgroundColor: colors.primary,
              width: 34,
              height: 34,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 17,
            }}
          >
            <Icons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItems;