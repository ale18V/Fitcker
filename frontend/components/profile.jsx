import React from 'react';
import { Text, View } from 'react-native';
import profileSvg from '../assets/profile.svg';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
  return (
    
    <View className="flex-1 mx-10 justify-center max-h-60 justify-between mt-20">
      
      <LinearGradient colors={['rgba(56, 163, 165, 0.5)', 'rgba(128, 237, 153, 0.5)']} className="flex-row items-center p-4 rounded-xl justify-between">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="information" size={28} />
          <Text className="font-bold ml-2">User Info</Text>
        </View>
        <MaterialCommunityIcons className="p-5" name="arrow-right-drop-circle-outline" size={28} />
      </LinearGradient>

      
      <LinearGradient colors={['rgba(56, 163, 165, 0.5)', 'rgba(128, 237, 153, 0.5)']} className="flex-row items-center p-4 rounded-xl justify-between">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="bell" size={28} />
          <Text className="font-bold ml-2">Notification Settings</Text>
        </View>
        <MaterialCommunityIcons name="arrow-right-drop-circle-outline" size={28} />
      </LinearGradient>

      
      <LinearGradient colors={['rgba(56, 163, 165, 0.5)', 'rgba(128, 237, 153, 0.5)']} className="flex-row items-center p-4 rounded-xl justify-between">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="scale-bathroom" size={28} />
          <Text className="font-bold ml-2">Biometrics</Text>
        </View>
        <MaterialCommunityIcons name="arrow-right-drop-circle-outline" size={28} />
      </LinearGradient>

      

    </View>
  );
}

