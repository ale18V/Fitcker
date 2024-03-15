import * as React from "react";
<<<<<<< HEAD
import { useState, useEffect, } from "react";
import { Text, View, StyleSheet, Modal, ScrollView, Image, TouchableOpacity, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MarkSets from "../components/markSets";
import WorkoutInput from "../components/workoutInput";


export default function LogTab() {
  const [markModalVisible, setMarkModalVisible] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [error, setError] = useState(false);
  const [workoutTemplates, setWorkoutTemplates] = useState([]);


  const done = (status) => {
    setLogModal(status);
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
    <ScrollView style={styles.outerContainer}>

      <View style={styles.row}>
    <TouchableOpacity style={styles.touchable} onPress={() => setMarkModalVisible(true)}>
            <View style={styles.buttonContainer}>
            <Text style={styles.text}>My Workouts</Text>
            <Image
              source={require("../assets/icon1.png")} 
              style={styles.image}
              />
            </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchable} onPress={() => setLogModal(true)}>
            <View style={styles.buttonContainer}>
            <Text style={styles.text2}>Log Workouts</Text>
            <Image
              source={require("../assets/icon2.png")} 
              style={styles.logimage}
              resizeMode='contain'
              />
            </View>
        </TouchableOpacity>
        
        </View>

      <Modal 
        animationType="fade"
        transparent={true}
        visible={markModalVisible}
        onRequestClose={() => {
          setMarkModalVisible(false);
        }}
      >
        <ScrollView style={styles.modalContainer}>
          <View style={styles.container}>
            <MarkSets></MarkSets>
          </View>
          <View style={styles.container}>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setMarkModalVisible(false)}>
              <Text style={styles.text}>Close View</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Modal>

      <Modal 
        animationType="fade"
        transparent={true}
        visible={logModal}
        onRequestClose={() => {
          setLogModal(false);
        }}
      >
          <ScrollView style={styles.modalContainer}>
          <View style={styles.container}>
            {!error && <WorkoutInput toggle={done}></WorkoutInput>}
          </View>
          <View style={styles.container}>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setLogModal(false)}>
              <Text style={styles.text}>Close View</Text>
            </Pressable>
          </View>
        </ScrollView>

      </Modal>


      {/* <TouchableOpacity onPress={() => setLogModal(!logModal)}>
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
      {logModal && !error && <WorkoutInput toggle={done}></WorkoutInput>}
      {error && <Text>No workout templates made yet!!</Text>} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  outerContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e4edea"
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
    marginTop: 2,
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#58a1a3',
    marginBottom:4.5,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    padding: 10,
    height: 100,
    borderWidth: 1.5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3fff5',
    margin: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
  logimage: {
    width: 44,
    height: 44,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonClose: {
    backgroundColor: '#d7faee',
  },
  modalContainer: {
    height: 1000,
    width: 375,
    paddingTop: 10,
    marginTop: 225,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopWidth: 1,
    borderTopColor: '#58a1a3',
    backgroundColor: '#f3fff5',
  },
  doneButton: {
    marginTop: 20,
    color: '#f3fff5',
    height: 40,
    backgroundColor: '#58a1a3',
    borderRadius: 4,
  },

});

=======
import { Text, View, StyleSheet, TextInput, ScrollView, Button } from "react-native";
import {SelectList, MultipleSelectList }from 'react-native-dropdown-select-list'
import { LinearGradient } from 'expo-linear-gradient';

const WorkoutInput = () => {

  const [weight,setWeight] = React.useState(null);
  const [reps,setReps] = React.useState(null);
  const [sets,setSets] = React.useState(null);
  const [time,setTime] = React.useState(null);
  const [cals,setCals] = React.useState(null);
  const [routine, setRoutine] = React.useState("crd");
  const [workout,setWorkout] = React.useState("");
  
  const routines = [
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


      <SelectList setSelected={setRoutine} data={routines} placeholder = {"Select your workout plan!"} onSelect={clear}
          defaultOption = {{key:'crd', value:'Cardio'}}  />

      <SelectList setSelected={setWorkout} data={workouts[routine]} placeholder = {"Select your workout plan!"} onSelect={clear}
          defaultOption = {workouts[routine][0]}  />

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

>>>>>>> 7f417859d388d9c2c0b5fc62f0e088f25e5e931c
/* add in data validation
 when clicking done, validate data
  1) if invalid, do nothing and output error msg to redo one or multiple inputs
  2) if valid, post to database and then clear states 
 get data from database (workout ids, routine ids, plan ids, names)

<<<<<<< HEAD
rework useEffect to check if plan exists or not (globalState ? or require user to make one plan before using other tabs)

if no plan exists, don't even use either component
 */
=======
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
>>>>>>> 7f417859d388d9c2c0b5fc62f0e088f25e5e931c
