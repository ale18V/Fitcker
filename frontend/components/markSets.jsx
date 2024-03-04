import * as React from "react";
import { useState, } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';
import WorkoutSelect from "./workoutSelect.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MarkSets = () => {

  const [routine, setRoutine] = React.useState("");
  const [workout, setWorkout] = React.useState("");
  const [showTemplates, setShowTemplates] = useState(false);



  const [checkboxes, setCheckboxes] = useState([
    { label: 'Option 1', checked: false },
    { label: 'Option 2', checked: false },
    { label: 'Option 3', checked: false },
  ]);

  const toggleCheckbox = (index) => {
    const updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setCheckboxes(updatedCheckboxes);
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

      {showTemplates && <WorkoutSelect routine={routine} setRoutine={setRoutine} workout={workout} setWorkout={setWorkout} />}

      <View style={styles.row}>

      </View>

      <View style={styles.row}>

      </View>

      {/* <View style={styles.checkRow}>
                      {checkboxes.map((checkbox, index) => (
                        <View key={index} style={styles.checkboxContainer}>
                          <Checkbox
                            value={checkbox.checked}
                            onValueChange={() => toggleCheckbox(index)}
                          />
                        </View>
                      ))}
                      </View> */}

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
    margin: 10,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
});

export default MarkSets;

