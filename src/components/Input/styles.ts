import styled, { css } from "styled-components/native";
interface ContainerProps {
  focused: boolean;
  isValue: boolean;
  isError: boolean;
}
export const Container = styled.View<ContainerProps>`
  margin-bottom: 10px;
  padding: 0 15px;
  height: 46px;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  ${({ isValue }) =>
    isValue &&
    css`
      border-color: ${({ theme }) => theme.colors.secundary};
      border-right-width: 0px;
      border-top-width: 0px;
      border-bottom-width: 0px;
      border-left-width: 4px;
      padding: 0px 11px;
    `}

  ${({ isError }) =>
    isError &&
    css`
      border-color: ${({ theme }) => theme.colors.danger};
      border-right-width: 0px;
      border-top-width: 0px;
      border-bottom-width: 0px;
      border-left-width: 4px;
      padding: 0px 11px;
    `}

  ${({ focused }) =>
    focused &&
    css`
      border-color: ${({ theme }) => theme.colors.secundary};
      border-right-width: 0px;
      border-top-width: 0px;
      border-bottom-width: 0px;
      border-left-width: 4px;
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
export const TextError = styled.Text`
  margin-top: -9px;
  text-align: right;
  width: 100%;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.danger};
`;
