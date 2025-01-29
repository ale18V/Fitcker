import * as React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MarkSets from "../components/markSets.jsx";
import WorkoutInput from "../components/workoutInput.jsx";

export default function LogTab() {
  const [markModalVisible, setMarkModalVisible] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [error, setError] = useState(false);
  const [workoutTemplates, setWorkoutTemplates] = useState([]);

  const done = (status) => {
    setLogModal(status);
  };

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
  }, []);

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => setMarkModalVisible(true)}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.text}>My Workouts</Text>
            <Image
              source={require("../assets/icon1.png")}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchable}
          onPress={() => setLogModal(true)}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.text2}>Log Workouts</Text>
            <Image
              source={require("../assets/icon2.png")}
              style={styles.logimage}
              resizeMode="contain"
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
              onPress={() => setMarkModalVisible(false)}
            >
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
              onPress={() => setLogModal(false)}
            >
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
    backgroundColor: "#e4edea",
  },
  label: {
    fontSize: 30,
    textAlign: "left",
    margin: 10,
    fontWeight: "bold",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#58a1a3",
    marginTop: 2,
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#58a1a3",
    marginBottom: 4.5,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
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
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3fff5",
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
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonClose: {
    backgroundColor: "#d7faee",
  },
  modalContainer: {
    height: 1000,
    width: 375,
    paddingTop: 10,
    marginTop: 225,
    marginBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopWidth: 1,
    borderTopColor: "#58a1a3",
    backgroundColor: "#f3fff5",
  },
  doneButton: {
    marginTop: 20,
    color: "#f3fff5",
    height: 40,
    backgroundColor: "#58a1a3",
    borderRadius: 4,
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
