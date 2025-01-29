import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserBiometrics({ biometrics }) {
  const [height, setHeight] = useState(biometrics.heightCM);
  const [weight, setWeight] = useState(biometrics.weightKG);
  const [isMetric, setIsMetric] = useState(true);
  const [bmi, setBMI] = useState(0.0);
  const [isEditing, setIsEditing] = useState(false);
 
  useEffect(() => {
    const calculateBMI = (height, weight) => {
      if (isMetric) {
      const heightM = height / 100; // Convert height to meters
      return weight / (heightM * heightM);
      }

      else {
        return 703 * (weight/ (height * height))
      }
    };
    setBMI(calculateBMI(height, weight));
  }, [height, weight]);

  useEffect(() => {
    const retrieveBiometricsFromStorage = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        const biometricsData = await AsyncStorage.getItem(username+'@biometrics');
        if (biometricsData !== null) {
          const { heightCM, weightKG } = JSON.parse(biometricsData);
          setHeight(heightCM);
          setWeight(weightKG);
        }
      } catch (error) {
        console.error('Error retrieving biometrics data:', error);
      }
    };

    retrieveBiometricsFromStorage();
  }, []);

  const toggleUnitSystem = () => {
    setIsMetric(prevState => !prevState);
    if (!isMetric) {
      setHeight(Math.round(height * 2.54)); // Convert height to cm
      setWeight(Math.round(weight * 0.45359237)); // Convert weight to kg
    } 
    else {
      setHeight((height / 2.54).toFixed(2)); // Convert height to inches
      setWeight(Math.round(weight / 0.45359237)); // Convert weight to lbs
    }
  };


  const saveBiometricsToStorage = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      if (!isMetric) {
        tempHeight = height / 2.54; // Convert height to cm
        tempWeight = weight / 0.45359237; // Convert weight to kg
      }
      else {
        tempHeight = height;
        tempWeight = weight;
      }
      const biometricsData = { heightCM: tempHeight, weightKG: tempWeight };
      await AsyncStorage.setItem(username+'@biometrics', JSON.stringify(biometricsData));
      alert("saved" + biometricsData);
    } catch (error) {
      console.error('Error saving biometrics data:', error);
    }
  };


  return (
    <View className="flex-1 mx-10 justify-center items-center">
      <View className="w-full">
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Height: </Text>
            <TextInput
              editable={isEditing}
              value={String(height)}
              onChangeText={setHeight}
              keyboardType="numeric"
              style={{ borderWidth: 1, borderRadius: 3, padding: 5, width: 100, borderColor: '#58a1a3', marginRight: 5, }}
            />
            <Text>{isMetric ? 'cm' : 'in'}</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Weight: </Text>
            <TextInput
              editable={isEditing}
              value={String(weight)}
              onChangeText={setWeight}
              keyboardType="numeric"
              style={{ borderWidth: 1, borderRadius: 3, padding: 5, width: 100, borderColor: '#58a1a3', marginRight: 5, }}
            />
            <Text>{isMetric ? 'kg' : 'lbs'}</Text>
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

      {!isEditing && <TouchableOpacity style={{padding: 10, margin: 10,}} onPress={() => setIsEditing(true)}>
                <LinearGradient
                  colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
                  className="flex-row items-center p-4 rounded-xl justify-between mb-4"
                >
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="file-edit" size={20} />
                    <Text className="font-bold ml-2">Enable Editing</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>}

              {isEditing && <TouchableOpacity style={{padding: 10, margin: 10,}} onPress={() => {setIsEditing(false); saveBiometricsToStorage();}}>
                <LinearGradient
                  colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
                  className="flex-row items-center p-4 rounded-xl justify-between mb-4"
                >
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="file-edit" size={20} />
                    <Text className="font-bold ml-2">Stop Editing And Save Biometrics</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>}
      <Button title="Toggle Unit System" onPress={() => toggleUnitSystem()} />
    </View>
  );
}
