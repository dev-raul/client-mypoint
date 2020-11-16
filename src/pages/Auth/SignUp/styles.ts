import styled from "styled-components/native";
import { Dimensions, Animated } from "react-native";
import { Form } from "@unform/mobile";

const { width } = Dimensions.get("screen");
import { lighten, rgba } from "polished";

export const Backgroung = styled.ImageBackground`
  flex: 1;
  width: ${width}px;
`;
export const Container = styled.View`
  flex: 1;
  width: ${width}px;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => rgba(theme.colors.background, 0.95)};
`;
export const ContentForm = styled(Form)`
  justify-content: center;
  align-items: center;
  width: ${width * 0.9}px;
`;
export const Logo = styled(Animated.Image).attrs({
  source: require("../../../../assets/images/logo-signIn.png"),
})`
  margin-bottom: 50px;
`;
export const Title = styled.Text`
  font-family: "RobotoRegular";
  font-size: ${({ theme }) => theme.size.font(1.3)};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 20px;
  text-align: center;
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
  color: ${({ theme }) => theme.colors.textPrimary};
`;
export const Span = styled.Text`
  font-size: ${({ theme }) => theme.size.font(1)};
  color: ${({ theme }) => lighten(0.2, theme.colors.secundary)};
  font-family: "RobotoBold";
`;

export const CopyRight = styled.Text`
  position: absolute;
  bottom: 5px;
  text-align: center;
  right: 0;
  left: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: "RobotoRegular";
  font-size: ${({ theme }) => theme.size.font(1)};
`;
export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;
