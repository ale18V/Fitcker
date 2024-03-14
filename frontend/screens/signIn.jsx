import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const SignIn = ({ navigation, setIsAuthorized }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSignIn = async () => {
    try {
      // Use form data for login backend api standard
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("http://10.13.51.144:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const data = await response.json();

      // Check if the response was successful
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      await AsyncStorage.setItem("access_token", data.access_token);
      setIsAuthorized(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
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
        <Text className="text-3xl mb-8 text-teal-600 font-semibold">
          Sign In
        </Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="border-b border-gray-400 mb-4 w-full px-4 py-2"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          className="border-b border-gray-400 mb-8 w-full px-4 py-2"
        />

        <TouchableOpacity
          onPress={handleSignIn}
          className="py-2 px-6 bg-teal-600 px-6 py-2 rounded-lg"
        >
          <Text className="flex items-center text-white font-medium text-lg">
            Sign In
          </Text>
        </TouchableOpacity>

        {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}

        <TouchableOpacity onPress={handleCreateAccount}>
          <Text className="mt-5 text-custom-teal">
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SignIn;
