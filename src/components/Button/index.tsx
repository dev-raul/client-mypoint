import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { Container, ButtonText, Content } from "./styles";
import { RectButtonProperties } from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProperties {
  children: string;
  loading: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  style,
  ...rest
}) => {
  const { colors } = useTheme();
  return (
    <Container style={style}>
      <Content style={{ opacity: loading ? 0.5 : 1 }} {...rest}>
        <ButtonText> {children} </ButtonText>
        {loading && <ActivityIndicator size="small" color={colors.white} />}
      </Content>
    </Container>
  );
};

export default Button;
