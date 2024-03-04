import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation, setIsAuthorized }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignUp = async () => {
    try {
      const signUpResponse = await fetch(
        "http://192.168.1.17:8000/api/v1/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        }
      );

      const signUpData = await signUpResponse.json();

      // Check if the response was successful
      if (!signUpResponse.ok) {
        throw new Error(signUpData.detail || "Something went wrong");
      }

      // Log user in automatically
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const signInResponse = await fetch(
        process.env.IPV4 + "/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formData,
        }
      );

      const signInData = await signInResponse.json();

      if (!signInResponse.ok) {
        throw new Error(data2.detail || "Something went wrong");
      }

      await AsyncStorage.setItem("access_token", signInData.access_token);
      setIsAuthorized(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleAlreadyHaveAccount = () => {
    navigation.navigate("SignIn");
  };

  return (
    <LinearGradient
      colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
      style={{ flex: 1 }}
    >
      <View className="flex flex-1 mx-10 my-40 p-5 justify-center items-center rounded-md bg-white shadow-lg">
        <Text className="text-3xl mb-8 text-teal-600 font-semibold">
          Sign Up
        </Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="border-b border-gray-400 mb-4 w-full px-4 py-2"
        />
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
          className="border-b border-gray-400 mb-4 w-full px-4 py-2"
        />

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          className="border-b border-gray-400 mb-8 w-full px-4 py-2 "
        />

        <TouchableOpacity
          onPress={handleSignUp}
          className="py-2 px-6 bg-teal-600 px-6 py-2 rounded-lg"
        >
          <Text className="flex items-center text-white font-medium text-lg ">
            Sign Up
          </Text>
        </TouchableOpacity>

        {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}

        <TouchableOpacity onPress={handleAlreadyHaveAccount}>
          <Text className="mt-5 text-custom-teal">
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SignUp;
