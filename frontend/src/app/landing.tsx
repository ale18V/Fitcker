import { Text, TouchableOpacity, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { useRouter } from "expo-router";

const Landing = () => {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["rgba(56, 163, 165, 0.25)", "rgba(128, 237, 153, 0.75)"]}
      style={{
        flex: 1
      }}
    >
      <SafeAreaView className="flex flex-col justify-center items-center flex-1">
        <Image
            source={require("../../assets/icon1.png")}
            style={{ width: 150, height: 150 }}
            className="shadow-sm"
          />
          <Text className="text-3xl text-teal-700 font-bold mt-2">
            Fitness Tracker
          </Text>
          <TouchableOpacity
          onPress={() => router.navigate("/register")}
          className="bg-teal-600 text-center px-6 py-2 rounded-lg mt-20"
        >
          <Text className="text-white text-2xl">Get Started</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Landing;
