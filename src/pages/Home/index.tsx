import React from "react";
import { DrawerNavProps } from "../../routes/AppDrawer";
import { Button } from "react-native";

import { Container } from "./styles";

import { useAuth } from "../../contexts/Auth";

interface HomeProps extends DrawerNavProps<"Home"> {}
const Home: React.FC<HomeProps> = ({}) => {
  const { SignOut } = useAuth();
  return (
    <Container>
      <Button title="Sair" onPress={SignOut} />
    </Container>
  );
};

export default Home;
