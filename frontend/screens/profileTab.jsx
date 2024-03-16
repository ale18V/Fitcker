import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "../components/profile";
import { createStackNavigator } from "@react-navigation/stack";
import UserInfo from "../components/userInfo";
import UserNotif from "../components/userNotif";
import UserBiometrics from "../components/userBiometrics";

const Stack = createStackNavigator();

export default function ProfileTab({ setIsAuthorized }) {
  const [username, setUsername] = useState(null);
  const [email, setemail] = useState(null);
  const [height, setHeight]= useState(null);
  const [weight, setWeight] = useState(null);

  useEffect(() => {
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
            setemail(data.email);
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

    const retrieveBiometricsFromStorage = async () => {
      try {
        const biometricsData = await AsyncStorage.getItem(username+'@biometrics');
        if (biometricsData !== null) {
          const { heightCM, weightKG } = JSON.parse(biometricsData);
          setHeight(heightCM);
          setWeight(weightKG);
        }
      } catch (error) {
        console.error('Error retrieving biometrics data:', error);
      }
    };

    getUsernameFromApi();
    retrieveBiometricsFromStorage();
  }, [setIsAuthorized]);

  

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile">
        {(props) => (
          <Profile
            {...props}
            profile={{
              username: username,
            }}
            setIsAuthorized={setIsAuthorized}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="User Information">
        {() => (
          <UserInfo
            userInfo={{
              username: username,
              email: email,
              gender: "female",
              DoB: "1969",
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Notification Settings" component={UserNotif} />
      <Stack.Screen name="Biometrics">
        {(props) => (
          <UserBiometrics
            {...props}
            biometrics={{
              heightCM: height,
              weightKG: weight,
            }}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}


