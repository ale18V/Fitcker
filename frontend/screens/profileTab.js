import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Profile from "../components/profile";

export default function ProfileTab({ setIsAuthorized }) {
  return (
    <Profile
      profile={{
        username: "username",
      }}
      setIsAuthorized={setIsAuthorized}
    />
  );
}
