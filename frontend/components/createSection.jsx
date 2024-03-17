import React, { useState } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CreateSection = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={toggleExpanded}
        className="flex-row justify-between items-center"
      >
        <Text className="font-bold text-2xl m-4">{title}</Text>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-up"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {expanded && children()}
    </ScrollView>
  );
};

export default CreateSection;
