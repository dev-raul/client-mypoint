import React, { useState, useCallback, forwardRef } from "react";
import { TextInputMask, TextInputMaskProps } from "react-native-masked-text";
import Input from "../Input";
interface InputMaskProps extends TextInputMaskProps {
  name: string;
  validate: Function;
}
interface InputRef {
  focus(): void;
}

const InputMask: React.ForwardRefRenderFunction<InputRef, InputMaskProps> = (
  { type, ...rest },
  ref
) => {
  const [value, setValue] = useState("");
  const [rawValue, setRawValue] = useState("");
  const handleOnChangeText = useCallback((maskedValue, unmaskedValue) => {
    setValue(maskedValue);
    setRawValue(unmaskedValue);
  }, []);
  return (
    <TextInputMask
      type={type}
      includeRawValueInChangeText
      value={value}
      onChangeText={handleOnChangeText}
      customTextInput={Input}
      customTextInputProps={{
        rawValue,
        ...rest,
        ref,
      }}
      {...rest}
    />
  );
};
export default forwardRef(InputMask);
