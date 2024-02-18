import React, { useState } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";

const CreateWorkout = () => {
  const [templateName, setTemplateName] = useState("");
  const [exercises, setExercises] = useState([{ name: "" }]);

  const handleExerciseChange = (index, text) => {
    const newExercises = [...exercises];
    newExercises[index].name = text;
    setExercises(newExercises);
  };

  const addExerciseField = () => {
    setExercises([...exercises, { name: "" }]);
  };

  const removeExerciseField = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const saveTemplate = () => {
    console.log("Template Name:", templateName);
    console.log("Exercises:", exercises);
    // Implement your logic to save the template to a database or local storage
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
        disabled={!templateName || exercises.some((exercise) => !exercise.name)}
      />
    </ScrollView>
  );
};

export default CreateWorkout;
