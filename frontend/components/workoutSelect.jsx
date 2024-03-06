import * as React from "react";
import { useState, useEffect, } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

const WorkoutSelect = (props) => {
  
  const [workoutTemplates, setWorkoutTemplates] = useState([]);
  const [useCount, setUseCount] = useState(0);
  //const [username, setUsername] = useState("");

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
      console.log(JSON.stringify(workouts));
    })
  }
 
  useEffect(() => {
    const loadWorkoutTemplates = async () => {
     // await getUsernameFromApi();
      try { 
        //const token = await AsyncStorage.getItem("access_token");
        const username = await AsyncStorage.getItem("username");  
        const storedTemplates = await AsyncStorage.getItem(username+"@workoutTemplates");
        if (storedTemplates !== null) {
          setWorkoutTemplates(JSON.parse(storedTemplates));
        }
      } catch (error) {
        console.error("Error loading workout templates:", error);
      }
    }; 

    /* const getUsernameFromApi = async () => {
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
        //setIsAuthorized(false); // Assuming you want to log the user out if there's an error
      }
    }; */
 
    //getUsernameFromApi();
    loadWorkoutTemplates();
    //updateRoutine();
  }, []);


  const workouts = {};
  var tempWorkout = [];

  return (

    
    <View>

{
    workoutTemplates.map((template) => {
      var tempName = template.name;
      routines.push({ key: tempName, value: tempName });
      tempWorkout = [];
      workouts[tempName] = [];
      template.exercises.map((exercise) => {
        tempWorkout.push({ key: exercise, value: exercise });
      })
      workouts[tempName] = tempWorkout;
      //console.log(JSON.stringify(workouts));
    })
  }

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
