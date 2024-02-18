import React from "react";
import { ScrollView } from "react-native";
import CreateWorkout from "../components/createWorkout";
import MyWorkouts from "../components/myWorkouts";

export default function CreateTab() {
  return (
    <ScrollView className="flex-1 mt-14">
      <CreateWorkout />
      <MyWorkouts />
    </ScrollView>
  );
}
