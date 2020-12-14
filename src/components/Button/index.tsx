import React, { ReactNode } from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "styled-components";
import { Container, ButtonText, Content } from "./styles";
import { RectButtonProperties } from "react-native-gesture-handler";

type TypeColors = "primary" | "secundary";
interface ButtonProps extends RectButtonProperties {
  children: string;
  loading?: boolean;
  colorsGradiend?: string[];
  type?: TypeColors;
  Icon?: () => {};
}
// {
//   start: [0, 1],
//   end: [1, 0],
//   colors: [theme.colors.secundary, "#ffcf4d"],
// }
const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  style,
  type,
  Icon,
  colorsGradiend,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <Container
      start={[0, 1]}
      end={[1, 0]}
      colors={
        colorsGradiend
          ? colorsGradiend
          : type === "primary"
          ? [colors.primary, colors.primary_light]
          : [colors.secundary, colors.secundary_light]
      }
      style={style}
    >
      <Content style={{ opacity: loading ? 0.5 : 1 }} {...rest}>
        {Icon && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {Icon()}
          </View>
        )}
        <ButtonText> {children} </ButtonText>
        {loading && <ActivityIndicator size="small" color={colors.white} />}
      </Content>
    </Container>
  );
};

export default Button;
