import React from "react";
import { View, Text } from "react-native";

const MyWorkouts = () => {
  // Sample workout data
  const sampleWorkout = {
    name: "Sample Workout",
    exercises: ["Push-ups", "Squats", "Lunges", "Plank", "Jumping Jacks"],
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", margin: 20 }}>
        My Workouts
      </Text>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontWeight: "bold" }}>{sampleWorkout.name}</Text>
        {sampleWorkout.exercises.map((exercise, index) => (
          <Text key={index} style={{ marginLeft: 10 }}>{`${
            index + 1
          }. ${exercise}`}</Text>
        ))}
      </View>
    </View>
  );
};

export default MyWorkouts;
