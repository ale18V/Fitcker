import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Landing = ({ navigation }) => {
  const handleOnPress = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl mb-8 font-bold">Fitness Tracker</Text>
      <TouchableOpacity
        onPress={handleOnPress}
        className="bg-custom-teal px-6 py-2 rounded-lg"
      >
        <Text className="text-white text-lg">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Landing;
