import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function ProfileTab({ setIsAuthorized }) {
  const handleLogout = () => {
    setIsAuthorized(false);
  };
  return (
    <View className="flex-1 items-center justify-center items-center">
      <Text className="text-custom-teal">Profile Tab!</Text>
      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded-lg m-5"
        onPress={handleLogout}
      >
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
