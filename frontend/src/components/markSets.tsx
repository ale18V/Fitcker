import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import WorkoutSelect from "./workoutSelect.tsx";

const MarkSets = () => {
  const [routine, setRoutine] = React.useState(null);
  const [workout, setWorkout] = React.useState(null);
  const [weight, setWeight] = React.useState("");
  const [sets, setSets] = React.useState("");
  const [reps, setReps] = React.useState("");
  const [rest, setRest] = React.useState("");
  const [note, setNote] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        const storedTemplates = await AsyncStorage.getItem(
          username + "workoutNotes"
        );
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
        return element.routine === routine && element.workout === workout;
      });

      if (index >= 0 && index < notes.length) {
        setWeight(notes[index].weight);
        setReps(notes[index].reps);
        setRest(notes[index].rest);
        setSets(notes[index].sets);
        if (notes[index].note != "undefined") {
          setNote(notes[index].note);
        }
      } else {
        setWeight("");
        setReps("");
        setRest("");
        setSets("");
        setNote("");
      }
    };

    findNote();
  }, [setWorkout, setRoutine, routine, workout]);

  const saveNotes = async () => {
    var index = notes.findIndex(function (element) {
      return element.routine === routine && element.workout === workout;
    });

    if (index >= 0 && index < notes.length) {
      saveEditedNote();
    } else {
      try {
        const newTemplate = {
          workout: workout,
          routine: routine,
          weight: weight,
          sets: sets,
          reps: reps,
          rest: rest,
          note: note,
        };
        let updatedTemplates = [];
        const username = await AsyncStorage.getItem("username");
        const storedTemplates = await AsyncStorage.getItem(
          username + "workoutNotes"
        );
        if (storedTemplates !== null) {
          updatedTemplates = JSON.parse(storedTemplates);
        }
        updatedTemplates.push(newTemplate);
        await AsyncStorage.setItem(
          username + "workoutNotes",
          JSON.stringify(updatedTemplates)
        );
        //alert(JSON.stringify(newTemplate));
      } catch (error) {
        console.error("Error saving template:", error);
      }
    }
  };

  const saveEditedNote = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      const updatedTemplates = [...notes];
      var index = updatedTemplates.findIndex(function (element) {
        return element.routine === routine && element.workout === workout;
      });
      updatedTemplates[index] = {
        workout: workout,
        routine: routine,
        weight: weight,
        sets: sets,
        reps: reps,
        rest: rest,
        note: note,
      };
      await AsyncStorage.setItem(
        username + "workoutNotes",
        JSON.stringify(updatedTemplates)
      );

      console.log("Notes edited successfully");
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <View style={styles.container}>
      {
        <TouchableOpacity onPress={() => setShowTemplates(!showTemplates)}>
          <View style={styles.row}>
            <Text style={styles.header}>Workout Notes</Text>
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
        </TouchableOpacity>
      }

      {showTemplates && (
        <View>
          <WorkoutSelect
            routineId={routine}
            setRoutineId={setRoutine}
            workout={workout}
            setWorkout={setWorkout}
          />

          <Text>Weight: </Text>
          <TextInput
            style={styles.input}
            value={weight}
            placeholder={
              "weight lifted in whatever units you want (default is pounds)"
            }
            onChangeText={(text) => {
              setWeight(text);
            }}
          />

          <Text>Sets: </Text>
          <TextInput
            style={styles.input}
            value={sets}
            placeholder={"number of sets done"}
            onChangeText={(text) => {
              setSets(text);
            }}
          />

          <Text>Reps: </Text>
          <TextInput
            style={styles.input}
            value={reps}
            placeholder={"numbers of reps in each set"}
            onChangeText={(text) => {
              setReps(text);
            }}
          />

          <Text>Rest: </Text>
          <TextInput
            style={styles.input}
            value={rest}
            placeholder={"seconds of rest between sets"}
            onChangeText={(text) => {
              setRest(text);
            }}
          />

          <Text>Notes: </Text>
          <TextInput
            style={styles.input2}
            value={note}
            placeholder={"Feel free to write down notes here to refer back to"}
            onChangeText={(text) => {
              setNote(text);
            }}
            multiline={true}
          />

          <View style={styles.button}>
            <Button color="#f3fff5" title="Save Notes" onPress={saveNotes} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
    textAlign: "left",
    margin: 10,
    fontWeight: "bold",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 16,
    margin: 30,
    textAlign: "left",
    justifyContent: "flex-start",
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#58a1a3",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    marginTop: 10,
    marginLeft: 20,
    color: "#f3fff5",
    backgroundColor: "#58a1a3",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 0,
    backgroundColor: "#white",
  },
  initView: {
    marginLeft: 4,
    marginVertical: 1,
  },
  header: {
    fontSize: 30,
    textAlign: "left",
    margin: 5,
    fontWeight: "bold",
    justifyContent: "flex-start",
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
  },
  input2: {
    height: 300,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    alignContent: "flex-start",
    textAlignVertical: "top",
  },
});

export default MarkSets;
