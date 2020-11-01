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
}
interface InputRefProps {
  value: string;
}
interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, ...props },
  ref
) => {
  const { fieldName, registerField, error, defaultValue = "" } = useField(name);

  const [focused, setFocused] = useState(false);
  const [isValue, setIsValue] = useState(false);

  const inputRef = useRef<any>(null);
  const inputValueRef = useRef<InputRefProps>({ value: defaultValue });

  useEffect(() => {
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
  }, [fieldName, registerField]);

  const handleFocused = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
    setIsValue(!!inputValueRef.current.value);
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
          onChangeText={(value) => (inputValueRef.current.value = value)}
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
