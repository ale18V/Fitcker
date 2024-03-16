import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import MaskedView from '@react-native-community/masked-view';

export default function Profile({ navigation, profile, setIsAuthorized }) {
  const { username } = profile;
  const [image, setImage] = useState(null);
  const [defaultPic, setDefaultPic] = useState(true);

  const handleLogout = () => {
    setIsAuthorized(false);
  };
  const navigateToInfo = () => {
    navigation.navigate("User Information");
  };
  const navigateToNotif = () => {
    navigation.navigate("Notification Settings");
  };
  const navigateToBiometrics = () => {
    navigation.navigate("Biometrics");
  };


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setDefaultPic(false);
    }
    else {
      setImage(null);
      setDefaultPic(true);
    }
  };

  return (
    <View className="flex flex-1 mx-10 justify-center items-center">



      <TouchableOpacity onPress={pickImage} style={{
        marginTop: 75, marginLeft: 10,
        height: 80,
        width: 80,
        borderRadius: 40, overflow: "hidden",
      }}>
        {image && <Image source={{ uri: image }} style={{
          height: 75,
          width: 75,
          borderRadius: 35,
        }} />}
        {defaultPic && <Image source={require("../assets/account.png")} style={{
          height: 75,
          width: 75,
          borderRadius: 35,
        }} />}
        {/* <MaterialCommunityIcons name="account-circle" size={80} /> */}
      </TouchableOpacity>

      <Text className="font-bold text-2xl mb-10 mx-5">{username}</Text>



      {/*       <TouchableOpacity onPress={pickImage}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {defaultPic && <Image source={require("../assets/account.png")} style={{ width: 80, height: 80 }} />}
      {<MaterialCommunityIcons name="account-circle" size={80} />}
      </TouchableOpacity>
      <Text className="font-bold text-2xl mb-10">{username}</Text> */}
      <View className="w-full">

        <TouchableOpacity onPress={navigateToInfo}>
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

        <TouchableOpacity onPress={navigateToNotif}>
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

        <TouchableOpacity onPress={navigateToBiometrics}>
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
        className="bg-red-500 px-4 py-2 rounded-lg mt-10 mx-auto mb-10"
        onPress={handleLogout}
      >
        <Text className="text-white text-center">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}



