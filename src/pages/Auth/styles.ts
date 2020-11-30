import styled from "styled-components/native";
import { Dimensions, FlatList } from "react-native";
import { lighten, rgba } from "polished";

const { width } = Dimensions.get("screen");
export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => rgba(theme.colors.background, 0.95)};
`;
export const Scroll = styled.FlatList``;
export const Teste = styled.View`
  flex: 1;
  width: ${width}px;
`;
export const Backgroung = styled.ImageBackground`
  flex: 1;
  width: ${width}px;
  
`;