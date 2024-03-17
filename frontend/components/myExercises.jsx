import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function MyExercises({ reRender, navigation }) {
  const [exercises, setExercises] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loadedFromServer, setLoadedFromServer] = useState(false);

  const navigateToEditExercise = (exercise) => {
    console.log(exercise);
    navigation.navigate("EditExercise", { exercise });
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        // Check if data is already loaded from the server
        if (!loadedFromServer) {
          const token = await AsyncStorage.getItem("access_token");
          let response = await fetch(
            "http://localhost:8000/api/v1/exercises/",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setExercises(data);
            await AsyncStorage.setItem("exercises", JSON.stringify(data));
            setLoadedFromServer(true);
          }
        } else {
          // Fetch exercises from local storage
          const exercisesString = await AsyncStorage.getItem("exercises");
          if (exercisesString) {
            const exercises = JSON.parse(exercisesString);
            setExercises(exercises);
          }
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, [reRender]);

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
              <TouchableOpacity
                key={exercise.id}
                onPress={() => navigateToEditExercise(exercise)}
              >
                <LinearGradient
                  colors={[
                    "rgba(56, 163, 165, 0.5)",
                    "rgba(128, 237, 153, 0.5)",
                  ]}
                  className="p-4 rounded-xl mb-4"
                >
                  <View className="text-lg flex-row items-center justify-between">
                    <Text className="font-bold ">{exercise.name}</Text>
                    <MaterialIcons name="edit" size={20} color="teal" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No exercises exist.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}
