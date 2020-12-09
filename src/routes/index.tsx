import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthStack from "./AuthStack";

import { useAuth } from "../contexts/Auth";

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <></>;
  }
  return signed ? (
    <View style={{ flex: 1, backgroundColor: "red" }} />
  ) : (
    <AuthStack />
  );
};

export default Routes;
