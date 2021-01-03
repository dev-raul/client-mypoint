import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import Toast from '../../utils/Toast'
import AsyncStorage from '@react-native-community/async-storage'
import { useAuth } from "../../contexts/Auth";
import { useTheme } from "styled-components";

import api, {baseURL} from '../../services/api'

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

import {IProfilePost} from '../../@types'

interface DrawerProps
  extends DrawerContentComponentProps<DrawerContentOptions> {}

const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;

const Drawer: React.FC<DrawerProps> = () => {
  const { SignOut, user, setUser } = useAuth();
  const { colors } = useTheme();
  const [image, setImage] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false)

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
      if(user.profile){
        const token = await AsyncStorage.getItem("@MyPoint:token")
        setImage(`${baseURL}/file/${user.profile}?token=${token}`)
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
      const localUri = result.uri; 
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      
      
      const data = new FormData();
      
      data.append("file", {
        name: filename,
        type,
        uri:
        Platform.OS === "android" ? localUri : localUri.replace("file://", "")
      } );
      try{
        setLoadingProfile(true)
        const resUpload = await api.post(`/user/${user.id}/profile`, data, {
          headers: {
            "content-type": "multipart/form-data"
          }
        })
        setImage(result?.uri);
        setUser({...user, profile: resUpload.data.profile})
        setLoadingProfile(false)
      }catch(err){
        setLoadingProfile(false)
        if(err.response){
          Toast(err.response.data.error)
        }

      }
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
          
          {loadingProfile && (
            <ActivityIndicator size='small' color={colors.white} style={[StyleSheet.absoluteFill, {zIndex: 10, elevation:3}]} />
          )}
          {image ? (
            <ImageProfile  
            source={{ 
              uri: image,
             }} 
             resizeMode='cover'
            />
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
