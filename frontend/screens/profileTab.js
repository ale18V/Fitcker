import * as React from "react";
import { Text, View } from "react-native";
import Profile from "../components/profile";

export default function ProfileTab() {
  return (
      <Profile
        profile={{
          username: "username",
        }}
      />
  );
}
