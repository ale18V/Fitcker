import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "./customButton";
import { MaterialIcons } from "@expo/vector-icons";

export default function ExerciseForm({
  navigation,
  route,
  reRender,
  setreRender,
}) {
  const [name, setName] = useState(route ? route.params.exercise.name : "");
  const [description, setDescription] = useState(
    route ? route.params.exercise.description : ""
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createExercise = async () => {
    if (!name) {
      setErrorMessage("Name is required.");
      setSuccessMessage("");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    // Prepare exercise data
    const exerciseData = {
      name: name,
      description: description,
    };

    try {
      // Perform API request to create/update exercise
      let response;
      const token = await AsyncStorage.getItem("access_token");
      if (route && route.params.exercise) {
        // If exercise ID is available, it's an update (PATCH) request
        const id = route.params.exercise.id;
        response = await fetch(`http://localhost:8000/api/v1/exercises/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(exerciseData),
        });
      } else {
        // If exercise ID is not available, it's a create (POST) request
        response = await fetch("http://localhost:8000/api/v1/exercises/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(exerciseData),
        });
      }

      if (response.ok) {
        const data = await response.json();
        const message =
          route && route.params.exercise
            ? "Exercise updated."
            : "Exercise created.";
        setSuccessMessage(message);

        // Save exercise data to local storage
        const existingExercises = await AsyncStorage.getItem("exercises");
        const exercises = existingExercises
          ? JSON.parse(existingExercises)
          : [];

        if (route && route.params.exercise) {
          // Update existing exercise in local storage
          const updatedExercises = exercises.map((ex) =>
            ex.id === route.params.exercise.id ? { ...ex, ...data } : ex
          );
          await AsyncStorage.setItem(
            "exercises",
            JSON.stringify(updatedExercises)
          );
        } else {
          // Add the new exercise to the existing exercises in local storage
          exercises.push(data);
          await AsyncStorage.setItem("exercises", JSON.stringify(exercises));
        }

        setErrorMessage("");
        setName("");
        setDescription("");
        setreRender(!reRender);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        if (route) {
          navigation.goBack();
        }
      } else {
        setErrorMessage("Failed to create/update exercise.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error creating/updating exercise.");
      setSuccessMessage("");
    }
  };

  return (
    <View className="p-4">
      {route && (
        <View className="flex-row justify-between ">
          <Text className="font-bold text-xl mb-4">Edit Exercise</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="cancel" size={24} color="#38A3A5" />
          </TouchableOpacity>
        </View>
      )}
      <Text className="font-bold mb-2">Exercise Name</Text>
      <TextInput
        className="border border-gray-400 rounded px-4 py-2 mb-4 placeholder-gray-500 text-black text-md"
        placeholder="Exercise Name"
        value={name}
        onChangeText={setName}
      />
      <Text className="font-bold mb-2">Description</Text>
      <TextInput
        className="border border-gray-400 rounded px-4 py-2 mb-4 placeholder-gray-500 text-black text-md"
        placeholder="Exercise Description"
        value={description}
        onChangeText={setDescription}
      />
      {successMessage ? (
        <View className="bg-green-300 p-3 rounded-lg mb-2">
          <Text>{successMessage}</Text>
        </View>
      ) : null}
      {errorMessage ? (
        <View className="bg-red-300 p-3 rounded-lg mb-2">
          <Text>{errorMessage}</Text>
        </View>
      ) : null}
      <CustomButton
        title={route ? "Update Exercise" : "Create Exercise"}
        onPress={createExercise}
      />
    </View>
  );
}
