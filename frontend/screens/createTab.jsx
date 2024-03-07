import React, { useState } from "react";
import { ScrollView } from "react-native";
import CreateWorkout from "../components/createWorkout";
import MyWorkouts from "../components/myWorkouts";

export default function CreateTab() {
  const [templateUpdated, setTemplateUpdated] = useState(false);
  return (
    <ScrollView className="flex-1 mt-14">
      <CreateWorkout
        templateUpdated={templateUpdated}
        setTemplateUpdated={setTemplateUpdated}
      />
      <MyWorkouts templateUpdated={templateUpdated} />
    </ScrollView>
  );
}
