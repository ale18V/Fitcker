import React, { useState } from "react";
import { ScrollView, Modal, TouchableOpacity, Text, StyleSheet, View, Image, Pressable } from "react-native";
import CreateWorkout from "../components/createWorkout";
import MyWorkouts from "../components/myWorkouts";

export default function CreateTab() {
  const [templateUpdated, setTemplateUpdated] = useState(false);
  const [myWorkoutsModal, setMyWorkoutsModal] = useState(false)
  return (
    <ScrollView className="flex-1 mt-14">
      <CreateWorkout
        templateUpdated={templateUpdated}
        setTemplateUpdated={setTemplateUpdated}
      />
      <TouchableOpacity style={styles.touchable} onPress={() => setMyWorkoutsModal(true)}>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>View My Routines</Text>
          <Image
            source={require("../assets/icon1.png")}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={false}
        visible={myWorkoutsModal}
        onRequestClose={() => {
          setMyWorkoutsModal(false);
        }}
      >
      <ScrollView className="flex-1 mt-14">
      <MyWorkouts templateUpdated={templateUpdated} />
      <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setMyWorkoutsModal(false)}>
              <Text style={styles.text}>Close View</Text>
      </Pressable>
      </ScrollView>
      </Modal>
      


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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#58a1a3',
    marginTop: 2,
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