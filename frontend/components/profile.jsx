import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import UserInfo from "./userInfo";

export default function Profile({ profile, setIsAuthorized }) {
  const { username, email, gender, DoB } = profile;
  const [showUserInfo, setShowUserInfo] = useState(false);

  const handleLogout = () => {
    setIsAuthorized(false);
  };

  const navigateToUserInfo = () => {
    setShowUserInfo(true);
  };
  const navigateBack = () => {
    setShowUserInfo(false);
  };
  if (showUserInfo) {
    return <UserInfo navigateBack={navigateBack} />;
  }

  return (
    <View className="flex flex-1 mx-10 justify-center items-center">
      <MaterialCommunityIcons name="account-circle" size={80} />
      <Text className="font-bold text-2xl mb-10">{username}</Text>
      <View className="w-full">
        
        <TouchableOpacity onPress={navigateToUserInfo} >
          <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
          className="flex-row items-center p-4 rounded-xl justify-between mb-4"
          >
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="information" size={28} />
            <Text className="font-bold ml-2">User Info</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={28} />
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
          className="flex-row items-center p-4 rounded-xl justify-between mb-4"
          >
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="bell" size={28} />
            <Text className="font-bold ml-2">Notification Settings</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={28} />
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
          className="flex-row items-center p-4 rounded-xl justify-between"
          >
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="scale-bathroom" size={28} />
            <Text className="font-bold ml-2">Biometrics</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={28} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded-lg mt-10 mx-auto"
        onPress={handleLogout}
      >
        <Text className="text-white text-center">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
