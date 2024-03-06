import React, { useState } from "react";
import { View, Text, Button, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateWorkout = ({ templateUpdated, setTemplateUpdated }) => {
  //manage plans
  const [plans, setPlan] = useState([]);
  const [planName, setPlanName] = useState("");
  const [planStartDate, setStartDate] = useState(new Date());
  const [planEndDate, setEndDate] = useState(new Date());
  const [currentPlan, setCurrentPlan] = useState({
    name: "", id: "", startDate: new Date(), endDate: new Date(),
    routines: []
  })

  //manage routines and exercises
  const [currentRoutine, setCurrentRoutine] = useState({ name: "", id: "", exercises: [] });
  const [templateName, setTemplateName] = useState("");
  const [exercises, setExercises] = useState([]);

  //managing view states
  const [addRout, setAddRout] = useState(false);
  const [planModal, setPlanModal] = useState(false);


  const handleExerciseChange = (index, text) => {
    const newExercises = [...exercises];
    newExercises[index] = text;
    setExercises(newExercises);
  };

  const addExerciseField = () => {
    setExercises([...exercises, ""]);
  };

  const removeExerciseField = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const savePlan = () => {
    currentPlan.name = planName;
    currentPlan.startDate = planStartDate;
    currentPlan.endDate = planEndDate;
    plans.push(currentPlan);

    setPlanName("");
    setplanStartDate(new Date());
    setplanEndDate(new Date());
    setCurrentPlan({
      name: "", id: "", startDate: new Date(), endDate: new Date(),
      routines: []
    });
    setPlanModal(false);
  }

  const addRoutine = () => {
    setAddRout(true);
  }

  const saveRoutine = () => {
    currentRoutine.exercises = exercises;
    currentRoutine.name = templateName;
    currentRoutine.id = templateName;
    currentPlan.routines.push(currentRoutine);
    setExercises([]);
    setCurrentRoutine({ name: "", id: "", exercises: [] });
    setAddRout(false);
    setTemplateName("");
  }

  const saveTemplate = async () => {
    if (templateName && exercises.every((exercise) => exercise)) {
      const newTemplate = {
        templateName: templateName,
        exercises: exercises.filter((exercise) => exercise.trim() !== ""),
      };
      try {
        // await AsyncStorage.clear();
        let updatedTemplates = [];
        const storedTemplates = await AsyncStorage.getItem("workoutTemplates");
        if (storedTemplates !== null) {
          updatedTemplates = JSON.parse(storedTemplates);
        }
        updatedTemplates.push(newTemplate);
        await AsyncStorage.setItem(
          "workoutTemplates",
          JSON.stringify(updatedTemplates)
        );
        setTemplateUpdated(!templateUpdated);
        setTemplateName("");
        setExercises([]);
        console.log("Template saved successfully:", newTemplate);
      } catch (error) {
        console.error("Error saving template:", error);
      }
    } else {
      console.log("Template name or exercises are empty");
    }
  };




  return (
    <ScrollView>
      <Text className="text-black font-bold text-2xl m-4">My Plans</Text>

      <TouchableOpacity style={styles.touchable} onPress={() => setPlanModal(true)}>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>Add Plan</Text>
          <Image
            source={require("../assets/icon1.png")}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={false}
        visible={planModal}
        onRequestClose={() => {
          setPlanModal(false);
        }}
      >
        <ScrollView style={styles.modalContainer}>
          <View style={styles.container}>

            <View>
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

            <Button
              className="bg-red-500 text-white p-2 rounded m-4"
              title="Save Plan"
              onPress={() => savePlan()}
              disabled={
                !planName || currentPlan.routines.length === 0
              }
            />
          </View>
        </ScrollView>
      </Modal>

      <Button
        className="bg-red-500 text-white p-2 rounded m-4"
        title="View"
        onPress={() => alert(JSON.stringify(plans))}
      />

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
    marginBottom: 50,
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
