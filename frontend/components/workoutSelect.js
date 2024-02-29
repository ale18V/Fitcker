import * as React from "react";
import { View, StyleSheet, } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import Constants from 'expo-constants';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const WorkoutSelect = (props) => {
  //const [routine, setRoutine] = React.useState("crd");
  //const [workout, setWorkout] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const routines = [
    { key: 'crd', value: 'Cardio' },
    { key: 'flx', value: 'Flexibility' },
    { key: 'str', value: 'Strength' },
    { key: 'lgdy', value: 'Leg Day' },
    { key: 'tu', value: 'Tuesdays' },
    { key: 'th', value: 'Thursdays' },
    { key: '30m', value: '30 minute' },
  ]
  const workouts = {
    'crd': [
      { key: 'crd1', value: 'Squat Jump' },
      { key: 'crd2', value: 'Mountain Climber' },
      { key: 'crd3', value: 'Running' },
    ],
    'flx': [
      { key: 'flx1', value: 'Yoga' },
      { key: 'flx2', value: 'Pilates' },
      { key: 'flx3', value: 'Lunge with Spinal Twist' },
    ],
    'str': [
      { key: 'str1', value: 'Deadlift' },
      { key: 'str2', value: 'Walking Lunge' },
      { key: 'str3', value: 'Bench Press' },
    ],
    'lgdy': [
      { key: 'lgdy1', value: 'Back Squat' },
      { key: 'lgdy2', value: 'Leg Press' },
      { key: 'lgdy3', value: 'Leg Curl' },
    ],
    'tu': [
      { key: 'tu1', value: 'Incline Jog' },
      { key: 'tu2', value: 'Push-ups' },
      { key: 'tu3', value: 'Squats' },
    ],
    'th': [
      { key: 'th1', value: 'Pull-ups' },
      { key: 'th2', value: 'Spider Curl' },
      { key: 'th3', value: 'Bench Dip' },
    ],
    '30m': [
      { key: '30m1', value: 'Walking Lunge' },
      { key: '30m2', value: 'Romanian Deadlift' },
      { key: '30m3', value: 'Suitcase Carry' },
    ]
  }


  return (

    <View>

      <SelectList setSelected={props.setRoutine} data={routines} placeholder={"Select your workout plan!"}
        defaultOption={{ key: 'crd', value: 'Cardio' }} />

      <SelectList setSelected={props.setWorkout} data={workouts[props.routine]} placeholder={"Select your workout plan!"}
        defaultOption={workouts[props.routine][0]} />

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

