import React, { useState } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateWorkout = ({ templateUpdated, setTemplateUpdated }) => {
  const [templateName, setTemplateName] = useState("");
  const [exercises, setExercises] = useState([]);

  const handleExerciseChange = (index, text) => {
    const newExercises = [...exercises];
    newExercises[index] = text;
    setExercises(newExercises);
  };

  const addExerciseField = () => {
    setExercises([...exercises, ""]);
  };

  const removeExerciseField = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const saveTemplate = async () => {
    if (templateName && exercises.every((exercise) => exercise)) {
      const newTemplate = {
        templateName: templateName,
        exercises: exercises.filter((exercise) => exercise.trim() !== ""),
      };
      try {
        // await AsyncStorage.clear();
        let updatedTemplates = [];
        const storedTemplates = await AsyncStorage.getItem("workoutTemplates");
        if (storedTemplates !== null) {
          updatedTemplates = JSON.parse(storedTemplates);
        }
        updatedTemplates.push(newTemplate);
        await AsyncStorage.setItem(
          "workoutTemplates",
          JSON.stringify(updatedTemplates)
        );
        setTemplateUpdated(!templateUpdated);
        setTemplateName("");
        setExercises([]);
        console.log("Template saved successfully:", newTemplate);
      } catch (error) {
        console.error("Error saving template:", error);
      }
    } else {
      console.log("Template name or exercises are empty");
    }
  };

  return (
    <ScrollView>
      <Text className="text-black font-bold text-2xl m-4">Create Workout</Text>
      <TextInput
        className="border rounded p-2 m-4"
        placeholder="Workout Name"
        value={templateName}
        onChangeText={setTemplateName}
      />
      {exercises.map((exercise, index) => (
        <View key={index} className="flex-row items-center">
          <TextInput
            className="flex-1 border rounded p-2 m-4"
            placeholder={`Exercise ${index + 1}`}
            value={exercise.name}
            onChangeText={(text) => handleExerciseChange(index, text)}
          />
          <Button
            className="bg-red-500 text-white p-2 rounded m-4"
            title="Remove"
            onPress={() => removeExerciseField(index)}
          />
        </View>
      ))}
      <Button
        className="bg-blue-500 text-white p-2 rounded m-4"
        title="Add Exercise"
        onPress={addExerciseField}
      />
      <Button
        className="bg-blue-500 text-white p-2 rounded m-4"
        title="Save Template"
        onPress={saveTemplate}
        disabled={
          !templateName ||
          exercises.some((exercise) => !exercise) ||
          exercises.length < 1
        }
      />
    </ScrollView>
  );
};

export default CreateWorkout;
