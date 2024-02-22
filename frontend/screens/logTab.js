import * as React from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, Button } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import WorkoutSelect from "../components/workoutInput";
import Constants from 'expo-constants';

export default function LogTab() {
  const [isOpen, setIsOpen] = React.useState(false);

  function open() {
    setIsOpen((isOpen) => true);
  }

  function done() {
    setIsOpen((isOpen) => false);
  }

  

  return (
    <View style={styles.container}>
        {!isOpen &&
          <Button
            onPress={open}
            title="Add a workout"
            color="#841584"
          />} 
      {isOpen && <WorkoutSelect toggle={done}></WorkoutSelect>}
        {isOpen &&
          <Button
            onPress={done}
            title="Done"
            color="#841584"
          />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 0,
    backgroundColor: '#white',
  },
  
});

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