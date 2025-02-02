import { Stack } from "expo-router";
import "../../styles/global.css";
import Toaster from "$/components/toast/Toaster";
import React from "react";

export default function RootLayout() {
  return (
    <React.Fragment>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Home",
          }}
        />
      </Stack>
      <Toaster />
    </React.Fragment>
  );
}
