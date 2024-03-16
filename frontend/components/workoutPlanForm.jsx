import React, { useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "./customButton";

export default function workoutPlanForm({
  navigation,
  route,
  reRender,
  setreRender,
}) {
  const [name, setName] = useState(route ? route.params.plan.name : "");
  const [startDate, setStartDate] = useState(
    route ? new Date(route.params.plan.start_date) : new Date()
  );
  const [endDate, setEndDate] = useState(
    route ? new Date(route.params.plan.end_date) : new Date()
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
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

  const createPlan = async () => {
    // Validation: Check if name, start date, and end date are provided
    if (!name || !startDate || !endDate) {
      setErrorMessage("Name, start date, and end date are required.");
      setSuccessMessage("");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    // Prepare plan data
    const planData = {
      name: name,
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
    };

    try {
      const token = await AsyncStorage.getItem("access_token");
      let response;

      // Determine the HTTP method based on whether a route is provided
      if (route && route.params.plan) {
        // If route and plan ID are provided, it's a PATCH request
        const id = route.params.plan.id;
        response = await fetch("http://localhost:8000/api/v1/plans/" + id, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(planData),
        });
      } else {
        // If no route or plan ID is provided, it's a POST request
        response = await fetch("http://localhost:8000/api/v1/plans/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(planData),
        });
      }

      if (response.ok) {
        const data = await response.json();
        let message = "Workout plan successfully ";
        if (route && route.params.plan) {
          message += "updated.";
        } else {
          message += "created.";
        }
        setSuccessMessage(message);

        // Retrieve existing plans from local storage
        const existingPlans = await AsyncStorage.getItem("workoutPlans");
        const plans = existingPlans ? JSON.parse(existingPlans) : [];

        if (route && route.params.plan) {
          // Update existing plan in the local storage
          const updatedPlans = plans.map((plan) =>
            plan.id === route.params.plan.id ? { ...plan, ...data } : plan
          );
          await AsyncStorage.setItem(
            "workoutPlans",
            JSON.stringify(updatedPlans)
          );
        } else {
          // Append the new plan to the existing plans in local storage
          plans.push(data);
          await AsyncStorage.setItem("workoutPlans", JSON.stringify(plans));
        }

        setErrorMessage("");
        setName("");
        setStartDate(new Date());
        setEndDate(new Date());
        setreRender(!reRender);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        if (route) {
          navigation.goBack();
        }
      } else {
        setErrorMessage("Failed to create/update workout plan.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error creating/updating workout plan.");
      setSuccessMessage("");
    }
  };

  return (
    <View className="p-4">
      {route && (
        <View className="flex-row justify-between ">
          <Text className="font-bold text-xl mb-4">Edit Plan</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="cancel" size={24} color="#38A3A5" />
          </TouchableOpacity>
        </View>
      )}
      <Text className="font-bold mb-2">Workout Plan Name</Text>
      <TextInput
        className="border border-gray-400 rounded px-4 py-2 mb-4 placeholder-gray-500 text-black text-md"
        placeholder="Workout Plan 1"
        value={name}
        onChangeText={setName}
      />
      <View className="mb-4">
        <Text className="font-bold mb-2">Start Date</Text>
        <TouchableOpacity
          onPress={() => setShowStartDatePicker(!showStartDatePicker)}
          className="border border-gray-400 rounded px-4 py-2 "
        >
          <Text>{startDate.toDateString()}</Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="spinner"
            onChange={handleStartDateChange}
          />
        )}
      </View>
      <View className="mb-4">
        <Text className="font-bold mb-2">End Date</Text>
        <TouchableOpacity
          onPress={() => setShowEndDatePicker(!showEndDatePicker)}
          className="border border-gray-400 rounded px-4 py-2 mb-4"
        >
          <Text>{endDate.toDateString()}</Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="spinner"
            onChange={handleEndDateChange}
          />
        )}
      </View>
      {successMessage ? (
        <View className="bg-green-300 p-3 rounded-lg mb-2">
          <Text className="">{successMessage}</Text>
        </View>
      ) : null}
      {errorMessage ? (
        <Text className="bg-red-300 p-3 rounded-lg mb-2">{errorMessage}</Text>
      ) : null}
      <CustomButton
        title={route ? "Update Plan" : "Create Plan"}
        onPress={createPlan}
      />
    </View>
  );
}
