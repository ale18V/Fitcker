import { FunctionComponent, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { PlansService } from "$/api";
import Toast from "$/components/toast";
import { toISODateString } from "$/utils";

const CreateWorkoutPlan: FunctionComponent = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

    const response = await PlansService.postPlans({
      body: {
        name,
        start_date: toISODateString(startDate),
        end_date: toISODateString(endDate),
      },
    });
    if (response.data) {
      Toast.success({
        description: "Workout plan successfully created.",
      });
      // Clear form fields
      setName("");
      setStartDate(new Date());
      setEndDate(new Date());
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else {
      Toast.error({
        description: "Error creating workout plan.",
      });
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={toggleExpanded}
        className="flex-row justify-between items-center"
      >
        <Text className="font-bold text-2xl m-4">Create Workout Plan</Text>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-up"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {expanded && (
        <View className="p-4">
          <Text className="font-bold mb-2">Workout Plan Name</Text>
          <TextInput
            className="border border-gray-400 rounded px-4 py-2 mb-4 placeholder-gray-500"
            placeholder="Workout Plan 1"
            value={name}
            onChangeText={setName}
          />
          <View className="mb-4">
            <Text className="font-bold mb-2">Start Date</Text>
            <TouchableOpacity
              onPress={() => setShowStartDatePicker(!showStartDatePicker)}
              className="border border-gray-400 rounded px-4 py-2 mb-4"
            >
              <Text>{startDate.toDateString()}</Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  setShowStartDatePicker(false);
                  if (selectedDate) {
                    setStartDate(selectedDate);
                  }
                }}
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
                onChange={(event, selectedDate) => {
                  setShowEndDatePicker(false);
                  if (selectedDate) {
                    setEndDate(selectedDate);
                  }
                }}
              />
            )}
          </View>
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

export default CreateWorkoutPlan;
