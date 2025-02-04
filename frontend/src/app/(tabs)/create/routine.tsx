import { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
import { RoutinesService } from "$/api";
import routines from "$/stores/routines";
import plans from "$/stores/plans";


const CreateRoutine = () => {
  const [name, setName] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const workoutPlans = plans.use.plans();
  

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const addRoutine = routines.use.addRoutine();
  const createRoutine = async () => {
    if (!name || !selectedPlanId) {
      setErrorMessage("Name and Workout Plan are required.");
      setSuccessMessage("");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    try {
      const response = await RoutinesService.postRoutines({
        body: {
          name
        }
      })
      if (response.data) {

        addRoutine(response.data);
        setSuccessMessage("Routine successfully created.");
        setErrorMessage("");
        // Clear form fields
        setName("");
        setSelectedPlanId(null);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage("Failed to create routine.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Error creating routine.");
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
            placeholder="Leg Day"
            value={name}
            onChangeText={setName}
          />
          <Text className="font-bold mb-2">Select Workout Plan</Text>
          <View className="border border-gray-400 rounded ">
            <RNPickerSelect
              onValueChange={(value) => setSelectedPlanId(value)}
              items={Object.entries(workoutPlans || {}).map(([id, plan]) => ({
                label: plan.name || "Unnamed Plan",
                value: id,
              }))}
              style={{
                inputIOS: {
                  fontSize: 16,
                  paddingVertical: 12,
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
          <Button title="Create Routine" testID="routineButton" onPress={createRoutine} />
        </View>
      )}
    </ScrollView>
  );
};

export default CreateRoutine;
