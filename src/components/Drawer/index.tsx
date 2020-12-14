import React, { useMemo } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/Auth";
import { useTheme } from "styled-components";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import { FontAwesome, Feather } from "@expo/vector-icons";

import Button from "../Button";
import Item from "./Item";

import {
  Container,
  Header,
  HeaderBackground,
  FotoProfile,
  Main,
  MainBackground,
  ListItems,
  Footer,
  FooterBackground,
  Name,
  Email,
} from "./styles";

import { ItemProps } from "./Item";
interface DrawerProps
  extends DrawerContentComponentProps<DrawerContentOptions> {}

const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;
const Drawer: React.FC<DrawerProps> = () => {
  const { SignOut, user } = useAuth();
  const { colors } = useTheme();

  const ITEMS: ItemProps[] = useMemo((): ItemProps[] => {
    return [
      {
        label: "Home",
        icon: () => <FontAwesome name="home" size={25} color={colors.white} />,
      },
      {
        label: "Home",
        icon: () => <FontAwesome name="home" size={25} color={colors.white} />,
      },
    ];
  }, []);

  return (
    <Container>
      <Header>
        <HeaderBackground />
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          activeOpacity={0.5}
          onPress={() => {}}
        >
          <Feather name="arrow-left" color="#FFF" size={30} />
        </TouchableOpacity>
      </Header>
      <Main>
        <MainBackground />
        <MainBackground style={{ backgroundColor: colors.secundary_light }} />
        <ListItems>
          <Name> {`${user.name} ${user.surname}`} </Name>
          <Email> {user.email} </Email>
          {ITEMS.map((item) => (
            <Item key={item.label} {...item} />
          ))}
        </ListItems>
        <FotoProfile width={DRAWER_WIDTH} />
      </Main>
      <Footer>
        <FooterBackground />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingHorizontal: 50,
            paddingBottom: 30,
          }}
        >
          <Button
            onPress={SignOut}
            type="primary"
            Icon={() => <FontAwesome name="sign-out" size={20} color="#FFF" />}
          >
            Sair
          </Button>
        </View>
      </Footer>
    </Container>
  );
};

export default Drawer;
