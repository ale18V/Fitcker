import * as React from "react";
import { useState, useEffect} from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
//import Checkbox from 'expo-checkbox';
import WorkoutSelect from "./workoutSelect.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MarkSets = () => {

  const [routine, setRoutine] = React.useState(null);
  const [workout, setWorkout] = React.useState(null);
  const [weight, setWeight] = React.useState("");
  const [sets, setSets] = React.useState("");
  const [reps, setReps] = React.useState("");
  const [rest, setRest] = React.useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedTemplates = await AsyncStorage.getItem("workoutNotes");
        if (storedTemplates !== null) {
          setNotes(JSON.parse(storedTemplates));
        }
      } catch (error) {
        console.error("Error loading workout notes:", error);
      }
    };

    const findNote = async () => {
      await loadNotes();

      var index = notes.findIndex(function (element) {
        return (element.routine === routine && element.workout===workout)
      })

      if (index >= 0 && index < notes.length) {

      setWeight(notes[index].weight);
      setReps(notes[index].reps);
      setRest(notes[index].rest);
      setSets(notes[index].sets);
      }
      else{
      setWeight("");
      setReps("");
      setRest("");
      setSets("");
      }
    }

    findNote();
  }, [setWorkout, setRoutine, routine, workout]);


  const saveNotes = async () => {
    var index = notes.findIndex(function (element) {
      return (element.routine === routine && element.workout===workout)
    })

    if (index >= 0 && index < notes.length) {
      saveEditedExercise();
    }
    else {

    try {

      const newTemplate = { workout: workout, routine: routine, weight: weight,
                               sets: sets, reps: reps, rest: rest, };
      let updatedTemplates = [];
      const storedTemplates = await AsyncStorage.getItem("workoutNotes");
      if (storedTemplates !== null) {
        updatedTemplates = JSON.parse(storedTemplates);
      }
      updatedTemplates.push(newTemplate);
      await AsyncStorage.setItem(
        "workoutNotes",
        JSON.stringify(updatedTemplates)
      );
      //alert(JSON.stringify(newTemplate));
    }

    catch (error) {
      console.error("Error saving template:", error);
    }
  }

  }


  const saveEditedNote = async () => {
    try {
      const updatedTemplates = [...notes];
      var index = updatedTemplates.findIndex(function (element) {
        return (element.routine === routine && element.workout===workout)
      })
      updatedTemplates[index] = { workout: workout, routine: routine, weight: weight,
        sets: sets, reps: reps, rest: rest, };
      await AsyncStorage.setItem(
        "workoutNotes",
        JSON.stringify(updatedTemplates)
      );
      setWorkoutTemplates(updatedTemplates);
      setEditingIndex(null);
      console.log("Exercise edited successfully");
    } catch (error) {
      console.error("Error editing exercise:", error);
    }
  };

  return (
    <View style={styles.container}>
      {<TouchableOpacity onPress={() => setShowTemplates(!showTemplates)}>
        <View style={styles.row}>
          <Text style={styles.header}>My Workouts</Text>
          <MaterialIcons
            name={
              showTemplates === true
                ? "keyboard-arrow-up"
                : "keyboard-arrow-down"
            }
            size={24}
            color="black"
          />

        </View>
      </TouchableOpacity>}

      {showTemplates && <WorkoutSelect setRoutine={setRoutine} setWorkout={setWorkout} />}



    </View> 
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 16,
    margin: 30,
    textAlign: 'left',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#58a1a3',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  checkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    marginLeft: 20,
    color: '#f3fff5',
    backgroundColor: '#58a1a3',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#white',
  },
  initView: {
    marginLeft: 4,
    marginVertical: 1,
  },
  header: {
    fontSize: 30,
    textAlign: 'left',
    margin: 5,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
});

export default MarkSets;

