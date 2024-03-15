import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

export default function MyWorkoutPlans({ newWorkoutPlan }) {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    // Fetch workout plans from local storage
    const fetchWorkoutPlans = async () => {
      console.log("FETCH");
      try {
        const plansString = await AsyncStorage.getItem("workoutPlans");
        if (plansString) {
          const plans = JSON.parse(plansString);
          setWorkoutPlans(plans);
        }
      } catch (error) {
        console.error("Error fetching workout plans:", error);
      }
    };

    fetchWorkoutPlans();
  }, [newWorkoutPlan]);

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
              <View key={plan.id} style={{ marginBottom: 10 }}>
                <Text className="font-bold mb-2">{plan.name}</Text>
              </View>
            ))
          ) : (
            <Text>No workout plans exist.</Text>
          )}
          {successMessage ? (
            <Text className="bg-green-300 p-3 border border-gray-400 rounded-md">
              {successMessage}
            </Text>
          ) : null}
          {errorMessage ? (
            <Text className="bg-red-300 p-3 rounded-lg">{errorMessage}</Text>
          ) : null}
        </View>
      )}
    </ScrollView>
  );
}
