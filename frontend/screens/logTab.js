import * as React from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, Button } from "react-native";
import {SelectList, MultipleSelectList }from 'react-native-dropdown-select-list'
import { LinearGradient } from 'expo-linear-gradient';

const WorkoutInput = () => {

  const [weight,setWeight] = React.useState(null);
  const [reps,setReps] = React.useState(null);
  const [sets,setSets] = React.useState(null);
  const [time,setTime] = React.useState(null);
  const [cals,setCals] = React.useState(null);
  const [plan, setPlan] = React.useState("crd");
  const [workout,setWorkout] = React.useState("");
  
  const plans = [
    {key:'crd', value:'Cardio'},
    {key:'flx', value:'Flexibility'},
    {key:'str', value:'Strength'},
    {key:'lgdy', value:'Leg Day'},
    {key:'tu', value:'Tuesdays'},
    {key:'th', value:'Thursdays'},
    {key:'30m', value:'30 minute'},
  ]

  const workouts = {
    'crd':[
      {key:'crd1', value:'Squat Jump'},
      {key:'crd2', value:'Mountain Climber'},
      {key:'crd3', value:'Running'},
    ],
    'flx':[
      {key:'flx1', value:'Yoga'},
      {key:'flx2', value:'Pilates'},
      {key:'flx3', value:'Lunge with Spinal Twist'},
    ],
    'str':[
      {key:'str1', value:'Deadlift'},
      {key:'str2', value:'Walking Lunge'},
      {key:'str3', value:'Bench Press'},
    ],
    'lgdy':[
      {key:'lgdy1', value:'Back Squat'},
      {key:'lgdy2', value:'Leg Press'},
      {key:'lgdy3', value:'Leg Curl'},
    ],
    'tu':[
      {key:'tu1', value:'Incline Jog'},
      {key:'tu2', value:'Push-ups'},
      {key:'tu3', value:'Squats'},
    ],
    'th':[
      {key:'th1', value:'Pull-ups'},
      {key:'th2', value:'Spider Curl'},
      {key:'th3', value:'Bench Dip'},
    ],
    '30m':[
      {key:'30m1', value:'Walking Lunge'},
      {key:'30m2', value:'Romanian Deadlift'},
      {key:'30m3', value:'Suitcase Carry'},
    ]
  }

  function clear() {
    setWeight("");
    setReps("");
    setTime("");
    setCals("");
    setSets("");
  }



  return(
    <View style={{paddingHorizontal:15,marginTop:15}}>


      <SelectList setSelected={setPlan} data={plans} placeholder = {"Select your workout plan!"} onSelect={clear}
          defaultOption = {{key:'crd', value:'Cardio'}}  />

      <SelectList setSelected={setWorkout} data={workouts[plan]} placeholder = {"Select your workout plan!"} onSelect={clear}
          defaultOption = {workouts[plan][0]}  />

      <Text>Weight lifted: </Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setWeight(value)}
        value={weight}
        placeholder="Input weight lifted in lbs!"
        keyboardType="numeric"
        returnKeyType='done'
      />
      <Text>Reps done: </Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setReps(value)}
        value={reps}
        placeholder="Input how many reps you did in each set!"
        keyboardType="numeric"
        returnKeyType='done'
      />
      <Text>Sets done: </Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setSets(value)}
        value={sets}
        placeholder="Input how many sets you completed!"
        keyboardType="numeric"
        returnKeyType='done'
      />
      <Text>Time taken: </Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setTime(value)}
        value={time}
        placeholder="Input time taken in minutes!"
        keyboardType="numeric"
        returnKeyType='done'
      />
      <Text>Calories burned: </Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setCals(value)}
        value={cals}
        placeholder="Input calories burned!"
        keyboardType="numeric"
        returnKeyType='done'
      />

    </View>
    
  )

};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default function LogTab() {
  const [isOpen, setIsOpen] = React.useState(false);

  function open() {
    setIsOpen((isOpen) => true);
  }

  function done() {
    setIsOpen((isOpen) => false);
  }

  return (
    <View className="flex-1 justify-center items-center">
      <LinearGradient
        // Background Linear Gradient
        colors={['#FFFFFF', '#8DE0D3', '#93CBF1']}
        style={styles.background}
      >
      { !isOpen && 
      <Button
        onPress={open}
        title="Add a workout"
        color="#841584"
      /> }
      {isOpen && <WorkoutInput></WorkoutInput>}
      { isOpen && 
      <Button
        onPress={done}
        title="Done"
        color="#841584"
      /> }
      </LinearGradient>
    </View>
  );
}

/* add in data validation
 when clicking done, validate data
  1) if invalid, do nothing and output error msg to redo one or multiple inputs
  2) if valid, post to database and then clear states 
 get data from database (workout ids, routine ids, plan ids, names)

 questions :
 should each workout have same options 
 what types of workouts will we accomodate
 plans vs routines
 how to submit data (webserver or not // which api to use)
 testing (how, what, where)
  - possible framworks
  : detox - e2e testing with simulator
  : jest - unit test, integration test, etc.
  : typescript - typechecking
  : eslint - style/syntax errors */