import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
  Dimensions,
  TextInput,
  StatusBar,
} from "react-native";
import { FormHandles } from "@unform/core";

import Input from "../../../components/Input";
import Button from "../../../components/Button";

import {
  Container,
  ContentForm,
  Title,
  Logo,
  GoSignUpView,
  GoSignUpText,
  Span,
  Backgroung,
} from "./styles";
const { width } = Dimensions.get("screen");
interface SignInProps {
  goToSignUp(): void;
}
const SignIn: React.FC<SignInProps> = ({ goToSignUp }) => {
  const animated = new Animated.Value(0);

  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  useEffect(() => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  const handleSignIn = useCallback(async (data) => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, width }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1, width }}
          keyboardShouldPersistTaps="handled"
        >
          <Backgroung
            source={require("../../../../assets/images/background.jpg")}
            imageStyle={{ resizeMode: "cover" }}
          >
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
              <ContentForm ref={formRef} onSubmit={handleSignIn}>
                <Title>Olá, seja bem vindo :)</Title>
                <Input
                  name="email"
                  placeholder="Digite seu e-mail"
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
                <Input
                  ref={passwordRef}
                  name="password"
                  placeholder="Digite a sua senha"
                  keyboardType="default"
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="send"
                  onSubmitEditing={() => formRef.current?.submitForm()}
                />
                <Button
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  ENTRAR
                </Button>

                <GoSignUpView onPress={goToSignUp}>
                  <GoSignUpText>Ainda não tem conta?</GoSignUpText>
                  <GoSignUpText>
                    clique para <Span>criar uma conta</Span>
                  </GoSignUpText>
                </GoSignUpView>
              </ContentForm>
            </Container>
          </Backgroung>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
