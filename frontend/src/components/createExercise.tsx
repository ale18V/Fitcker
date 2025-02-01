import { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ExerciseCreate, ExercisesService } from "$/api";
import user from "$/stores/user";
import exerciseStore from "$/stores/exercise";

const CreateExercise = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const addExercise = exerciseStore.use.addExercise()
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

    const exerciseData: ExerciseCreate = {
      name: name,
      description: description,
    };

    try {
      const response = await ExercisesService.postExercises({
        body: exerciseData,
        auth: () => user.getState().authToken
      })
    
      if (!response.error) {        
        addExercise(response.data);

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
