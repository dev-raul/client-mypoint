import React from "react";
import { View } from "react-native";

import { Container } from "./styles";
interface SignUpProps {
  goToSignIn(): void;
}
const SignUp: React.FC<SignUpProps> = () => {
  return <Container></Container>;
};

export default SignUp;
