import styled from "styled-components/native";
import { Dimensions, FlatList } from "react-native";
import Animated from "react-native-reanimated";
import { RectButton } from "react-native-gesture-handler";
const { width } = Dimensions.get("screen");
import { LinearGradient } from "expo-linear-gradient";
import { rgba } from "polished";
export const Backgroung = styled.ImageBackground`
  flex: 1;
  width: ${width}px;
`;
export const Container = styled(LinearGradient).attrs(({ theme }) => ({
  start: [0, 0],
  end: [1, 1],
  colors: [
    rgba(theme.colors.primary, 0.95),
    rgba(theme.colors.primary_light, 0.95),
  ],
}))`
  flex: 1;
  width: ${width}px;
  justify-content: center;
  align-items: center;
`;
export const Content = styled.View`
  flex: 1;
  width: ${width * 0.8}px;
  justify-content: center;
  align-items: center;
`;
export const Logo = styled(Animated.Image).attrs({
  source: require("../../../../assets/images/logo-signIn.png"),
})`
  width: 120px;
  height: 120px;
  margin-bottom: 100px;
`;

export const CopyRight = styled.Text`
  position: absolute;
  bottom: 5px;
  text-align: center;
  right: 0;
  left: 0;
  color: #fff;
  font-family: "RobotoRegular";
  font-size: ${({ theme }) => theme.size.font(1)};
`;
