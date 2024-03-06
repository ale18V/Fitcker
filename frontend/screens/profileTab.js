import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "../components/profile";

export default function ProfileTab({ setIsAuthorized }) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

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
            setEmail(data.email);
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

    getUsernameFromApi();
  }, [setIsAuthorized]);

  return (
    <Profile
      profile={{
        username: username,
      }}
      profInfo={{
        email: email,
      }}
      setIsAuthorized={setIsAuthorized}
    />
  );
}
