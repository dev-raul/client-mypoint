import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { useField } from "@unform/core";

import { Container, TextInput, TextError } from "./styles";
interface InputProps extends TextInputProps {
  name: string;
  validate: Function;
  rawValue?: string;
}
interface InputRefProps {
  value: string;
}
interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, validate, rawValue, onChangeText, ...props },
  ref
) => {
  const {
    fieldName,
    registerField,
    error,
    defaultValue = "",
    clearError,
  } = useField(name);

  const [focused, setFocused] = useState(false);
  const [isValue, setIsValue] = useState(false);
  const [isPassword, SetIsPassword] = useState(false);

  const inputRef = useRef<any>(null);
  const inputValueRef = useRef<InputRefProps>({ value: defaultValue });

  useEffect(() => {
    inputRef.current?.setNativeProps({
      style: { fontFamily: "RobotoRegular" },
    });
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputRef.current?.clear();
      },
      clearValue() {
        inputValueRef.current.value = "";
        inputRef.current?.setNativeProps({ text: "" });
      },
    });
  }, [fieldName, registerField, rawValue]);

  const handleOnChange = useCallback(
    (value) => {
      if (inputValueRef.current) inputValueRef.current.value = value;

      if (onChangeText) onChangeText(value);
    },
    [onChangeText]
  );

  const handleFocused = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(async () => {
    setFocused(false);
    setIsValue(!!inputValueRef.current.value);
    await validate(inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
  }));

  const { colors } = useTheme();

  return (
    <>
      <Container focused={focused} isValue={isValue} isError={!!error}>
        <TextInput
          ref={inputRef}
          onChangeText={handleOnChange}
          defaultValue={defaultValue}
          placeholderTextColor={colors.textPrimary}
          onFocus={handleFocused}
          onBlur={handleBlur}
          {...props}
        />
      </Container>
      {error && <TextError> {error} </TextError>}
    </>
  );
};

export default forwardRef(Input);
