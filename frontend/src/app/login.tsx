import { FunctionComponent, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "../constants";
import { useNavigation } from "expo-router";
import user from "$/stores/user";

const Login: FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const navigation = useNavigation()
  const handleSignIn = async () => {
    try {
      // Use form data for login backend api standard
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await response.json();

      // Check if the response was successful
      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      user.setState(s => ({
        ...s,
        authToken: data.access_token,
        username: username,
      }))
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("/register");
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
          className="py-2 px-6 bg-teal-600 rounded-lg"
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

export default Login;
