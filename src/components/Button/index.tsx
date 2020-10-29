import React from "react";
import { View } from "react-native";

import { Container, ButtonText, Content } from "./styles";
import { RectButtonProperties } from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, style, ...rest }) => {
  return (
    <Container style={style}>
      <Content {...rest}>
        <ButtonText> {children} </ButtonText>
      </Content>
    </Container>
  );
};

export default Button;
