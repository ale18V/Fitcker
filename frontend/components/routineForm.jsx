import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import CustomButton from "./customButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function routineForm({
  navigation,
  route,
  reRender,
  setreRender,
}) {
  const [name, setName] = useState(route ? route.params.routine.name : "");
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch workout plans from local storage
    const fetchWorkoutPlans = async () => {
      try {
        const plansString = await AsyncStorage.getItem("workoutPlans");
        if (plansString) {
          const plans = JSON.parse(plansString);
          setWorkoutPlans(plans);
        }
      } catch (error) {
        console.error("Error fetching workout plans:", error);
      }
    };

    fetchWorkoutPlans();
  }, [reRender]);

  const createRoutine = async () => {
    if (!name || (!route && !selectedPlanId)) {
      setErrorMessage("Name and Workout Plan are required.");
      setSuccessMessage("");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    const routineData = {
      name: name,
      plan_id: selectedPlanId,
    };

    try {
      const token = await AsyncStorage.getItem("access_token");
      let response;

      // Determine the HTTP method based on whether a route is provided
      if (route && route.params.routine) {
        // If route and plan ID are provided, it's a PATCH request
        const id = route.params.routine.id;
        response = await fetch("http://localhost:8000/api/v1/routines/" + id, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(routineData),
        });
      } else {
        // If no route or plan ID is provided, it's a POST request
        response = await fetch("http://localhost:8000/api/v1/routines/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(routineData),
        });
      }

      if (response.ok) {
        const data = await response.json();
        let message = "Routine successfully ";
        if (route && route.params.routine) {
          message += "updated.";
        } else {
          message += "created.";
        }
        setSuccessMessage(message);

        // Retrieve existing routines from local storage
        const existingRoutines = await AsyncStorage.getItem("routines");
        const routines = existingRoutines ? JSON.parse(existingRoutines) : [];

        if (route && route.params.routine) {
          // Update existing routine in the local storage
          const updatedRoutines = routines.map((routine) =>
            routine.id === route.params.routine.id
              ? { ...routine, ...data }
              : routine
          );
          await AsyncStorage.setItem(
            "routines",
            JSON.stringify(updatedRoutines)
          );
        } else {
          // Append the new routines to the existing routines in local storage
          routines.push(data);
          await AsyncStorage.setItem("routines", JSON.stringify(routines));
        }

        setErrorMessage("");
        setName("");
        setSelectedPlanId(null);
        setreRender(!reRender);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        if (route) {
          navigation.goBack();
        }
      } else {
        setErrorMessage("Failed to create/update routine.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error creating/updating routine.");
      setSuccessMessage("");
    }
  };

  return (
    <View className="p-4">
      {route && (
        <View className="flex-row justify-between ">
          <Text className="font-bold text-xl mb-4">Edit Routine</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="cancel" size={24} color="#38A3A5" />
          </TouchableOpacity>
        </View>
      )}
      <Text className="font-bold mb-2">Routine Name</Text>
      <TextInput
        className="border border-gray-400 rounded px-4 py-2 mb-4 placeholder-gray-500 text-black"
        placeholder="Leg Day"
        value={name}
        onChangeText={setName}
      />
      {!route && (
        <View>
          <Text className="font-bold mb-2">Select Workout Plan</Text>
          <View className="mb-4">
            <RNPickerSelect
              onValueChange={(value) => setSelectedPlanId(value)}
              items={workoutPlans.map((plan) => ({
                label: plan.name,
                value: plan.id,
              }))}
              style={{
                inputIOS: {
                  fontSize: 16,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 4,
                  color: "black",
                  paddingRight: 30,
                },
                inputAndroid: {
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderWidth: 0.5,
                  borderColor: "gray",
                  borderRadius: 8,
                  color: "black",
                  paddingRight: 30,
                },
                iconContainer: {
                  top: 10,
                  right: 12,
                },
              }}
              placeholder={{ label: "Select a workout plan", value: null }}
            />
          </View>
        </View>
      )}

      {successMessage ? (
        <View className="bg-green-300 p-3 rounded-lg mb-2">
          <Text>{successMessage}</Text>
        </View>
      ) : null}
      {errorMessage ? (
        <View className="bg-red-300 p-3 rounded-lg mb-2">
          <Text>{errorMessage}</Text>
        </View>
      ) : null}
      <CustomButton
        title={route ? "Update Routine" : "Create Routine"}
        onPress={createRoutine}
        width="40"
      />
    </View>
  );
}
