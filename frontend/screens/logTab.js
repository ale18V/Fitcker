import * as React from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, Button, Pressable,} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import MarkSets from "../components/markSets";
import WorkoutInput from "../components/workoutInput";
import Constants from 'expo-constants';


export default function LogTab() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mark, setMark] = React.useState(false);

  const handleOnPress = () => {
    setIsOpen(true);
  };

  const done = (status) => {
    setIsOpen(status);
  }

  

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.label}>My Exercises</Text>
      {/* {!mark &&
        <Pressable
          onPress={setMark(true)}
          style={styles.button}
        >
          <Text style={styles.text}> Mark sets </Text>
        </Pressable>}
      {mark && <MarkSets></MarkSets>} */}
      
        
      <Text style = {styles.label}>Log Exercises</Text>
      {!isOpen &&
        <Pressable
          onPress={handleOnPress}
          style={styles.button}
        >
          <Text style={styles.text}> Log a workout </Text>
        </Pressable>}
      {isOpen && <WorkoutInput toggle={done}></WorkoutInput>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 0,
    /* backgroundColor: '#f3fff5', */
  },
  label: {
    fontSize: 30,
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'left',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 1,
    elevation: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#f3fff5',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#58a1a3',
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