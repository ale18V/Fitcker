import React, { useState } from "react";
import { ScrollView } from "react-native";
import CreateWorkoutPlan from "../components/createWorkoutPlan";
import CreateRoutine from "../components/createRoutine";
import CreateExercise from "../components/createExercise";

export default function CreateTab() {
  const [templateUpdated, setTemplateUpdated] = useState(false);
  return (
    <ScrollView className="flex-1 mt-14">
      {/* <CreateWorkout
        templateUpdated={templateUpdated}
        setTemplateUpdated={setTemplateUpdated}
      /> */}
      {/* <MyWorkouts templateUpdated={templateUpdated} /> */}
      <CreateWorkoutPlan />
      <CreateRoutine />
      <CreateExercise />
    </ScrollView>
  );
}
