import React from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Item, ItemIcon, ItemLabel } from "./styles";
export interface ItemProps {
  label: string;
  icon: () => {};
}
const ItemComponent: React.FC<ItemProps> = ({ icon, label }) => {
  return (
    <RectButton>
      <Item>
        <ItemIcon>{icon()}</ItemIcon>
        <ItemLabel>{label}</ItemLabel>
      </Item>
    </RectButton>
  );
};

export default ItemComponent;
