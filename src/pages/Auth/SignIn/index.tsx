import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
  Dimensions,
  TextInput,
  Keyboard,
} from "react-native";
import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { validator } from "../../../utils/validatorInput";

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
  CopyRight,
} from "./styles";
const { width } = Dimensions.get("screen");
interface SignInProps {
  goToSignUp(): void;
}
interface FormData {
  email: string;
  password: string;
}
const SignIn: React.FC<SignInProps> = ({ goToSignUp }) => {
  const animated = new Animated.Value(0);

  const [loading, setLoading] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardOpen(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOpen(false);
    });

    Animated.timing(animated, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  const handleSignIn = useCallback(async (data: FormData) => {
    if (!loading) {
      setLoading(true);
      try {
        await validator(
          formRef,
          {
            email: Yup.string()
              .email("Digite um e-mail válido")
              .required("E-mail obrigatório"),
            password: Yup.string().min(8, "No mínimo 8 digitos"),
          },
          data
        );
        formRef.current?.setErrors({});
      } catch (err) {}
      setLoading(false);
    }
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
            <Container>
              <Logo
                style={{
                  transform: [
                    {
                      translateY: animated.interpolate({
                        inputRange: [0, 1],
                        outputRange: [60, 0],
                      }),
                    },
                  ],
                }}
              />
              <Animated.View style={{ opacity: animated }}>
                <ContentForm ref={formRef} onSubmit={handleSignIn}>
                  <Title>Olá, seja bem vindo :)</Title>
                  <Input
                    validate={async (email) => {
                      try {
                        await validator(
                          formRef,
                          {
                            email: Yup.string()
                              .email("Digite um e-mail válido")
                              .required("E-mail obrigatório"),
                          },
                          { email }
                        );
                        let errors = formRef.current?.getErrors();
                        delete errors.email;
                        formRef.current?.setErrors(errors);
                      } catch (err) {}
                    }}
                    name="email"
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                  />
                  <Input
                    validate={async (password) => {
                      try {
                        await validator(
                          formRef,
                          {
                            password: Yup.string().min(
                              8,
                              "No mínimo 8 digitos"
                            ),
                          },
                          { password }
                        );
                        let errors = formRef.current?.getErrors();
                        delete errors.password;
                        formRef.current?.setErrors(errors);
                      } catch (err) {}
                    }}
                    ref={passwordRef}
                    name="password"
                    placeholder="Digite a sua senha"
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="send"
                    onSubmitEditing={() => formRef.current?.submitForm()}
                  />
                  <Button
                    loading={loading}
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
              </Animated.View>
            </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      {!keyboardOpen && <CopyRight>2020 - Criado por Raul Silva</CopyRight>}
    </>
  );
};

export default SignIn;
