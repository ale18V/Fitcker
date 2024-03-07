import React from "react";
import { Text, View, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function UserInfo() {
  return (
    <View className="flex-1 mx-10 justify-center items-center">
      <View className="w-full">
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
          >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Email: </Text>
            <Text>email@gmail.com </Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
          >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Username: </Text>
            <Text>username </Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
          >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Gender: </Text>
            <Text>female </Text>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
          >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Date of Birth: </Text>
            <Text>0000-00-00 </Text>
          </View>
        </LinearGradient>

      </View>
    </View>
  );
}
