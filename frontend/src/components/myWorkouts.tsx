import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const workoutTemplates = [
  {
    exercises: ["exercise1", "exercise2", "exercise3"],
  }
]
const MyWorkouts = () => {
  
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedExercise, setEditedExercise] = useState("");


  const toggleExercises = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    if (editingIndex !== null) {
      setEditedExercise("");
      setEditingIndex(null);
    }
  };





  return (
    <View>
      <Text className="text-2xl font-bold m-4">My Workouts</Text>
      {workoutTemplates.map((template, index) => (
        <View key={index} className="mx-4 my-1">
          <TouchableOpacity onPress={() => toggleExercises(index)}>
            <View className="flex-row justify-between">
              <View className="flex-row items-center">
                <Text className="font-bold text-lg">
                  {"templatename"}
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
              <TouchableOpacity onPress={() => {}}>
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
                    onChangeText={() => {console.log("editedExercise")}}
                    onBlur={() => {}}
                    autoFocus
                  />
                ) : (
                  <Text className="text-lg my-1">{`${
                    exerciseIndex + 1
                  }. ${exercise}`}</Text>
                )}
                <TouchableOpacity
                  onPress={() => console.log("edit")}
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
