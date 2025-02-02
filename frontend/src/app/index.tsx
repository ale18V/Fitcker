import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";

const Landing = () => {
  const router = useRouter()
  console.log("ciao")
  return (

    <LinearGradient
        colors={["rgba(56, 163, 165, 0.25)", "rgba(128, 237, 153, 0.75)"]}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
    <View className="flex-1">
        <Image
          source={require("../../assets/icon1.png")}
          style={{ width: 150, height: 150 }}
          className="mt-20 shadow-md"
        />
        <Text className="text-2xl text-teal-700 font-bold mt-5">Fitness Tracker</Text>
        <TouchableOpacity
          onPress={() => router.navigate("/register")}
          className="bg-teal-600 px-6 py-2 rounded-lg mt-40"
        >
          <Text className="text-white text-lg">Get Started</Text>
        </TouchableOpacity>
    </View>
      </LinearGradient>

  );
};

export default Landing;
