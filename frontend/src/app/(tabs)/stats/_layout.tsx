import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator()
const Tab = withLayoutContext(Navigator);

export default function StatsTab() {
  return (
    <Tab
      className="mt-9"
      screenOptions={{
        tabBarActiveTintColor: "#38A3A5",
        tabBarInactiveTintColor: "#A3A3A3",
        tabBarIndicatorStyle: { backgroundColor: '#38A3A5'},
    
      }}/>
  );
}
