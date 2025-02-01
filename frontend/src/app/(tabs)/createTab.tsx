import { useState } from "react";
import { ScrollView } from "react-native";
import CreateWorkoutPlan from "$/components/createWorkoutPlan";
import CreateRoutine from "$/components/createRoutine";
import CreateExercise from "$/components/createExercise";

export default function CreateTab() {
  return (
    <ScrollView className="flex-1 mt-14">
      <CreateWorkoutPlan />
      <CreateRoutine />
      <CreateExercise />
    </ScrollView>
  );
}
