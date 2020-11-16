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
      danger: string;
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
    danger: "#f02626",
  },
  size: {
    font: (x = 1): string => {
      const { width, height } = Dimensions.get("screen");
      return width < height
        ? `${Math.abs((width / 24) * x)}px`
        : `${Math.abs((height / 24) * x)}px`;
    },
  },
};
