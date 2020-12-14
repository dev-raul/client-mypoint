import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { LinearGradient } from "expo-linear-gradient";
import { lighten, darken } from "polished";

const { width } = Dimensions.get("screen");

export const Content = styled(RectButton)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  border-radius: 4px;
  height: 46px;
`;
export const Container = styled(LinearGradient)`
  width: 100%;
  border-radius: 4px;
`;
export const ButtonText = styled.Text`
  font-size: ${({ theme }) => theme.size.font(1)};
  font-family: "RobotoBold";
  color: ${({ theme }) => theme.colors.white};
`;
