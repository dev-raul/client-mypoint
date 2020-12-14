import React from "react";
import { RouteProp } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";

import DrawerContent, { DRAWER_WIDTH } from "../components/Drawer";
import Home from "../pages/Home";

export type DrawerParamList = {
  Home: undefined;
};
export type DrawerNavProps<T extends keyof DrawerParamList> = {
  navigation: DrawerNavigationProp<DrawerParamList, T>;
  route: RouteProp<DrawerParamList, T>;
};
interface DrawerProps {}
const Drawer = createDrawerNavigator<DrawerParamList>();

const HomeDrawer: React.FC<DrawerProps> = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{ width: DRAWER_WIDTH }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};
export default HomeDrawer;
