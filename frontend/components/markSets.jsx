import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import WorkoutSelect from "./workoutSelect.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "react-hook-form";

const MarkSets = () => {

  const [routine, setRoutine] = useState("");
  const [workout, setWorkout] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [rest, setRest] = useState("");

  const [showTemplates, setShowTemplates] = useState(false);
  const [notes, setNotes] = useState([]);
  //const [username2, setUsername2] = useState("");

  useEffect(() => {
    const loadWorkoutTemplates = async () => {
      try {
        const username = await AsyncStorage.getItem("username");  
        const storedTemplates = await AsyncStorage.getItem(username+"@workoutNotes");
        if (storedTemplates !== null) {
          setNotes(JSON.parse(storedTemplates));
        }
      } catch (error) {
        console.error("Error loading workout notes:", error);
      }
    };

/*     const getUsernameFromApi = async () => {
      try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem("access_token");

        if (token) {
          // Make a GET request to the API endpoint with the token included in the Authorization header
          const response = await fetch(
            "http://localhost:8000/api/v1/users/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            // Extract the username from the response data
            console.log(data);
            setUsername(data.username);
          } else {
            // Handle error when API request fails
            throw new Error("Failed to fetch user profile");
          }
        } else {
          // Handle case when token is not found in AsyncStorage
          throw new Error("Token not found");
        }
      } catch (error) {
        console.error(error);
      }
    }; */

    const findNote = async () => {
      //await getUsernameFromApi();
      await loadWorkoutTemplates();

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
    //setUsername2(username);
  }, [setWorkout, setRoutine]);

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
      const username = await AsyncStorage.getItem("username"); 
      const storedTemplates = await AsyncStorage.getItem(username+"@workoutNotes");
      if (storedTemplates !== null) {
        updatedTemplates = JSON.parse(storedTemplates);
      }
      updatedTemplates.push(newTemplate);
      await AsyncStorage.setItem(
        username+"@workoutNotes",
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
      //const token = await AsyncStorage.getItem("access_token");
      
      const updatedTemplates = [...notes];
      var index = updatedTemplates.findIndex(function (element) {
        return (element.routine === routine && element.workout===workout)
      })
      updatedTemplates[index] = { workout: workout, routine: routine, weight: weight,
        sets: sets, reps: reps, rest: rest, };
        const username = await AsyncStorage.getItem("username"); 
      await AsyncStorage.setItem(
        username+"@workoutNotes",
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

      {showTemplates && <View>
      <WorkoutSelect routine={routine} setRoutine={setRoutine} workout={workout} setWorkout={setWorkout}/>

      <Text>Weight: </Text>
      <TextInput style={styles.input}
        value={weight}
        placeholder={''}
        onChangeText={(text) => {
          setWeight(text);
        }} />

      <Text>Sets: </Text>
      <TextInput style={styles.input}
        value={sets}
        placeholder={''}
        onChangeText={(text) => {
          setSets(text);
        }} />


      <Text>Reps: </Text>
      <TextInput style={styles.input}
        value={reps}
        placeholder={''}
        onChangeText={(text) => {
          setReps(text);
        }} />

      <Text>Rest: </Text>
      <TextInput style={styles.input}
        value={rest}
        placeholder={''}
        onChangeText={(text) => {
          setRest(text);
        }} />

      <View style={styles.button}>
      <Button
        color="#f3fff5"
        title="Save Notes"
        onPress={saveNotes}
      />
      </View>
      </View>}


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
  button: {
    marginTop: 20,
    color: '#f3fff5',
    height: 40,
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
  input: {
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
  },
});

export default MarkSets;

