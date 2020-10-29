import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { LinearGradient } from "expo-linear-gradient";
import { lighten, darken } from "polished";

const { width } = Dimensions.get("screen");

export const Content = styled(RectButton)`
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  height: 46px;
`;
export const Container = styled(LinearGradient).attrs(({ theme }) => ({
  start: [0, 1],
  end: [1, 0],
  colors: [theme.colors.secundary, "#ffcf4d"],
}))`
  width: 100%;
  border-radius: 4px;
`;
export const ButtonText = styled.Text`
  font-size: ${({ theme }) => theme.size.font(1)};
  font-family: "RobotoBold";
  color: ${({ theme }) => theme.colors.textPrimary};
`;
