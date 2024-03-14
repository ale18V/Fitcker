import React, { useState } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateExercise = () => {
  return (
    <ScrollView>
      <Text className="text-black font-bold text-2xl m-4">Create Exercise</Text>
    </ScrollView>
  );
};

export default CreateExercise;
