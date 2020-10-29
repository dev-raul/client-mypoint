import styled from "styled-components/native";
import { Dimensions, FlatList } from "react-native";
const { width } = Dimensions.get("screen");
export const Container = styled.View`
  flex: 1;
`;
export const Scroll = styled.FlatList``;
export const Teste = styled.View`
  flex: 1;
  width: ${width}px;
`;
