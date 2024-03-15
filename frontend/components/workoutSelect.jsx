import * as React from "react";
import { useState, useEffect, } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
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
  //const [updatePlan, setUpdatePlan] = useState(false);
  const [update, setUpdate] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const [routines,setRoutines] = useState([]);
  const [plans, setPlans] = useState([]);
  const [workouts, setWorkouts] = useState([]);




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
              const planData = await planResponse.json();
              setPlan(planData);
              console.log("got plan");

              //setPlanID(1); //temp

              /* if (plan.length != 0) {

                plans.length = 0;

                plan.map((current) => {
                  plans.push({ key: current.id, value: current.name }); //add each plan to array
                })

                setPlanID(plans[0].key); //set default plan to first plan

              } */
            } else {
              // Handle error when API request fails
              throw new Error("Failed to fetch plans");
            }

          } else {
            // Handle case when token is not found in AsyncStorage
            throw new Error("Token not found");
          }

        } catch (error) {
          console.error("Error loading plans:", error);
        }
      }
      else {
        return;
      }
    };


    const updateRoutines = async () => {
      if (routineID === -1) { //if routine initialized or update plan
        try {
          const token = await AsyncStorage.getItem("access_token");

          if (token) {
            var url = new URL("http://localhost:8000/api/v1/routines/"),
              params = { plan_id: planID }
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

            const routineResponse = await fetch(
              url,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (routineResponse.ok) {
              const routData = await routineResponse.json();
              // Extract the username from the response data

              setCurrRoutines(routData);

              console.log("got routines");

              //if (updatePlan) { //reset plan change bool

                //setUpdatePlan(false);

              //}

              //routines.length = 0; //clear routines to repopulate

              /* if (currRoutines.length != 0) {

                currRoutines.map((current) => {
                  routines.push({ key: current.id, value: current.name });
                })

                setRoutineID(routines[0].key); //set default routine to initial one

              } */

            } else {
              // Handle error when API request fails
              throw new Error("Failed to fetch routines");
            }

          } else {
            // Handle case when token is not found in AsyncStorage
            throw new Error("Token not found");
          }

        } catch (error) {
          console.error("Error loading routines:", error);
        }
      }
    };


    const updateExercises = async () => { //always do when changing plan or routine
      //await updatePlans();
      //await updateRoutines();

      try {
        const token = await AsyncStorage.getItem("access_token");

        if (token) {
          var url = new URL("http://localhost:8000/api/v1/exercises/"),
            params = {}
          Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
          const exerciseResponse = await fetch(
            url,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (exerciseResponse.ok) {
            const exerData = await exerciseResponse.json();
            // Extract the username from the response data

            setCurrExercises(exerData);
            console.log("got exercises");

            //workouts.length === 0;

            /* if (currExercises.length != 0) {
              currExercises.map((current) => {
                workouts.push({ key: current.id, value: current.name });
              })
            } */

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


    const updateLists = async () => {
      await updatePlans();

      //plans.length = 0;

      /* plans = JSON.parse(JSON.stringify(plan));
      plans.forEach( function(data) {
        data['value'] = data['name'];
        data['key'] = data['id'];
        delete data['end_date'];
        delete data['start_date'];
        delete data['id'];
        delete data['name'];
      }); */

      console.log("plans are: ");

      var tempPlan = JSON.parse(JSON.stringify(plan));
      tempPlan.forEach( function(data) {
        data['value'] = data['name'];
        data['key'] = data['id'];
        delete data['end_date'];
        delete data['start_date'];
        delete data['id'];
        delete data['name'];
      });
      setPlans(JSON.parse(JSON.stringify(tempPlan)));

      if (plans.length != 0) {
        if (planID === -1) {
      setPlanID(plans[0].key);
        }
      console.log("planID: " + planID);
      

      console.log("plans: " + JSON.stringify(plans));

      //routines.length = 0;

      /* routines = JSON.parse(JSON.stringify(currRoutines));

      routines.forEach( function(data) {
        data['value'] = data['name'];
        data['key'] = data['id'];
        delete data['id'];
        delete data['name'];
      }); */

      /* currRoutines.map((current) => {
        routines.push({ key: current.id, value: current.name });
      }) */

      await updateRoutines();

      
      //console.log(update);
      var tempRoutine = JSON.parse(JSON.stringify(currRoutines))
      tempRoutine.forEach( function(data) {
        data['value'] = data['name'];
        data['key'] = data['id'];
        delete data['id'];
        delete data['name'];
      });

      setRoutines(JSON.parse(JSON.stringify(tempRoutine)));
      
      if (routines.length != 0) {
      setRoutineID(routines[0].key);
      console.log("routineID: " + routineID);
      }

      console.log("routines:" + JSON.stringify(routines));

      //workouts.length === 0;

      /* workouts = JSON.parse(JSON.stringify(currExercises));
      workouts.forEach( function(data) {
        data['value'] = data['name'];
        data['key'] = data['id'];
        delete data['id'];
        delete data['name'];
        delete data['description'];
      }); */

      await updateExercises();

      var tempExercise = JSON.parse(JSON.stringify(currExercises));
      tempExercise.forEach( function(data) {
        data['value'] = data['name'];
        data['key'] = data['id'];
        delete data['id'];
        delete data['name'];
        delete data['description'];
      });

      setWorkouts(JSON.parse(JSON.stringify(tempExercise)));

      currExercises.map((current) => {
        workouts.push({ key: current.id, value: current.name });
      })

      console.log("exercises: " + JSON.stringify(workouts));
    }



    }


    const validate = async () => {

      await updateLists();

      if ((plans.length != 0) && (routines.length != 0) && (workouts.length != 0)) { //each category must exist for us to use selection
        setValid(true);
      }
      else {
        setValid(false);
      }

      console.log("validate plan");
      console.log(plan);
      console.log(currRoutines);
      console.log(currExercises);

      if (update < 4) {
        setUpdate(update+1);
      }
    }

    validate();

  }, [planID, routineID, update, refresh])
  //on first render, initialize everything
  // on plan change, repopulate routines and exercises
  // on routine change, repopulate exercises


  return (

    <View>

      {!valid && <Text>Either no plan, routine, or exercise found! Please add missing category before trying to log workout. If you are receiving
        this message incorrectly, click refresh data to update. </Text>}

      {valid && <SelectList setSelected={(val) => { setPlanID(val); setRoutineID(-1); setUpdate(0); }} data={plans} placeholder={"Select your workout plan"}
         />}

      {valid && <SelectList setSelected={(val) => { setRoutineID(val); props.setRoutine(val); setUpdate(0);}} data={routines} placeholder={"Select your workout routine!"}
         />}

      {valid && <SelectList save="key" setSelected={props.setWorkout} data={workouts}
        placeholder={"Select your workout exercise!"}  />}

      {!valid && <Button title="Refresh data" onPress={() => {setRefresh(!refresh);}} />}


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



/* forceRender((prev) => !prev);


const routineResponse = await fetch(
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