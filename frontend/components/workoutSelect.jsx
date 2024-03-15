import * as React from "react";
import { useState, useEffect, } from "react";
import { View, StyleSheet, Text } from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

const WorkoutSelect = (props) => {
  
  const [plan, setPlan] = useState([]);
  const [currRoutines, setCurrRoutines] = useState([]);
  const [currExercises, setCurrExercises] = useState([]);
  const [planID, setPlanID] = useState(-1);
  const [routineID, setRoutineID] = useState(-1);
  const [valid, setValid] = useState(false);
  const [updatePlan, setUpdatePlan] = useState(false);

  const routines = [];
  const plans = [];
  const workouts = [];




  useEffect(() => {
    const updatePlans = async () => {
      if (planID === -1) { //initial render only
      try {
        const token = await AsyncStorage.getItem("access_token");

        if (token) {
          const planResponse = await fetch(
            "http://localhost:8000/api/v1/plans/",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (planResponse.ok) {
            const planData = await response.json();
            setPlan(JSON.parse(planData));
            console.log(planData);

            plan.map((current) => {
              plans.push({key: current.id, value: current.name}); //add each plan to array
            })

            setPlanID(plans[0].key); //set default plan to first plan
          } else {
            // Handle error when API request fails
            throw new Error("Failed to fetch plans");
          }

        } else {
          // Handle case when token is not found in AsyncStorage
          throw new Error("Token not found");
        }

      } catch (error) {
        console.error("Error loading workout templates:", error);
      }
    }
    };


    const updateRoutines = async () => {
      if (updatePlan || routineID === -1) { //if routine initialized or update plan
      try {
        const token = await AsyncStorage.getItem("access_token");

        if (token) {
          const routineResponse = await fetch(
            "http://localhost:8000/api/v1/routines/",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                plan_id: planID,
              }),
            }
          );
          
          if (routineResponse.ok) {
            const routData = await response.json();
            // Extract the username from the response data
            console.log(routData);

            setCurrRoutines(JSON.parse(routData));

            if (updatePlan) { //reset plan change bool

              setUpdatePlan(false);

            }

            routines.length = 0; //clear routines to repopulate

            currRoutines.map((current) => {
              routines.push({key: current.id, value: current.name});
            })

            setRoutineID(routines[0].key); //set default routine to initial one

            } else {
            // Handle error when API request fails
            throw new Error("Failed to fetch routines");
          }
          
        } else {
          // Handle case when token is not found in AsyncStorage
          throw new Error("Token not found");
        }

      } catch (error) {
        console.error("Error loading workout templates:", error);
      }
    }
    };


    const updateExercises = async () => { //always do when changing plan or routine
      try {
        const token = await AsyncStorage.getItem("access_token");

        if (token) {
          const exerciseResponse = await fetch(
            "http://localhost:8000/api/v1/exercises/",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                routine_id: routineID,
              }),
            }
          );
          
          if (exerciseResponse.ok) {
            const exerData = await response.json();
            // Extract the username from the response data
            console.log(exerData);
            setCurrExercises(JSON.parse(exerData));

            workouts.length === 0;

            currExercises.map((current) => {
              workouts.push({key: current.id, value: current.name});
            })

          } else {
            // Handle error when API request fails
            throw new Error("Failed to fetch exercises");
          }
          
        } else {
          // Handle case when token is not found in AsyncStorage
          throw new Error("Token not found");
        }

      } catch (error) {
        console.error("Error loading exercises:", error);
      }
    };


    const validate = () => {
      if ((plan.length != 0) && (currRoutines.length != 0) && (currExercises.length != 0)) { //each category must exist for us to use selection
        setValid(true);
      }
      else {
        setValid(false);
      }
    }



    updatePlans();
    updateRoutines();
    updateExercises();
    validate();
  }, [planID, routineID,]) 
  //on first render, initialize everything
  // on plan change, repopulate routines and exercises
  // on routine change, repopulate exercises


  return (

    <View>

      {!valid && <Text>Either no plan, routine, or exercise found! Please add missing category before trying to log workout.</Text>}

      {valid && <SelectList save="key" setSelected={(val) => {setUpdatePlan(true); setPlanID(val);}} data={plans} placeholder={"Select your workout plan!"}
        defaultOption={plans[0]} />}

      {valid && <SelectList save="key" setSelected={(val) => {setRoutineID(val); props.setRoutine(val);}} data={routines} placeholder={"Select your workout routine!"}
        defaultOption={routines[0]} />}
      
      {valid && <SelectList save="key" setSelected={props.setWorkout} data={workouts}
        placeholder={"Select your workout exercise!"} defaultOption={workouts[0]}/>}

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



/* const routineResponse = await fetch(
  "http://localhost:8000/api/v1/routines/",
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

if (routineResponse.ok) {
  const routData = await response.json();
  // Extract the username from the response data
  console.log(routData);
  setUsername(routData.username);
  setemail(routData.email);
} else {
  // Handle error when API request fails
  throw new Error("Failed to fetch routines");
}


const exerciseResponse = await fetch(
  "http://localhost:8000/api/v1/exercises/",
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

if (exerciseResponse.ok) {
  const exerData = await response.json();
  // Extract the username from the response data
  console.log(exerData);
  setUsername(exerData.username);
  setemail(exerData.email);
} else {
  // Handle error when API request fails
  throw new Error("Failed to fetch exercises");
}


const linkResponse = await fetch(
  "http://localhost:8000/api/v1/routines-exercises/",
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

if (linkResponse.ok) {
  const linkData = await response.json();
  // Extract the username from the response data
  console.log(linkData);
  setUsername(linkData.username);
  setemail(linkData.email);
} else {
  // Handle error when API request fails
  throw new Error("Failed to link routines to exercises");
}
 */