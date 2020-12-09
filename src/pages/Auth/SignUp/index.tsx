import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
  Dimensions,
  TextInput,
  Keyboard,
  View,
} from "react-native";
import * as Yup from "yup";
import { FormHandles } from "@unform/core";
import { validator } from "../../../utils/validatorInput";
import { stringFilterNumber } from "../../../utils/stringFilteNumber";
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
  Row,
} from "./styles";
import InputMask from "../../../components/InputMask";

import { SignUpData, useAuth } from "../../../contexts/Auth";

const { width } = Dimensions.get("screen");
interface SignUpProps {
  goToSignIn(): void;
}

const SignUp: React.FC<SignUpProps> = ({ goToSignIn }) => {
  const { SignUp } = useAuth();

  const animated = new Animated.Value(0);

  const [loading, setLoading] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const surnameRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

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
  const handleSignUp = useCallback(
    async (data: SignUpData) => {
      setLoading(true);
      // console.log("data", data);
      try {
        await validator(
          formRef,
          {
            name: Yup.string().required("Nome obrigatório"),
            surname: Yup.string().required("Sobrenome obrigatório"),
            cpf: Yup.string()
              .length(14, "O cpf tem 11 números")
              .required("Cpf obrigatório"),
            email: Yup.string()
              .email("Digite um e-mail válido")
              .required("E-mail obrigatório"),
            password: Yup.string()
              .required("Senha obrigatória")
              .min(8, "No mínimo 8 digitos"),
            confirmPassword: Yup.string().oneOf(
              [Yup.ref("password"), null],
              "As senhas não conferem"
            ),
          },
          data
        );

        await SignUp({
          ...data,
          cpf: stringFilterNumber(data.cpf),
        });
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
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
              <ContentForm ref={formRef} onSubmit={handleSignUp}>
                <Title>Crie a sua conta e use os nossos serviços :)</Title>

                <Row>
                  <View
                    style={{
                      flex: 1,
                      paddingRight: "2%",
                    }}
                  >
                    <Input
                      validate={async (name) => {
                        try {
                          await validator(
                            formRef,
                            {
                              name: Yup.string().required("Nome obrigatório"),
                            },
                            { name }
                          );
                          let errors = formRef.current?.getErrors();
                          delete errors.name;
                          formRef.current?.setErrors(errors);
                        } catch (err) {}
                      }}
                      name="name"
                      placeholder="Nome"
                      autoCorrect={false}
                      autoCapitalize="words"
                      returnKeyType="next"
                      onSubmitEditing={() => surnameRef.current?.focus()}
                    />
                  </View>

                  <View
                    style={{
                      flex: 1,
                      paddingLeft: "2%",
                    }}
                  >
                    <Input
                      validate={async (surname) => {
                        try {
                          await validator(
                            formRef,
                            {
                              surname: Yup.string().required(
                                "Sobrenome obrigatório"
                              ),
                            },
                            { surname }
                          );
                          let errors = formRef.current?.getErrors();
                          delete errors.surname;
                          formRef.current?.setErrors(errors);
                        } catch (err) {}
                      }}
                      ref={surnameRef}
                      name="surname"
                      placeholder="Sobrenome"
                      autoCorrect={false}
                      autoCapitalize="words"
                      returnKeyType="next"
                      onSubmitEditing={() => cpfRef.current?.focus()}
                    />
                  </View>
                </Row>
                <InputMask
                  validate={async (cpf: string) => {
                    console.log(cpf, cpf.length);
                    if (cpf.length <= 14) {
                      try {
                        await validator(
                          formRef,
                          {
                            cpf: Yup.string()
                              .required("Cpf obrigatório")
                              .length(14, "O cpf tem 11 números"),
                          },
                          { cpf }
                        );
                        let errors = formRef.current?.getErrors();
                        delete errors.cpf;
                        formRef.current?.setErrors(errors);
                      } catch (err) {}
                    }
                  }}
                  ref={cpfRef}
                  placeholder="Cpf"
                  type="cpf"
                  name="cpf"
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                />
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
                  ref={emailRef}
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
                          password: Yup.string()
                            .required("Senha obrigatória")
                            .min(8, "No mínimo 8 digitos"),
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
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                />
                <Input
                  validate={async (confirmPassword) => {
                    try {
                      await validator(
                        formRef,
                        {
                          password: Yup.string().required("Senha obrigatória"),
                          confirmPassword: Yup.string().oneOf(
                            [Yup.ref("password"), null],
                            "As senhas não conferem"
                          ),
                        },
                        {
                          password: formRef.current.getFieldValue("password"),
                          confirmPassword,
                        }
                      );
                      let errors = formRef.current?.getErrors();
                      delete errors.confirmPassword;
                      formRef.current?.setErrors(errors);
                    } catch (err) {}
                  }}
                  ref={confirmPasswordRef}
                  name="confirmPassword"
                  placeholder="Confirme a sua senha"
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
                  CRIAR
                </Button>

                <GoSignUpView onPress={goToSignIn}>
                  <GoSignUpText>Já possui uma conta?</GoSignUpText>
                  <GoSignUpText>
                    clique para <Span>fazer login</Span>
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

export default SignUp;
