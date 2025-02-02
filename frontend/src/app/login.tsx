import { FunctionComponent, useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import user from "$/stores/user";
import { UsersService } from "$/api";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "$/components/toast";

const Login: FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useRouter()
  const handleSignIn = async () => {
    try {
      const response = await UsersService.postUsersLogin({
        body: {
          username,
          password
        },
        bodySerializer: (body) => new URLSearchParams(body).toString(),
      })
      console.log(response.request, response.response)
      // Check if the response was successful
      if (!response.data) {
        throw response.error || new Error("Something went wrong");
      }

      user.setState(s => ({
        ...s,
        authToken: response.data.access_token,
        username: username,
      }))
      navigation.navigate("/(tabs)/createTab")
    } catch (error) {
      console.error(error)
      Toast.error({title: "Error", description: JSON.stringify(error)})
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
      <SafeAreaView className="flex flex-1 p-5 justify-center items-center rounded-md bg-white shadow-lg">
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

        <TouchableOpacity onPress={handleCreateAccount}>
          <Text className="mt-5 text-custom-teal">
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Login;
