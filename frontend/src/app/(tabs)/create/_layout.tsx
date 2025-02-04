import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator()
const Tab = withLayoutContext(Navigator);

export default function CreateTab() {
  const insets = useSafeAreaInsets()
  return (
    <Tab
      screenOptions={{
        tabBarActiveTintColor: "#38A3A5",
        tabBarInactiveTintColor: "#A3A3A3",
        tabBarIndicatorStyle: { backgroundColor: '#38A3A5'},
        tabBarStyle: {
            paddingTop: insets.top
        }
      }}/>
  );
}
