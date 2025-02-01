import { useState, FunctionComponent, } from "react";
import { View, Text, Button } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';

type Props = {
  setWorkout: (workout: number) => void;
  setRoutineId: (routine: number) => void;
  routineId: number
}
const WorkoutSelect: FunctionComponent<Props> = ({ setRoutineId: setRoutine, setWorkout }) => {

  const [valid, setValid] = useState(false);
  const [update, setUpdate] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const [routines,setRoutines] = useState([]);
  const [plans, setPlans] = useState([]);
  const [workouts, setWorkouts] = useState([]);


  return (

    <View>

      {!valid && <Text>Either no plan, routine, or exercise found! Please add missing category before trying to log workout. If you are receiving
        this message incorrectly, click refresh data to update. </Text>}

      {/* <SelectList setSelected={(val) => { setPlanID(val); setRoutineID(-1); setUpdate(0); }} data={plans} placeholder={"Select your workout plan"}
         />*/}

      {/* <SelectList setSelected={(val) => { setRoutineID(val); setRoutine(val); setUpdate(0);}} data={routines} placeholder={"Select your workout routine!"}
         />*/}

      {false && <SelectList save="key" setSelected={setWorkout} data={workouts}
        placeholder={"Select your workout exercise!"}  />}

      {!valid && <Button title="Refresh data" onPress={() => {setRefresh(!refresh);}} />}


    </View>
  )

};



export default WorkoutSelect;

//figure out how to have second list automatically change without using first state
/// used dummy start



/* forceRender((prev) => !prev);


const routineResponse = await fetch(
  `${API_URL}/routines/`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

if (routineResponse.ok) {
  const routData = await response.json();
  // Extract the username from the response data
  console.log(routData);
  setUsername(routData.username);
  setemail(routData.email);
} else {
  // Handle error when API request fails
  throw new Error("Failed to fetch routines");
}


const exerciseResponse = await fetch(
  `${API_URL}/exercises/`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

if (exerciseResponse.ok) {
  const exerData = await response.json();
  // Extract the username from the response data
  console.log(exerData);
  setUsername(exerData.username);
  setemail(exerData.email);
} else {
  // Handle error when API request fails
  throw new Error("Failed to fetch exercises");
}


const linkResponse = await fetch(
  `${API_URL}/routines-exercises/`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

if (linkResponse.ok) {
  const linkData = await response.json();
  // Extract the username from the response data
  console.log(linkData);
  setUsername(linkData.username);
  setemail(linkData.email);
} else {
  // Handle error when API request fails
  throw new Error("Failed to link routines to exercises");
}
 */