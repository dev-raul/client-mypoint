import styled from "styled-components/native";
import { lighten } from "polished";

interface FotoProfileProps {
  width: number;
}

export const Container = styled.View`
  flex: 1;
`;
export const Header = styled.View`
  flex: 0.2;
  background-color: #fff;
`;
export const HeaderBackground = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom-right-radius: 70px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
export const FotoProfile = styled.TouchableOpacity<FotoProfileProps>`
  position: absolute;
  left: ${({ width }) => width / 2 - 50}px;
  right: 0;
  top: -50px;
  align-self: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${({ theme }) => lighten(0.2, theme.colors.textPrimary)};
  justify-content: center;
  align-items: center;
`;
export const ImageProfile = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
export const Main = styled.View`
  flex: 0.8;
`;
export const MainBackground = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
`;
export const MainBackgroundSecundary = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secundary};
`;
export const ListItems = styled.View`
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 50px;
  border-top-left-radius: 70px;
  border-bottom-right-radius: 70px;
`;
export const Footer = styled.View`
  flex: 0.2;
  background-color: #fff;
`;
export const FooterBackground = styled.View`
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-top-left-radius: 70px;
  background-color: ${({ theme }) => theme.colors.secundary_light};
`;
export const Name = styled.Text`
  font-size: ${({ theme }) => theme.size.font(1.3)};
  font-family: "RobotoBold";
  letter-spacing: 1px;
  text-align: center;
  margin-top: 20px;
`;
export const Email = styled.Text`
  font-size: ${({ theme }) => theme.size.font(0.8)};
  font-family: "RobotoRegular";
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 20px;
`;
export const Item = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  margin: 5px 0px;
`;
export const ItemIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
  padding: 5px;

  background-color: ${({ theme }) => theme.colors.primary};
`;
export const ItemLabel = styled.Text`
  font-size: ${({ theme }) => theme.size.font(1)};
  font-family: "RobotoBold";
  letter-spacing: 1px;
  margin-left: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
