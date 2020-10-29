import React from "react";
import { TextInputProps } from "react-native";

import { Container, TextInput } from "./styles";

const Input: React.FC<TextInputProps> = ({ ...props }) => {
  return (
    <Container>
      <TextInput {...props} />
    </Container>
  );
};

export default Input;
