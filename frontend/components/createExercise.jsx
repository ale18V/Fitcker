import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { apiURL } from "../config"

const CreateExercise = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const createExercise = async () => {
    if (!name) {
      setErrorMessage("Name is required.");
      setSuccessMessage("");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    const exerciseData = {
      name: name,
      description: description,
    };

    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch(`{apiURL}/api/v1/exercises/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });
      if (response.ok) {
        const data = await response.json();

        // Save response data to local storage under "exercises"
        const existingExercises = await AsyncStorage.getItem("exercises");
        let exercises = [];
        if (existingExercises) {
          exercises = JSON.parse(existingExercises);
        }
        exercises.push(data);
        await AsyncStorage.setItem("exercises", JSON.stringify(exercises));

        // Handle success
        setSuccessMessage("Exercise successfully created.");
        setErrorMessage("");
        setName("");
        setDescription("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        // Handle failed response
        setErrorMessage("Failed to create exercise.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        setSuccessMessage("");
      }
    } catch (error) {
      // Handle error
      setErrorMessage("Error creating exercise.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      setSuccessMessage("");
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={toggleExpanded}
        className="flex-row justify-between items-center"
      >
        <Text className="font-bold text-2xl m-4">Create Exercise</Text>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-up"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {expanded && (
        <View className="p-4">
          <Text className="font-bold mb-2">Exercise Name</Text>
          <TextInput
            className="border border-gray-400 rounded px-4 py-2 mb-4"
            placeholder="Enter exercise name"
            value={name}
            onChangeText={setName}
          />

          <Text className="font-bold mb-2">Exercise Description</Text>
          <TextInput
            className="border border-gray-400 rounded px-4 py-2 h-24 mb-4"
            multiline
            placeholder="Enter exercise description"
            value={description}
            onChangeText={setDescription}
          />
          {successMessage ? (
            <Text className="bg-green-300 p-3 border border-gray-400 rounded-lg my-4">
              {successMessage}
            </Text>
          ) : null}
          {errorMessage ? (
            <Text className="bg-red-300 p-3 rounded-lg my-4">
              {errorMessage}
            </Text>
          ) : null}
          <Button title="Create Exercise" testID="exerciseButton" onPress={createExercise} />
        </View>
      )}
    </ScrollView>
  );
};

export default CreateExercise;
