import { Dimensions } from "react-native";
import { DefaultTheme } from "styled-components/native";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      primary_light: string;
      secundary: string;
      textPrimary: string;
      white: string;
    };
    size: {
      font: Function;
    };
  }
}

export const lightTheme: DefaultTheme = {
  colors: {
    background: "#fff",
    primary: "#5f5aa2",
    primary_light: "#716bc2",
    secundary: "#FF9800",
    textPrimary: "#575757",
    white: "#fff",
  },
  size: {
    font: (x = 1): string => {
      return `${Math.abs((Dimensions.get("screen").width / 24) * x)}px`;
    },
  },
};
