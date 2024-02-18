import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const SignUp = ({ navigation, setIsAuthorized }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // Implement sign-up logic here
    setIsAuthorized(true);
  };

  const handleAlreadyHaveAccount = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl mb-8">Sign Up</Text>
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
        className="border-b border-gray-400 mb-8 w-full px-4 py-2"
      />
      <TouchableOpacity
        onPress={handleSignUp}
        className="bg-custom-teal px-6 py-3 rounded-lg mb-4"
      >
        <Text className="text-white text-lg">Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAlreadyHaveAccount}>
        <Text className="text-custom-teal">
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
