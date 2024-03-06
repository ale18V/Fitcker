import * as React from "react";
import { useState, useEffect, } from "react";
import { Text, View, StyleSheet, Modal, ScrollView, Image, TouchableOpacity, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MarkSets from "../components/markSets";
import WorkoutInput from "../components/workoutInput";


export default function LogTab() {
  const [markModalVisible, setMarkModalVisible] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [error, setError] = useState(false);
  const [workoutTemplates, setWorkoutTemplates] = useState([]);
  //const [username, setUsername] = useState("");
  const [update, setUpdate] = useState(false);


  const done = (status) => {
    setLogModal(status);
  }

   useEffect(() => {
    const loadWorkoutTemplates = async () => {
      try {
        if (username === ""){
        await getUsernameFromApi();
        }
        const username = await AsyncStorage.getItem("username");  
        const storedTemplates = await AsyncStorage.getItem(username+"@workoutTemplates");
        if (storedTemplates !== null) {
          setWorkoutTemplates(JSON.parse(storedTemplates));
        }
      } catch (error) {
        console.error("Error loading workout templates:", error);
        setError(true);
      }
    };

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
        setIsAuthorized(false); // Assuming you want to log the user out if there's an error
      }
    };


    loadWorkoutTemplates();
    if (workoutTemplates.length === 0){
    //alert("You must create a plan first!")
    }
  });

  /* useFocusEffect(
    React.useCallback(() => {
      const loadWorkoutTemplates = async () => {
        try {
          await getUsernameFromApi();
          //const token = await AsyncStorage.getItem("access_token");  
          const storedTemplates = await AsyncStorage.getItem(username+"@workoutTemplates");
          if (storedTemplates !== null) {
            setWorkoutTemplates(JSON.parse(storedTemplates));
          }
        } catch (error) {
          console.error("Error loading workout templates:", error);
          setError(true);
        }
      };
  
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
          setIsAuthorized(false); // Assuming you want to log the user out if there's an error
        }
      };
   
  
      loadWorkoutTemplates();
      if (workoutTemplates.length === 0){
      //alert("You must create a plan first!")
      }
    }, [LogTab, update, setUpdate] )); */



  return (
    <ScrollView style={styles.outerContainer}>

      <View style={styles.row}>
    <TouchableOpacity style={styles.touchable} onPress={() => setMarkModalVisible(true)} disabled={workoutTemplates.length === 0}>
            <View style={styles.buttonContainer}>
            <Text style={styles.text}>My Workouts</Text>
            <Image
              source={require("../assets/icon1.png")} 
              style={styles.image}
              />
            </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchable} onPress={() => setLogModal(true)} disabled={workoutTemplates.length === 0}>
            <View style={styles.buttonContainer}>
            <Text style={styles.text2}>Log Workouts</Text>
            <Image
              source={require("../assets/icon2.png")} 
              style={styles.logimage}
              resizeMode='contain'
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
        onShow={() => {
          //setUpdate(!update);
        }}
      >
        <ScrollView style={styles.modalContainer}>
          <View style={styles.container}>
            <MarkSets></MarkSets>
          </View>
          <View style={styles.container}>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setMarkModalVisible(false)}>
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
        onShow={() => {
          //setUpdate(!update);
        }}
      >
          <ScrollView style={styles.modalContainer}>
          <View style={styles.container}>
            {!error && <WorkoutInput></WorkoutInput>}
          </View>
          <View style={styles.container}>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setLogModal(false)}>
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
    backgroundColor: "#e4edea"
  },
  label: {
    fontSize: 30,
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
  label2: {
    fontSize: 30,
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#58a1a3',
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
    marginBottom:4.5,
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
    marginTop: 225,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopWidth: 1,
    borderTopColor: '#58a1a3',
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

/* add in data validation
 when clicking done, validate data
  1) if invalid, do nothing and output error msg to redo one or multiple inputs
  2) if valid, post to database and then clear states 
 get data from database (workout ids, routine ids, plan ids, names)

rework useEffect to check if plan exists or not (globalState ? or require user to make one plan before using other tabs)

if no plan exists, don't even use either component
 */