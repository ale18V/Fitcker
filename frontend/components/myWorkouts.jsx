import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyWorkouts = ({ templateUpdated }) => {
  const [workoutTemplates, setWorkoutTemplates] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedExercise, setEditedExercise] = useState("");
  //const [username, setUsername] = useState("");

  useEffect(() => {
    const loadWorkoutTemplates = async () => {
      //await getUsernameFromApi();
      try {
        const username = await AsyncStorage.getItem("username");  
        const storedTemplates = await AsyncStorage.getItem(username+"@workoutTemplates");
        if (storedTemplates !== null) {
          //const tempTemplates = JSON.parse(storedTemplates);
          setWorkoutTemplates(JSON.parse(storedTemplates));
          //setWorkoutTemplates(JSON.parse(workoutTemplates));
          console.log(JSON.stringify(storedTemplates));
          console.log(JSON.stringify(workoutTemplates)); 
        }
      } catch (error) {
        console.error("Error loading workout templates:", error);
      }
    };

    /* const getUsernameFromApi = async () => {
      try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem("access_token");

        if (token) {
          // Make a GET request to the API endpoint with the token included in the Authorization header
          const response = await fetch(
            "http://localhost:8000/api/v1/users/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            // Extract the username from the response data
            console.log(data);
            setUsername(data.username);
          } else {
            // Handle error when API request fails
            throw new Error("Failed to fetch user profile");
          }
        } else {
          // Handle case when token is not found in AsyncStorage
          throw new Error("Token not found");
        }
      } catch (error) {
        console.error(error);
        
      }
    }; */

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
      //const token = await AsyncStorage.getItem("access_token");
      const username = await AsyncStorage.getItem("username"); 
      const updatedTemplates = [...workoutTemplates];
      updatedTemplates.splice(index, 1);
      await AsyncStorage.setItem(
        username+"@workoutTemplates",
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
      //const token = await AsyncStorage.getItem("access_token");
      const username = await AsyncStorage.getItem("username"); 
      const updatedTemplates = [...workoutTemplates];
      updatedTemplates[index].exercises[exerciseIndex] = editedExercise;
      await AsyncStorage.setItem(
        username+"@workoutTemplates",
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
                  {template.name}
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
