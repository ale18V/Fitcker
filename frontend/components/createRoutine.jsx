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

const CreateRoutine = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const createPlan = async () => {
    if (!name || !startDate || !endDate) {
      setErrorMessage("Name, start date, and end date are required.");
      setSuccessMessage("");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    const planData = {
      name: name,
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
    };

    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch("http://localhost:8000/api/v1/plans/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planData),
      });
      if (response.ok) {
        const data = await response.json();
        // Retrieve existing plans from local storage
        const existingPlans = await AsyncStorage.getItem("workoutPlans");
        let plans = [];
        if (existingPlans) {
          plans = JSON.parse(existingPlans);
        }

        // Append the new plan to the array
        plans.push(data);

        // Store the updated plans back into local storage
        await AsyncStorage.setItem("workoutPlans", JSON.stringify(plans));
        setSuccessMessage("Workout plan successfully created.");
        setErrorMessage("");
        // Clear form fields
        setName("");
        setStartDate(new Date());
        setEndDate(new Date());
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage("Failed to create workout plan.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Error creating workout plan.");
      setSuccessMessage("");
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={toggleExpanded}
        className="flex-row justify-between items-center"
      >
        <Text className="font-bold text-2xl m-4">Create Routine</Text>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-up"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {expanded && (
        <View className="p-4">
          <Text className="font-bold mb-2">Routine Name</Text>
          <TextInput
            className="border border-gray-400 rounded px-4 py-2 mb-4 placeholder-gray-500"
            placeholder="Workout Plan 1"
            value={name}
            onChangeText={setName}
          />
          {successMessage ? (
            <Text className="bg-green-300 p-3 border border-gray-400 rounded-md">
              {successMessage}
            </Text>
          ) : null}
          {errorMessage ? (
            <Text className="bg-red-300 p-3 rounded-lg">{errorMessage}</Text>
          ) : null}
          <Button title="Create Plan" onPress={createPlan} />
        </View>
      )}
    </ScrollView>
  );
};

export default CreateRoutine;
