import React, { useState } from "react";
import { ScrollView } from "react-native";
import CreateWorkoutPlan from "../components/createWorkoutPlan";
import CreateRoutine from "../components/createRoutine";
import CreateExercise from "../components/createExercise";

export default function CreateTab() {
  const [newWorkoutPlan, setNewWorkoutPlan] = useState(false);
  return (
    <ScrollView className="flex-1 mt-14">
      <CreateWorkoutPlan
        newWorkoutPlan={newWorkoutPlan}
        setNewWorkoutPlan={setNewWorkoutPlan}
      />
      <CreateRoutine newWorkoutPlan={newWorkoutPlan} />
      <CreateExercise />
    </ScrollView>
  );
}
