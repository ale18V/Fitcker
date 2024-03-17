import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function myRoutines({ reRender, navigation }) {
  const [routines, setRoutines] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loadedFromServer, setLoadedFromServer] = useState(true);

  const navigateToEditRoutine = (routine) => {
    console.log(routine);
    navigation.navigate("EditRoutine", { routine });
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        // Check if data is already loaded from the server
        if (!loadedFromServer) {
          const token = await AsyncStorage.getItem("access_token");
          let response = await fetch("http://localhost:8000/api/v1/routines/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            setRoutines(data);
            await AsyncStorage.setItem("routines", JSON.stringify(data));
            setLoadedFromServer(true);
          }
        } else {
          const routinesString = await AsyncStorage.getItem("routines");
          if (routinesString) {
            const routines = JSON.parse(routinesString);
            setRoutines(routines);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRoutines();
  }, [reRender]);

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={toggleExpanded}
        className="flex-row justify-between items-center"
      >
        <Text className="font-bold text-2xl m-4">My Routines</Text>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-up"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {expanded && (
        <View className="p-4">
          {routines.length > 0 ? (
            routines.map((routine) => (
              <TouchableOpacity
                key={routine.id}
                onPress={() => navigateToEditRoutine(routine)}
              >
                <LinearGradient
                  colors={[
                    "rgba(56, 163, 165, 0.5)",
                    "rgba(128, 237, 153, 0.5)",
                  ]}
                  className="p-4 rounded-xl mb-4"
                >
                  <View className="text-lg flex-row items-center justify-between">
                    <Text className="font-bold ">{routine.name}</Text>
                    <MaterialIcons name="edit" size={20} color="teal" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No routines exist.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}
