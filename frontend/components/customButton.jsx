import { TouchableOpacity, Text, View } from "react-native";
import React from "react";

export default function customButton({ title, onPress }) {
  return (
    <View className="flex items-center justify-center">
      <TouchableOpacity className=" bg-custom-teal rounded-lg py-2 px-4 w-32">
        <Text onPress={onPress} className="text-center text-white font-bold">
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
