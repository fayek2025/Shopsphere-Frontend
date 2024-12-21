import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

interface ChipProps {
    handleSelect: (index: number) => void;
    index: number;
    isSelected: number | null;
    label : string;
    left ?: React.ReactNode;
  }

 const Chip: React.FC<ChipProps> = ({ handleSelect, index, isSelected , label , left}) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        backgroundColor: isSelected === index ? colors.primary : colors.background,
        paddingVertical: 8,
        borderRadius: 100,
        flexDirection: 'row',
      }}
    >
      {!!left && <View style={{ marginRight: 8 }}>{left}</View>}
      <TouchableOpacity onPress={() => handleSelect(index)}>
        <Text
          style={{
            color: isSelected === index ? colors.background : colors.text,
          }}
        >
          {label} {index}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chip;