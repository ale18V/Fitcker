import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function MyWorkoutPlans({ reRender, navigation }) {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loadedFromServer, setLoadedFromServer] = useState(false);

  const navigateToEditWorkoutPlan = (plan) => {
    console.log(plan);
    navigation.navigate("EditWorkoutPlan", { plan });
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        // Check if data is already loaded from the server
        if (!loadedFromServer) {
          const token = await AsyncStorage.getItem("access_token");
          let response = await fetch("http://localhost:8000/api/v1/plans/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            // Set workout plans from the server response
            setWorkoutPlans(data);
            // Store workout plans in local storage
            await AsyncStorage.setItem("workoutPlans", JSON.stringify(data));
            // Set loadedFromServer to true to avoid repeated API calls
            setLoadedFromServer(true);
          }
        } else {
          // Fetch workout plans from local storage
          const plansString = await AsyncStorage.getItem("workoutPlans");
          if (plansString) {
            const plans = JSON.parse(plansString);
            setWorkoutPlans(plans);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWorkoutPlans();
  }, [reRender]);

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={toggleExpanded}
        className="flex-row justify-between items-center"
      >
        <Text className="font-bold text-2xl m-4">My Workout Plans</Text>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-up"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {expanded && (
        <View className="p-4">
          {workoutPlans.length > 0 ? (
            workoutPlans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                onPress={() => navigateToEditWorkoutPlan(plan)}
              >
                <LinearGradient
                  colors={[
                    "rgba(56, 163, 165, 0.5)",
                    "rgba(128, 237, 153, 0.5)",
                  ]}
                  className="p-4 rounded-xl mb-4"
                >
                  <View className="text-lg flex-row items-center justify-between">
                    <Text className="font-bold ">{plan.name}</Text>
                    <MaterialIcons name="edit" size={20} color="teal" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No workout plans exist.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}
