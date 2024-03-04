import * as React from "react";
import { useState, useEffect, } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MarkSets from "../components/markSets";
import WorkoutInput from "../components/workoutInput";
import { MaterialIcons } from "@expo/vector-icons";


export default function LogTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [workoutTemplates, setWorkoutTemplates] = useState([]);


  const done = (status) => {
    setIsOpen(status);
  }

   useEffect(() => {
    const loadWorkoutTemplates = async () => {
      try {
        const storedTemplates = await AsyncStorage.getItem("workoutTemplates");
        if (storedTemplates !== null) {
          setWorkoutTemplates(JSON.parse(storedTemplates));
        }
      } catch (error) {
        console.error("Error loading workout templates:", error);
        setError(true);
      }
    };
    loadWorkoutTemplates();
  }, [])



  return (
    <ScrollView style={styles.container}>

      <MarkSets></MarkSets>


      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.row}>
          <Text style={styles.label}>Log Exercises</Text>
          <MaterialIcons
            name={
              isOpen === true
                ? ""
                : "keyboard-arrow-down"
            }
            size={24}
            color="black"
          />
        </View>
      </TouchableOpacity>
      {isOpen && !error && <WorkoutInput toggle={done}></WorkoutInput>}
      {error && <Text>No workout templates made yet!!</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    /* backgroundColor: '#f3fff5', */
  },
  label: {
    fontSize: 30,
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#58a1a3',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 20,
  },

});

/* add in data validation
 when clicking done, validate data
  1) if invalid, do nothing and output error msg to redo one or multiple inputs
  2) if valid, post to database and then clear states 
 get data from database (workout ids, routine ids, plan ids, names)

rework useEffect to check if plan exists or not (globalState ? or require user to make one plan before using other tabs)

if no plan exists, don't even use either component
 */