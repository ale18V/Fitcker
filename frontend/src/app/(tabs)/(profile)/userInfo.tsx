import { useState, FunctionComponent } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import user, { useUser, type UserInfo } from "$/stores/user";

const UserInfo: FunctionComponent = () => {
  const { email, username, DoB, gender } = useUser(
    ({ DoB, gender, email, username }) => ({
      email,
      gender,
      username,
      DoB,
    })
  );

  const [gend, setGender] = useState("");
  const [birth, setDoB] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const saveUserInfo = () =>
    user.setState((s) => ({
      ...s,
      DoB,
      gender,
    }));

  return (
    <View className="flex-1 mx-10 justify-center items-center">
      <View className="w-full">
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Email: </Text>
            <Text>{email}</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Username: </Text>
            <Text>{username}</Text>
          </View>
        </LinearGradient>
        {/*         <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
          >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Gender: </Text>
            <Text>{gender}</Text>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
          >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Date of Birth: </Text>
            <Text>{DoB}</Text>
          </View>
        </LinearGradient> */}

        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Gender: </Text>
            <TextInput
              editable={isEditing}
              value={String(gend)}
              onChangeText={(text) => setGender(text)}
              style={{
                borderWidth: 1,
                borderRadius: 3,
                padding: 5,
                width: 100,
                borderColor: "#58a1a3",
                marginRight: 5,
              }}
            />
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Date of Birth: </Text>
            <TextInput
              editable={isEditing}
              value={String(birth)}
              onChangeText={(text) => setDoB(text)}
              style={{
                borderWidth: 1,
                borderRadius: 3,
                padding: 5,
                width: 100,
                borderColor: "#58a1a3",
                marginRight: 5,
              }}
            />
          </View>
        </LinearGradient>

        {!isEditing && (
          <TouchableOpacity
            style={{ padding: 10, margin: 10 }}
            onPress={() => setIsEditing(true)}
          >
            <LinearGradient
              colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
              className="flex-row items-center p-4 rounded-xl justify-between mb-4"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="file-edit" size={20} />
                <Text className="font-bold ml-2">Enable Editing</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {isEditing && (
          <TouchableOpacity
            style={{ padding: 10, margin: 10 }}
            onPress={() => {
              setIsEditing(false);
              saveUserInfo();
            }}
          >
            <LinearGradient
              colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
              className="flex-row items-center p-4 rounded-xl justify-between mb-4"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="file-edit" size={20} />
                <Text className="font-bold ml-2">
                  Stop Editing And Save User Info
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default UserInfo;
