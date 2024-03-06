import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CreateWorkout = ({ templateUpdated, setTemplateUpdated, planModal, setPlanModal }) => {
  //manage plans
  const [planName, setPlanName] = useState('');
  const [planStartDate, setStartDate] = useState(new Date());
  const [planEndDate, setEndDate] = useState(new Date());
  const [currentPlan, setCurrentPlan] = useState({
    name: '', startDate: '', endDate: '',
    routines: []
  })

  //manage routines and exercises
  const [currentRoutine, setCurrentRoutine] = useState({ name: '', exercises: [] });
  const [templateName, setTemplateName] = useState('');
  const [exercises, setExercises] = useState([]);

  //managing view states
  const [addRout, setAddRout] = useState(false);

  //groups for saving
  /* const [currentRoutines, setCurrentRoutines] = useState([]);
  const [currRoutine, setCurrRoutine] = useState(null);
  const [currentExercises, setCurrentExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null); */
  const [planID, setPlanID] = useState(0);
  const [username, setUsername] = useState("");


  useEffect(() => {
    const getUsernameFromApi = async () => {
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
    };

    getUsernameFromApi();
  }, [])

  const handleExerciseChange = (index, text) => {
    const newExercises = [...exercises];
    newExercises[index] = text;
    setExercises(newExercises);
  };

  const addExerciseField = () => {
    setExercises([...exercises, '']);
  };

  const removeExerciseField = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const savePlan = () => {
    currentPlan.name = planName;
    var startDate = planStartDate.toISOString().split("T", 1)[0];
    var endDate = planEndDate.toISOString().split("T", 1)[0];
    currentPlan.startDate = startDate;
    currentPlan.endDate = endDate;


    /* savePlans();

    console.log(currentPlan);

    setCurrentRoutines(currentPlan.routines);
    currentRoutines.forEach(function(routine) {
      setCurrentRoutine(routine);
      console.log(currRoutine);
      saveRoutines();
      setCurrentExercises(routine.exercises);
      currentExercises.forEach(function(exercise) {
        setCurrentExercise(exercise);
        console.log(currentExercise);
        saveExercise();
      })
    }) */

    saveTemplate();

    setPlanName('');
    setStartDate(new Date());
    setEndDate(new Date());
    setPlanModal(false);
    setCurrentPlan({
      name: '', startDate: '', endDate: '',
      routines: []
    });
  }

  const addRoutine = () => {
    setAddRout(true);
  }

  const saveRoutine = async () => {
    currentRoutine.exercises = exercises;
    currentRoutine.name = templateName;
    currentPlan.routines.push(currentRoutine);
    await saveRoutines();
    setExercises([]);
    setCurrentRoutine({ name: '', exercises: [] });
    setAddRout(false);
    setTemplateName('');
  }

  const savePlans = async () => {
    const token = await AsyncStorage.getItem("access_token");

    if (token) {
      /* const newTemplate = {
        templateName: templateName,
        exercises: exercises.filter((exercise) => exercise.trim() !== ""),
      }; */
      try {

        const planResponse = await fetch(
          "http://localhost:8000/api/v1/workout-plans/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: currentPlan.name,
              start_date: currentPlan.startDate,
              end_date: currentPlan.endDate,
            }),
          }
        );

        const planData = await planResponse.json();



        console.log(planData);
        console.log(planResponse.status)

        // Check if the response was successful
        if (!planResponse.ok) {
          throw new Error(planData.detail || "Something went wrong");
        }

        //get plan id

        const response = await fetch(
          "http://localhost:8000/api/v1/workout-plans/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const data = await response.json();
        // Extract the username from the response data
        console.log(data);



        await sleep(1000);
        setPlanID(planData.id);
        console.log(planID);



        



      } catch (error) {
        console.error("Error saving template:", error);
      }
    }
    else {
      console.error("No token found.");
    }
  }

  const saveRoutines = async () => {
    try {
      //const token = await AsyncStorage.getItem("access_token");
      const username = await AsyncStorage.getItem("username");
      const newRegTemplate = { name: currentRoutine.name, exercises: currentRoutine.exercises.filter((exercise) => exercise.trim() !== "") };
      let updatedTemplates = [];
      const storedTemplates = await AsyncStorage.getItem(username+"@workoutTemplates");
      if (storedTemplates !== null) {
        updatedTemplates = JSON.parse(storedTemplates);
      }
      updatedTemplates.push(newRegTemplate);
      console.log(JSON.stringify(newRegTemplate));
      console.log(JSON.stringify(updatedTemplates));
      await AsyncStorage.setItem(
        username+"@workoutTemplates",
        JSON.stringify(updatedTemplates)
      );
      
      setTemplateUpdated(!templateUpdated);
      console.log("Template saved successfully:", newRegTemplate);
    }

    catch (error) {
      console.error("Error saving template:", error);
    }

  }

  const saveExercise = async () => {
    const token = await AsyncStorage.getItem("access_token");

    /* if (token) {
 
      try {

        const planResponse = await fetch(
          "http://localhost:8000/api/v1/workout-plans/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: currentPlan.name,
              start_date: currentPlan.startDate,
              end_date: currentPlan.endDate,
            }),
          }
        );

        const planData = await planResponse.json();

        console.log(planData);
        console.log(planResponse.status);
  
        // Check if the response was successful
        if (!planResponse.ok) {
          throw new Error(planData.detail || "Something went wrong");
        }

      } catch (error) {
        console.error("Error saving template:", error);
      }
    }
    else {
      console.error("No token found.");
    }  */
  }

  const saveTemplate = async () => {
    if (planName && currentPlan.routines.length != 0) {

      //const token = await AsyncStorage.getItem("access_token");
      //await getUsernameFromApi();

      const newPlanTemplate = {
        name: planName,
        startDate: planStartDate,
        endDate: planEndDate,
      }

      //alert(JSON.stringify(newPlanTemplate));

      try {
        const username = await AsyncStorage.getItem("username");
        let updatedPlanTemplates = [];
        const storedPlanTemplates = await AsyncStorage.getItem(username+"@planTemplates");
        if (storedPlanTemplates !== null) {
          updatedPlanTemplates = JSON.parse(storedPlanTemplates);
        }
        updatedPlanTemplates.push(newPlanTemplate);
        await AsyncStorage.setItem(
          username+"@planTemplates",
          JSON.stringify(updatedPlanTemplates)
        );
        setTemplateUpdated(!templateUpdated);
        console.log("Template saved successfully:", newPlanTemplate);
      } catch (error) {
        console.error("Error saving template:", error);
      }
    } else {
      console.log("Template name or exercises are empty");
    }
  };











  return (
    <ScrollView>

        
          <View style={styles.container}>

            <View>

            <Text className="text-black font-bold text-2xl m-4">Create a Plan</Text>
              <TextInput
                className="flex-1 border rounded p-2 m-4"
                placeholder={`Plan`}
                value={planName}
                onChangeText={(text) => { setPlanName(text); }}
              />
              <DateTimePicker
                value={planStartDate || new Date()} // Provide a default value if value is empty
                mode="date" // You can use "time" or "datetime" for different modes
                is24Hour={true}
                timeZoneName={'US/Pacific'}
                display="default"
                onChange={(event, selectedDate) => {
                  setStartDate(selectedDate);
                }}
              />
              <DateTimePicker
                value={planEndDate || new Date()} // Provide a default value if value is empty
                mode="date" // You can use "time" or "datetime" for different modes
                is24Hour={true}
                timeZoneName={'US/Pacific'}
                display="default"
                onChange={(event, selectedDate) => {
                  setEndDate(selectedDate);
                }}
              />
            </View>


            <Button
              className="bg-blue-500 text-white p-2 rounded m-4"
              title="Add Routine"
              onPress={addRoutine}
            />

            {addRout && <View>
              <Text className="text-black font-bold text-2xl m-4">Create Routine</Text>
              <TextInput
                className="border rounded p-2 m-4"
                placeholder="Routine Name"
                value={templateName}
                onChangeText={(text) => { setTemplateName(text) }}
              />
              {exercises.map((exercise, index) => (
                <View key={index} className="flex-row items-center">
                  <TextInput
                    className="flex-1 border rounded p-2 m-4"
                    placeholder={`Exercise ${index + 1}`}
                    value={exercise.name}
                    onChangeText={(text) => handleExerciseChange(index, text)}
                  />
                  <Button
                    className="bg-red-500 text-white p-2 rounded m-4"
                    title="Remove"
                    onPress={() => removeExerciseField(index)}
                  />
                </View>
              ))}
              <Button
                className="bg-blue-500 text-white p-2 rounded m-4"
                title="Add Exercise"
                onPress={addExerciseField}
              />
              <Button
                className="bg-blue-500 text-white p-2 rounded m-4"
                title="Save Routine"
                onPress={saveRoutine}
                disabled={
                  !templateName ||
                  exercises.some((exercise) => !exercise) ||
                  exercises.length < 1
                }
              />

            </View>}

            {/* <Button
              className="bg-red-500 text-white p-2 rounded m-4"
              title="TempSave"
              onPress={() => addPlan()}
            /> */}

            <Button
              className="bg-red-500 text-white p-2 rounded m-4"
              title="Save Plan"
              onPress={() => savePlan()}
              disabled={
                !planName || currentPlan.routines.length === 0
              }
            />
          </View>


      {/* <Button
        className="bg-red-500 text-white p-2 rounded m-4"
        title="View"
        onPress={() => alert(JSON.stringify(plans))}
      /> */}

    </ScrollView>
  );
};

export default CreateWorkout;

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
    marginBottom: 4.5,
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
    width: 100,
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
    paddingTop: 10,
    margin: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
