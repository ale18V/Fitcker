import { Stack } from "expo-router";
import Landing from ".";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    return (

            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        title: "Home"
                    }}
                />
            </Stack>
    )
}