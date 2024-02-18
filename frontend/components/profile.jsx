import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile({ profile }) {
  const { username } = profile;
  return (
    <View className="mx-10 mt-32 items-center">
      <MaterialCommunityIcons name="account-circle" size={80} />
      <Text className="font-bold text-2xl mb-16">{username}</Text>

      <View className="w-full">
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
          className="flex-row items-center p-4 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="information" size={28} />
            <Text className="font-bold ml-2">User Info</Text>
          </View>
          <MaterialCommunityIcons
            name="arrow-right-drop-circle-outline"
            size={28}
          />
        </LinearGradient>

        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
          className="flex-row items-center p-4 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="bell" size={28} />
            <Text className="font-bold ml-2">Notification Settings</Text>
          </View>
          <MaterialCommunityIcons
            name="arrow-right-drop-circle-outline"
            size={28}
          />
        </LinearGradient>

        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
          className="flex-row items-center p-4 rounded-xl justify-between"
        >
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="scale-bathroom" size={28} />
            <Text className="font-bold ml-2">Biometrics</Text>
          </View>
          <MaterialCommunityIcons
            name="arrow-right-drop-circle-outline"
            size={28}
          />
        </LinearGradient>
      </View>
    </View>
  );
}
