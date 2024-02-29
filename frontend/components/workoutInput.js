import * as React from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, Button } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';
import WorkoutSelect from "./workoutSelect";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const WorkoutInput = (props) => {
  const [routine, setRoutine] = React.useState("crd");
  const [workout, setWorkout] = React.useState("");

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      weight: '',
      reps: '',
      sets: '',
      rest: '',
      day: new Date(),
    }
  });
  const onSubmit = async data => {
    await sleep(2000);
    if (data.weight === '0') {
      alert(JSON.stringify(data));
    } else {
      alert("There is an error");
      alert(JSON.stringify(data));
    }
    //props.toggle.bind(this, false);
    //props.toggle
  };

  console.log('errors', errors);

  return (

    <View style={styles.container}>
      <ScrollView>
        <WorkoutSelect routine={routine} setRoutine={setRoutine} workout={workout} setWorkout={setWorkout} />
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

          <Text style={styles.label}>Date:</Text>
          <Controller
            control={control}
            name='day'
            defaultValue={new Date()}
            render={({ field }) => (
              <DateTimePicker
                value={field.value || new Date()} // Provide a default value if value is empty
                mode="date" // You can use "time" or "datetime" for different modes
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  field.onChange(selectedDate);
                }}
              />
            )}
          />

          <View style={styles.button}>
            <Button
              title="Submit"
              color="#f3fff5"
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <View style={styles.button}>
            <Button
              title="Done"
              color="#f3fff5"
              onPress={props.toggle.bind(this, false)}
            />
          </View>
        </View>


        {/* <Text> {routine} </Text>
        <Text> {workout} </Text> */}
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
    marginTop: 20,
    color: '#f3fff5',
    height: 40,
    backgroundColor: '#58a1a3',
    borderRadius: 4,
  },
  buttonLab: {
    color: '#58a1a3',
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

export default WorkoutInput;


//date for sql as yyyy-mm-dd