import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function UserInfo({ navigateBack }) {
  return (
    <View>
      <TouchableOpacity onPress={navigateBack}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <Text>User Info</Text>
    </View>
  );
}
