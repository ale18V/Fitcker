import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import CreateWorkoutPlan from "../components/createWorkoutPlan";
import CreateRoutine from "../components/createRoutine";
import CreateExercise from "../components/createExercise";
import MyWorkoutPlans from "../components/myWorkoutPlans";
import MyRoutines from "../components/myRoutines";
import MyExercises from "../components/myExercises";
import WorkoutPlanForm from "../components/workoutPlanForm";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function CreateTab() {
  const [reRender, setreRender] = useState(false);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" options={{ headerShown: false }}>
        {(props) => (
          <TabNavigator
            {...props}
            setreRender={setreRender}
            reRender={reRender}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="EditWorkoutPlan"
        options={{ headerShown: false, presentation: "modal" }}
      >
        {(props) => (
          <View className="">
            <WorkoutPlanForm
              {...props}
              setreRender={setreRender}
              reRender={reRender}
            />
          </View>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const TabNavigator = ({ setreRender, reRender }) => (
  <Tab.Navigator
    className="mt-9"
    screenOptions={{
      tabBarActiveTintColor: "#38A3A5",
      tabBarInactiveTintColor: "#A3A3A3",
      tabBarIndicatorStyle: { backgroundColor: "#38A3A5" },
    }}
  >
    <Tab.Screen name="Create">
      {(props) => (
        <ScrollView className="flex-1 mt-5">
          <CreateWorkoutPlan
            {...props}
            reRender={reRender}
            setreRender={setreRender}
          />
          <CreateRoutine {...props} reRender={reRender} />
          <CreateExercise />
        </ScrollView>
      )}
    </Tab.Screen>
    <Tab.Screen name="View">
      {(props) => (
        <ScrollView className="flex-1 mt-5">
          <MyWorkoutPlans {...props} reRender={reRender} />
          <MyRoutines />
          <MyExercises />
        </ScrollView>
      )}
    </Tab.Screen>
  </Tab.Navigator>
);
