import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Profile from "../components/profile";

export default function ProfileTab({ setIsAuthorized }) {
  const handleLogout = () => {
    setIsAuthorized(false);
  };
  return (
    <View className="flex ">
      <Profile
        profile={{
          username: "username",
        }}
      />
      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded-lg mt-10 mx-auto"
        onPress={handleLogout}
      >
        <Text className="text-white text-center">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
