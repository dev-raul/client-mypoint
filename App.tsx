import "react-native-gesture-handler";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./src/contexts/Auth";
import { lightTheme } from "./src/themes";

import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor={lightTheme.colors.primary}
          />
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
