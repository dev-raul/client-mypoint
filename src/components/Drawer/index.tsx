import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { useAuth } from "../../contexts/Auth";
import { useTheme } from "styled-components";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";

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
  ImageProfile,
} from "./styles";

import { ItemProps } from "./Item";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
interface DrawerProps
  extends DrawerContentComponentProps<DrawerContentOptions> {}

const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;

const Drawer: React.FC<DrawerProps> = () => {
  const { SignOut, user } = useAuth();
  const { colors } = useTheme();
  const [image, setImage] = useState(null);

  const ITEMS: ItemProps[] = useMemo((): ItemProps[] => {
    return [
      {
        label: "Home",
        icon: () => <FontAwesome name="home" size={25} color={colors.white} />,
      },
    ];
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Precisamos de permissões da câmera para fazer este trabalho!");
        }
      }
    })();
  }, []);
  const setProfile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result?.uri);
    }
  };

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
        <FotoProfile
          width={DRAWER_WIDTH}
          activeOpacity={0.95}
          onPress={setProfile}
        >
          {image ? (
            <ImageProfile source={{ uri: image }} />
          ) : (
            <AntDesign name="adduser" size={40} color={colors.white} />
          )}
        </FotoProfile>
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
