import * as React from "react";
import { useState, useEffect, } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

const WorkoutSelect = (props) => {
  
  const [workoutTemplates, setWorkoutTemplates] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [useCount, setUseCount] = useState(0);

  const routines = [];
  const updateRoutine = () => {
    workoutTemplates.map((template) => {
      var tempName = template.name;
      routines.push({ key: tempName, value: tempName });
      tempWorkout = [];
      workouts[tempName] = [];
      template.exercises.map((exercise) => {
        tempWorkout.push({ key: exercise, value: exercise });
      })
      workouts[tempName] = tempWorkout;
    })
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
      }
    };
    loadWorkoutTemplates();
    updateRoutine();
  }, [])


  const workouts = {};
  var tempWorkout = [];

  return (

    
    <View>
      {workoutTemplates.map((template) => {
      var tempName = template.name;
      routines.push({ key: tempName, value: tempName });
      tempWorkout = [];
      workouts[tempName] = [];
      template.exercises.map((exercise) => {
        tempWorkout.push({ key: exercise, value: exercise });
      })
      workouts[tempName] = tempWorkout;
    })}

      <SelectList setSelected={props.setRoutine} data={routines} placeholder={"Select your workout plan!"}
        defaultOption={routines[0]} onSelect={() => {{setUseCount(useCount+1)}}}/>

      {useCount === 0 && <SelectList setSelected={props.setWorkout} data={workouts[props.routine]}
        placeholder={"Select your workout plan!"} />}
      
      {useCount != 0 && <SelectList setSelected={props.setWorkout} data={workouts[props.routine]}
        placeholder={"Select your workout plan!"} defaultOption={workouts[props.routine][0]}/>}

      
      {/* {alert(JSON.stringify(workouts))} */}
    </View> 
  ) 

};

const styles = StyleSheet.create({
  label: {
    color: 'black',
    margin: 20,
    marginLeft: 0,
  },
  text: {
    color: 'red',
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: '#f3fff5',
    height: 40,
    backgroundColor: '#58a1a3',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#white',
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
  },
});


export default WorkoutSelect;

//figure out how to have second list automatically change without using first state
/// used dummy start
