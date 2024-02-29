import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


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
    <LinearGradient
    colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
    style={{ flex: 1 }}  
    >
    <View className="flex flex-1 mx-10 my-40 p-5 justify-center items-center rounded-md bg-white shadow-lg"> 
      <Text className="text-3xl mb-8 text-teal-600 font-semibold">Sign Up</Text>
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
        <Text className="flex items-center text-white font-medium text-lg ">Sign Up</Text>
      </TouchableOpacity>
      
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
