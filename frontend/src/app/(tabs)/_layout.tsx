import { Tabs } from "expo-router"

export default function HomeLayout() {
    return (
        <Tabs initialRouteName="createTab" screenOptions={{
            tabBarActiveTintColor: "#38A3A5",
        }}/>
    )
}