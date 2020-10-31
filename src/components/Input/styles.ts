import styled, { css } from "styled-components/native";
interface ContainerProps {
  focused: boolean;
  isValue: boolean;
}
export const Container = styled.View<ContainerProps>`
  margin-bottom: 10px;
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;

  ${(props) =>
    (props.focused || props.isValue) &&
    css`
      border-left-width: 4px;
      border-left-color: ${({ theme }) => theme.colors.secundary};
      padding: 0px 11px;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: ${({ theme }) => theme.size.font(0.9)};
  font-family: "RobotoRegular";
  letter-spacing: 1px;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
