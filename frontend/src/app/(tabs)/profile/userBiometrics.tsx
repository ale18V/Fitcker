import { useState, FunctionComponent, useMemo } from "react";
import { Text, View, TouchableOpacity, TextInput, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import user, { useUser } from "$/stores/user";
import { calculateBMI } from "$/utils/stats";
import { Controller, useForm } from "react-hook-form";

const UserBiometrics: FunctionComponent = () => {
  const { heightCM, weightKG } = useUser((s) => ({
    heightCM: s.heightCM,
    weightKG: s.weightKG,
  }));

  const [isEditing, setIsEditing] = useState(false);

  const bmi = useMemo(
    () => (heightCM && weightKG && calculateBMI(heightCM, weightKG, true)) || 0,
    [heightCM, weightKG]
  );

  /* const toggleUnitSystem = () => {
    setIsMetric((isMetric) => {
      const updatedValue = !isMetric;
      if (!updatedValue) {
        setHeight(Math.round(height * 2.54)); // Convert height to cm
        setWeight(Math.round(weight * 0.45359237)); // Convert weight to kg
      } else {
        setHeight((height / 2.54).toFixed(2)); // Convert height to inches
        setWeight(Math.round(weight / 0.45359237)); // Convert weight to lbs
      }
      !prevState
    });
  };*/

  const { control, handleSubmit } = useForm<{ height: number; weight: number }>(
    {
      defaultValues: {
        height: heightCM,
        weight: weightKG,
      },
    }
  );
  return (
    <View className="flex-1 mx-10 justify-center items-center">
      <View className="w-full">
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Height: </Text>
            <Controller
              control={control}
              name="height"
              render={({ field }) => (
                <TextInput
                  value={String(field.value)}
                  onChangeText={(text) => {
                    if (!isNaN(+text)) {
                      field.onChange(+text);
                    }
                  }}
                  keyboardType="numeric"
                  style={{
                    borderWidth: 1,
                    borderRadius: 3,
                    padding: 5,
                    width: 100,
                    borderColor: "#58a1a3",
                    marginRight: 5,
                  }}
                />
              )}
            />
            <Text>{"cm"}</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Weight: </Text>
            <Controller
              control={control}
              name="weight"
              render={({ field }) => (
                <TextInput
                  value={String(field.value)}
                  onChangeText={(text) => {
                    if (!isNaN(+text)) {
                      field.onChange(+text);
                    }
                  }}
                  keyboardType="numeric"
                  style={{
                    borderWidth: 1,
                    borderRadius: 3,
                    padding: 5,
                    width: 100,
                    borderColor: "#58a1a3",
                    marginRight: 5,
                  }}
                />
              )}
            />
            <Text>kg</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">BMI: </Text>
            <Text>{bmi.toFixed(2)}</Text>
          </View>
        </LinearGradient>
      </View>

      {!isEditing && (
        <TouchableOpacity
          style={{ padding: 10, margin: 10 }}
          onPress={() => setIsEditing(true)}
        >
          <LinearGradient
            colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
            className="flex-row items-center p-4 rounded-xl justify-between mb-4"
          >
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="file-edit" size={20} />
              <Text className="font-bold ml-2">Enable Editing</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {isEditing && (
        <TouchableOpacity
          style={{ padding: 10, margin: 10 }}
          onPress={handleSubmit(({ height, weight }) => {
            user.setState((s) => ({
              ...s,
              heightCM: height,
              weightKG: weight,
            }));
            setIsEditing(false);
          })}
        >
          <LinearGradient
            colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
            className="flex-row items-center p-4 rounded-xl justify-between mb-4"
          >
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="file-edit" size={20} />
              <Text className="font-bold ml-2">
                Stop Editing And Save Biometrics
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}
      <Button title="Toggle Unit System" onPress={() => {}} />
    </View>
  );
};

export default UserBiometrics;
