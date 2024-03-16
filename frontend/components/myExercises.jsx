import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function myExercises() {
  const [exercises, setExercises] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    // Fetch exercises from local storage
    const fetchexercises = async () => {
      console.log("FETCH");
      try {
        const exercisesString = await AsyncStorage.getItem("exercises");
        if (exercisesString) {
          const exercises = JSON.parse(exercisesString);
          setExercises(exercises);
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchexercises();
  }, []);

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={toggleExpanded}
        className="flex-row justify-between items-center"
      >
        <Text className="font-bold text-2xl m-4">My Exercises</Text>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-up"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {expanded && (
        <View className="p-4">
          {exercises.length > 0 ? (
            exercises.map((exercise) => (
              <TouchableOpacity key={exercise.id}>
                <LinearGradient
                  colors={[
                    "rgba(56, 163, 165, 0.5)",
                    "rgba(128, 237, 153, 0.5)",
                  ]}
                  className="p-4 rounded-xl mb-4"
                >
                  <View
                    key={exercise.id}
                    className="text-lg flex-row items-center justify-between"
                  >
                    <Text className="font-bold ">{exercise.name}</Text>
                    <MaterialIcons name="edit" size={20} color="teal" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No exercises exist.</Text>
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
