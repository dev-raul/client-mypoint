import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
  Easing,
  Dimensions,
} from "react-native";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

import {
  Container,
  Content,
  Title,
  Logo,
  GoSignUpView,
  GoSignUpText,
  Span,
} from "./styles";
const { width } = Dimensions.get("screen");
const SignIn: React.FC = () => {
  const animated = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <>
      {/* <KeyboardAvoidingView
        style={{ flex: 1, width }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1, width }}
          keyboardShouldPersistTaps="handled"
        > */}
      <Container>
        <Logo
          style={{
            transform: [
              {
                translateY: animated.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
            ],
          }}
        />
        <Content>
          <Title>Olá, seja bem vindo :)</Title>
          <Input
            style={{ fontFamily: "RobotoRegular" }}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
          />
          <Input
            style={{ fontFamily: "RobotoRegular", letterSpacing: 1 }}
            placeholder="Digite a sua senha"
            keyboardType="default"
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="send"
          />
          <Button
            onPress={() => {
              console.log("click");
            }}
          >
            ENTRAR
          </Button>

          <GoSignUpView>
            <GoSignUpText>Ainda não tem conta?</GoSignUpText>
            <GoSignUpText>
              clique para <Span>criar uma conta</Span>
            </GoSignUpText>
          </GoSignUpView>
        </Content>
      </Container>
      {/* </ScrollView>
      </KeyboardAvoidingView> */}
    </>
  );
};

export default SignIn;
