import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import MyWorkoutPlans from "../components/myWorkoutPlans";
import MyRoutines from "../components/myRoutines";
import MyExercises from "../components/myExercises";
import WorkoutPlanForm from "../components/workoutPlanForm";
import RoutineForm from "../components/routineForm";
import ExerciseForm from "../components/exerciseForm";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import CreateSection from "../components/createSection";

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
          <View>
            <WorkoutPlanForm
              {...props}
              setreRender={setreRender}
              reRender={reRender}
            />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="EditRoutine"
        options={{ headerShown: false, presentation: "modal" }}
      >
        {(props) => (
          <View>
            <RoutineForm
              {...props}
              setreRender={setreRender}
              reRender={reRender}
            />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="EditExercise"
        options={{ headerShown: false, presentation: "modal" }}
      >
        {(props) => (
          <View>
            <ExerciseForm
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
          <CreateSection
            {...props}
            title="Create Workout Plan"
            children={() => (
              <WorkoutPlanForm reRender={reRender} setreRender={setreRender} />
            )}
          />
          <CreateSection
            {...props}
            title="Create Routine"
            children={() => (
              <RoutineForm reRender={reRender} setreRender={setreRender} />
            )}
          />
          <CreateSection
            {...props}
            title="Create Exercise"
            children={() => (
              <ExerciseForm reRender={reRender} setreRender={setreRender} />
            )}
          />
        </ScrollView>
      )}
    </Tab.Screen>
    <Tab.Screen name="View">
      {(props) => (
        <ScrollView className="flex-1 mt-5">
          <MyWorkoutPlans {...props} reRender={reRender} />
          <MyRoutines {...props} reRender={reRender} />
          <MyExercises {...props} reRender={reRender} />
        </ScrollView>
      )}
    </Tab.Screen>
  </Tab.Navigator>
);
