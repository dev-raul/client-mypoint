import styled from "styled-components/native";

import { Dimensions, Animated } from "react-native";
const { width } = Dimensions.get("screen");
import { lighten } from "polished";
export const Container = styled.View`
  flex: 1;
  width: ${width}px;
  justify-content: center;
  align-items: center;
`;
export const Content = styled.View`
  justify-content: center;
  align-items: center;
  width: ${width * 0.9}px;
`;
export const Logo = styled(Animated.Image).attrs({
  source: require("../../../../assets/images/logo-signIn.svg"),
})`
  margin-bottom: 30px;
`;
export const Title = styled.Text`
  font-family: "RobotoRegular";
  font-size: ${({ theme }) => theme.size.font(1.3)};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 20px;
`;

export const GoSignUpView = styled.TouchableOpacity`
  margin-top: 20px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;
export const GoSignUpText = styled.Text`
  font-family: "RobotoRegular";
  font-size: ${({ theme }) => theme.size.font(0.9)};
  color: ${({ theme }) => theme.colors.white};
`;
export const Span = styled.Text`
  font-size: ${({ theme }) => theme.size.font(1)};
  color: ${({ theme }) => lighten(0.2, theme.colors.secundary)};
  font-family: "RobotoBold";
`;
