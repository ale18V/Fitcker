import * as React from "react";
import StatsCalendar from "../components/statsCalendar";
import StatsGraphs from "../components/statsGraphs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function StatsTab() {
  return (
    <Tab.Navigator
      className="mt-9"
      screenOptions={{
        tabBarActiveTintColor: "#38A3A5",
        tabBarInactiveTintColor: "#A3A3A3",
        tabBarIndicatorStyle: { backgroundColor: '#38A3A5'},
    
      }}>


        <Tab.Screen name="Graphs">
        {(props) => (
          <StatsGraphs 
            {...props}
            statsGraph={{
              exercises: ["Bench Press", "Squats", "Shoulder Press", "Lunges"], 
            }}
          />
        )}
        </Tab.Screen>

        <Tab.Screen name="Calendar" component={StatsCalendar} />
      </Tab.Navigator>
  );
}
