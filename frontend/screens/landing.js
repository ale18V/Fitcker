import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Landing = ({ navigation }) => {
  const handleOnPress = () => {
    navigation.navigate("SignUp");
  };
  return (
   
    <View className="flex-1">
       <LinearGradient
    colors={["rgba(56, 163, 165, 0.25)", "rgba(128, 237, 153, 0.75)"]}
    style={{ flex: 1 , justifyContent: "center", alignItems: "center" }}  
    >
      <Text className="text-2xl mb-8 font-bold">Fitness Tracker</Text>
      <TouchableOpacity
        onPress={handleOnPress}
        className="bg-custom-teal px-6 py-2 rounded-lg"
      >
        <Text className="text-white text-lg">Get Started</Text>
      </TouchableOpacity>
      </LinearGradient>
         </View>
      
  );
};

export default Landing;
