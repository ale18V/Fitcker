import * as React from "react";
import Profile from "../components/profile";

export default function ProfileTab({ setIsAuthorized }) {
  return (
    <Profile
      profile={{
        username: "username",
        email: "user@gmail.com", 
        gender: "male", 
        DoB: "0000-00-00",
      }}
      setIsAuthorized={setIsAuthorized}
    />
  );
}
