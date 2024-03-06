import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyWorkouts = ({ templateUpdated }) => {
  const [workoutTemplates, setWorkoutTemplates] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedExercise, setEditedExercise] = useState("");

  useEffect(() => {
    const loadWorkoutTemplates = async () => {
      try {
        const storedTemplates = await AsyncStorage.getItem("workoutTemplates");
        if (storedTemplates !== null) {
          setWorkoutTemplates(JSON.parse(storedTemplates));
        }
      } catch (error) {
        console.error("Error loading workout templates:", error);
      }
    };

    loadWorkoutTemplates();
  }, [templateUpdated]);

  const toggleExercises = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    if (editingIndex !== null) {
      setEditedExercise("");
      setEditingIndex(null);
    }
  };

  const handleDeleteTemplate = async (index) => {
    try {
      const updatedTemplates = [...workoutTemplates];
      updatedTemplates.splice(index, 1);
      await AsyncStorage.setItem(
        "workoutTemplates",
        JSON.stringify(updatedTemplates)
      );
      setWorkoutTemplates(updatedTemplates);
      console.log("Template deleted successfully");
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const handleEditExercise = (index, exerciseIndex) => {
    setEditedExercise(workoutTemplates[index].exercises[exerciseIndex]);
    setEditingIndex(index * 1000 + exerciseIndex); // Unique identifier for exercise editing
  };

  const saveEditedExercise = async (index, exerciseIndex) => {
    try {
      const updatedTemplates = [...workoutTemplates];
      updatedTemplates[index].exercises[exerciseIndex] = editedExercise;
      await AsyncStorage.setItem(
        "workoutTemplates",
        JSON.stringify(updatedTemplates)
      );
      setWorkoutTemplates(updatedTemplates);
      setEditingIndex(null);
      console.log("Exercise edited successfully");
    } catch (error) {
      console.error("Error editing exercise:", error);
    }
  };

  return (
    <View>
      <Text className="text-2xl font-bold m-4">My Routines</Text>
      {workoutTemplates.map((template, index) => (
        <View key={index} className="mx-4 my-1">
          <TouchableOpacity onPress={() => toggleExercises(index)}>
            <View className="flex-row justify-between">
              <View className="flex-row items-center">
                <Text className="font-bold text-lg">
                  {template.templateName}
                </Text>
                <MaterialIcons
                  name={
                    expandedIndex === index
                      ? "keyboard-arrow-up"
                      : "keyboard-arrow-down"
                  }
                  size={24}
                  color="black"
                />
              </View>
              <TouchableOpacity onPress={() => handleDeleteTemplate(index)}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {expandedIndex === index &&
            template.exercises.map((exercise, exerciseIndex) => (
              <View className="flex-row justify-between" key={exerciseIndex}>
                {editingIndex === index * 1000 + exerciseIndex ? (
                  <TextInput
                    value={editedExercise}
                    onChangeText={setEditedExercise}
                    onBlur={() => saveEditedExercise(index, exerciseIndex)}
                    autoFocus
                  />
                ) : (
                  <Text className="text-lg my-1">{`${
                    exerciseIndex + 1
                  }. ${exercise}`}</Text>
                )}
                <TouchableOpacity
                  onPress={() => handleEditExercise(index, exerciseIndex)}
                >
                  <MaterialIcons name="edit" size={24} color="teal" />
                </TouchableOpacity>
              </View>
            ))}
        </View>
      ))}
    </View>
  );
};

export default MyWorkouts;
