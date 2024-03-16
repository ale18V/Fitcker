import React, { useState } from "react";
import { ScrollView } from "react-native";
import CreateWorkoutPlan from "../components/createWorkoutPlan";
import CreateRoutine from "../components/createRoutine";
import CreateExercise from "../components/createExercise";
import MyWorkoutPlans from "../components/myWorkoutPlans";
import MyRoutines from "../components/myRoutines";
import MyExercises from "../components/myExercises";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function CreateTab() {
  const [newWorkoutPlan, setNewWorkoutPlan] = useState(false);
  return (
    <Tab.Navigator
      className="mt-9"
      screenOptions={{
        tabBarActiveTintColor: "#38A3A5",
        tabBarInactiveTintColor: "#A3A3A3",
        tabBarIndicatorStyle: { backgroundColor: "#38A3A5" },
      }}
    >
      <Tab.Screen name="Create">
        {() => (
          <ScrollView className="flex-1 mt-5">
            <CreateWorkoutPlan
              newWorkoutPlan={newWorkoutPlan}
              setNewWorkoutPlan={setNewWorkoutPlan}
            />
            <CreateRoutine newWorkoutPlan={newWorkoutPlan} />
            <CreateExercise />
          </ScrollView>
        )}
      </Tab.Screen>
      <Tab.Screen name="View">
        {() => (
          <ScrollView className="flex-1 mt-5">
            <MyWorkoutPlans newWorkoutPlan={newWorkoutPlan} />
            <MyRoutines />
            <MyExercises />
          </ScrollView>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
