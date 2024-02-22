import * as React from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, Button, Alert  } from "react-native";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';
//import WorkoutPropInput from "./workoutPropInput";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const WorkoutSelect = (props) => {
  const [routine, setRoutine] = React.useState("crd");
  const [workout, setWorkout] = React.useState("");
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

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      weight: '',
      reps: '',
      sets: '',
      rest: '',
    }
  });
  const onSubmit = async data => {
    await sleep(2000);
    if (data.weight === '0') {
      alert(JSON.stringify(data));
    } else {
      alert("There is an error");
    }
    //props.toggle
  };

  console.log('errors', errors);

 




  return (

    <View style={styles.container}>
      <Text className="text-black font-bold text-2xl m-4">Log Workout</Text>
      <ScrollView>

      <SelectList setSelected={setRoutine} data={routines} placeholder={"Select your workout plan!"} 
        defaultOption={{ key: 'crd', value: 'Cardio' }} />

      <SelectList setSelected={setWorkout} data={workouts[routine]} placeholder={"Select your workout plan!"} //onSelect={clear()}
        defaultOption={workouts[routine][0]} />
      
      <View style={styles.container}>
      <Text style={styles.label}>Weight lifted:</Text>
      <Controller
      control={control}
      name="weight"
      defaultValue=""
      rules={{
        required: { value: true, message: "Required input" },
        max: { value: 500, message: "Invalid input" },
        min: { value: 0, message: "Cannot be negative" },
      }}
      render={({ field: { onChange, value } }) => (
        <>
          {errors.weight && <Text style={styles.text}> {errors.weight.message}</Text>}
          <TextInput
            style={styles.input}
            value={value}
            placeholder={''}
            onChangeText={(text) => {
              onChange(text);
              //handleChangeText(text, 'login');
            }}
            //onSubmitEditing={() => refPasswordInput.current?.focus()}
          />
          </>
      )}
    />

    <Text style={styles.label}>Reps done:</Text>
    <Controller
      control={control}
      name="reps"
      defaultValue=""
      rules={{
        required: { value: true, message: "Required input" },
        max: { value: 100, message: "Invalid input" },
        min: { value: 1, message: "Can't do less than one rep" },
      }}
      render={({ field: { onChange, value } }) => (
        <>
          {errors.reps && <Text style={styles.text}> {errors.reps.message}</Text>}
          <TextInput
            style={styles.input}
            value={value}
            placeholder={''}
            onChangeText={(text) => {
              onChange(text);
              //handleChangeText(text, 'login');
            }}
            //onSubmitEditing={() => refPasswordInput.current?.focus()}
          />
          </>
      )}
    />

    <Text style={styles.label}>Sets done:</Text>
    <Controller
      control={control}
      name="sets"
      defaultValue=""
      rules={{
        required: { value: true, message: "Required input" },
        max: { value: 100, message: "Invalid input" },
        min: { value: 1, message: "Can't do less than one set" },
      }}
      render={({ field: { onChange, value } }) => (
        <>
          {errors.sets && <Text style={styles.text}> {errors.sets.message}</Text>}
          <TextInput
            style={styles.input}
            value={value}
            placeholder={''}
            onChangeText={(text) => {
              onChange(text);
              //handleChangeText(text, 'login');
            }}
            //onSubmitEditing={() => refPasswordInput.current?.focus()}
          />
          </>
      )}
    />

    <Text style={styles.label}>Rest interval:</Text>
    <Controller
      control={control}
      name="rest"
      defaultValue=""
      rules={{
        required: { value: true, message: "Required input" },
        max: { value: 500, message: "Invalid input" },
        min: { value: 0, message: "Cannot be negative" },
      }}
      render={({ field: { onChange, value } }) => (
        <>
          {errors.rest && <Text style={styles.text}> {errors.rest.message}</Text>}
          <TextInput
            style={styles.input}
            value={value}
            placeholder={''}
            onChangeText={(text) => {
              onChange(text);
              //handleChangeText(text, 'login');
            }}
            //onSubmitEditing={() => refPasswordInput.current?.focus()}
          />
          </>
      )}
    />
    
        <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Submit"
                  onPress={handleSubmit(onSubmit)}
        />
          </View>

    </View>


      
      </ScrollView>
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