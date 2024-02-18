import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

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
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl mb-8">Sign In</Text>
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
      <TouchableOpacity
        onPress={handleSignIn}
        className="bg-custom-teal px-6 py-3 rounded-lg mb-4"
      >
        <Text className="text-white text-lg">Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text className="text-custom-teal">Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
