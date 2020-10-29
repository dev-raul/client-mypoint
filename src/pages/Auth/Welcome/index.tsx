import React, { useEffect } from "react";
import Animated, { useValue, Easing } from "react-native-reanimated";
import { StatusBar } from "react-native";
import { rgba } from "polished";
import { useTheme } from "styled-components";

import Button from "../../../components/Button";

import { Container, Content, Backgroung, Logo, CopyRight } from "./styles";
interface WelcomeProps {
  goToSignIn: Function;
  goToSignUp: Function;
}
const Welcome: React.FC<WelcomeProps> = ({ goToSignIn, goToSignUp }) => {
  const { colors } = useTheme();
  const animation = useValue(0);
  const opacity = useValue(0);
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.bounce,
      }).start();
    });
  }, []);
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={rgba(colors.primary, 0.6)}
      />
      <Backgroung
        source={require("../../../../assets/images/background.jpg")}
        imageStyle={{ resizeMode: "cover" }}
      >
        <Container>
          <Content>
            <Logo
              style={{
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, 0],
                    }),
                  },
                ],
              }}
            />
            <Animated.View style={{ width: "100%", opacity: opacity }}>
              <Button
                style={{
                  marginBottom: 8,
                }}
                onPress={() => goToSignIn()}
              >
                Já possui uma conta?
              </Button>
              <Button onPress={() => goToSignUp()}>
                Não possui uma conta?
              </Button>
            </Animated.View>
          </Content>
        </Container>
      </Backgroung>
      <CopyRight>2020 - Criado por Raul Silva</CopyRight>
    </>
  );
};

export default Welcome;
