import { FunctionComponent, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "../constants";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { UsersService } from "$/api";

const Register: FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useRouter()
  const handleSignUp = async () => {
    try {
      const signupResponse = await UsersService.postUsers({
        body: {
          email,
           password,
           username
        }
      })

      console.log(signupResponse.request)
      // Check if the response was successful
      if (!signupResponse.data) {
        throw signupResponse.error || new Error("Something went wrong");
      }

      navigation.navigate("/login")
      
      
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleAlreadyHaveAccount = () => {
    navigation.navigate("/login")
  };

  return (
    <LinearGradient
      colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex flex-1 mx-10 my-40 p-5 justify-center items-center rounded-md bg-white shadow-lg">
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
          className="bg-teal-600 px-6 py-2 rounded-lg"
        >
          <Text className="flex items-center text-white font-medium text-lg ">
            Sign Up
          </Text>
        </TouchableOpacity>

        {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}

        <TouchableOpacity onPress={handleAlreadyHaveAccount}>
          <Text className="mt-5 text-custom-teal" testID="signUpp">
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Register;
