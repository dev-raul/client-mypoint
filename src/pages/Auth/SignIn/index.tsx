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
import getValidationErros from "../../../utils/getValidationError";

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
      console.log("open");
      setKeyboardOpen(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      console.log("close");
      setKeyboardOpen(false);
    });

    Animated.timing(animated, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  const handleSignIn = useCallback(
    async (data: FormData) => {
      console.log(loading);
      if (!loading) {
        console.log(data);
        setLoading(true);
        try {
          const scheme = Yup.object().shape({
            email: Yup.string()
              .email("Digite um e-mail válido")
              .required("E-mail obrigatório"),
            password: Yup.string().min(8, "No mínimo 8 digitos"),
          });

          await scheme.validate(data, { abortEarly: false });
          formRef.current?.setErrors({});
          setLoading(false);
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            console.log(err);
            const errors = getValidationErros(err);
            console.log("errprs", errors);
            formRef.current?.setErrors(errors);
          }
          setLoading(false);
        }
      }
    },
    [loading]
  );

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
          </Backgroung>
        </ScrollView>
      </KeyboardAvoidingView>
      {!keyboardOpen && <CopyRight>2020 - Criado por Raul Silva</CopyRight>}
    </>
  );
};

export default SignIn;
