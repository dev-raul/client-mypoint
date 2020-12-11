import React from "react";

import AuthStack from "./AuthStack";
import AppDrawer from "./AppDrawer";

import { useAuth } from "../contexts/Auth";

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <></>;
  }
  return signed ? <AppDrawer /> : <AuthStack />;
};

export default Routes;
