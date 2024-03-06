import React from "react";
import { useState, useEffect} from "react";
import { Text, View, TouchableOpacity, Modal, StyleSheet, Pressable, TextInput,} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ profile, profInfo, setIsAuthorized }) {
  const { username } = profile;
  const {email } = profInfo;

  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [bioModal, setBioModal] = useState(false);

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [biometrics, setBiometrics] = useState({height: "", weight: ""});
  const [editable, setEditable] = useState(true);

  const handleLogout = () => {
    setIsAuthorized(false);
  };

  useEffect(() => {
    const loadBio = async () => {
      try {
        const storedTemplates = await AsyncStorage.getItem("biometrics");
          setBiometrics(JSON.parse(storedTemplates));
          setHeight(biometrics["height"]);
          setWeight(biometrics["weight"]);  
          /* alert(JSON.stringify(biometrics));
          alert(height);
          alert(weight); */
      } catch (error) {
        console.error("Error loading biometrics:", error);
      }
    };

    loadBio();
  }, [bioModal, setBioModal, editable]);

  const saveBio = async () => {
    try {
      const newTemplate = { height: height, weight: weight};
      await AsyncStorage.setItem(
        "biometrics",
        JSON.stringify(newTemplate),
      );
      //alert(JSON.stringify(newTemplate));
    }
    catch (error) {
      console.error("Error saving template:", error);
    }
  }

  return (
    <View className="flex flex-1 mx-10 justify-center items-center">
      <MaterialCommunityIcons name="account-circle" size={80} />
      <Text className="font-bold text-2xl mb-10">{username}</Text>
      <View className="w-full">

        <TouchableOpacity onPress={() => setInfoModalVisible(true)}>
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
          className="flex-row items-center p-4 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="information" size={28} />
            <Text className="font-bold ml-2">User Info</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={28} />
        </LinearGradient>
        </TouchableOpacity>

        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
          className="flex-row items-center p-4 rounded-xl justify-between mb-4"
        >
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="bell" size={28} />
            <Text className="font-bold ml-2">Notification Settings</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={28} />
        </LinearGradient>

        <TouchableOpacity onPress={() => setBioModal(true)}>
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
          className="flex-row items-center p-4 rounded-xl justify-between"
        >
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="scale-bathroom" size={28} />
            <Text className="font-bold ml-2">Biometrics</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={28} />
        </LinearGradient>
        </TouchableOpacity>
      </View>

      <Modal 
        animationType="fade"
        transparent={false}
        visible={infoModalVisible}
        onRequestClose={() => {
          setInfoModalVisible(false);
        }}
      >
          <View style={styles.modalContainer}>
              <Text style={styles.text}>Username: {username}</Text>
              <Text style={styles.text}>Email: {email}</Text>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setInfoModalVisible(false)}>
              <Text style={styles.text}>Close View</Text>
            </Pressable>
            </View>
      </Modal>

      <Modal 
        animationType="fade"
        transparent={false}
        visible={bioModal}
        onRequestClose={() => {
          setBioModal(false);
        }}
      >
          <View style={styles.modalContainer}>
              <Text>Height: </Text>
              <TextInput
                      style={styles.input}
                      value={height}
                      onChangeText={(text) => {
                        setHeight(text);
                      }}
                      editable={editable}
                />
              <Text>Weight: </Text>
              <TextInput
                  style={styles.input}
                  value={weight}
                  onChangeText={(text) => {
                    setWeight(text);
                  }}
                  editable={editable}
                />

              {!editable && <TouchableOpacity style={{padding: 10, margin: 10,}} onPress={() => setEditable(true)}>
                <LinearGradient
                  colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
                  className="flex-row items-center p-4 rounded-xl justify-between mb-4"
                >
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="file-edit" size={20} />
                    <Text className="font-bold ml-2">Enable Biometrics Editing</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>}

              {editable && <TouchableOpacity style={{padding: 10, margin: 10,}} onPress={() => {setEditable(false); saveBio();}}>
                <LinearGradient
                  colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.5)"]}
                  className="flex-row items-center p-4 rounded-xl justify-between mb-4"
                >
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="file-edit" size={20} />
                    <Text className="font-bold ml-2">End Biometrics Edit Mode</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>}
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setBioModal(false)}>
              <Text style={styles.text}>Close View</Text>
            </Pressable>
            </View>
      </Modal>

      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded-lg mt-10 mx-auto"
        onPress={handleLogout}
      >
        <Text className="text-white text-center">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#58a1a3',
    backgroundColor: '#f3fff5',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 20,
    elevation: 2,
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonClose: {
    backgroundColor: '#d7faee',
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#58a1a3',
    marginTop: 2,
  },
})
