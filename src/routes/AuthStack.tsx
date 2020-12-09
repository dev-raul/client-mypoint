import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Auth from "../pages/Auth";

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Auth"
        component={Auth}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
