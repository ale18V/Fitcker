import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./screens/myTabs";

export default function App() {
  const [authorized, setIsAuthorized] = useState(true);
  return (
    <NavigationContainer>
      <MyTabs authorized={authorized} setIsAuthorized={setIsAuthorized} />
    </NavigationContainer>
  );
}
