import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SignIn = ({ navigation, setIsAuthorized }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Implement sign-in logic here
    setIsAuthorized(true);
  };

  const handleCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  return (
    <LinearGradient
    colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
    style={{ flex: 1 }}  
    >
    <View className="flex flex-1 mx-10 my-40 p-5 justify-center items-center rounded-md bg-white shadow-lg">
      <Text className="text-3xl mb-8 text-teal-600 font-semibold">Sign In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border-b border-gray-400 mb-4 w-full px-4 py-2"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        className="border-b border-gray-400 mb-8 w-full px-4 py-2"
      />
       <LinearGradient
    colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
    >
      <TouchableOpacity
        onPress={handleSignIn}
        className="py-2 px-6 rounded-xl justify-between"
      >
        <Text className="flex items-center text-teal-700 font-medium text-lg">Sign In</Text>
      </TouchableOpacity>
      </LinearGradient>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text className="mt-5 text-custom-teal">Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};

export default SignIn;
