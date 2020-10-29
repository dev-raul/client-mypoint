import styled from "styled-components/native";

export const Container = styled.View`
  margin-bottom: 10px;
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.textPrimary,
}))`
  flex: 1;
  font-size: ${({ theme }) => theme.size.font(0.9)};
  font-family: "RobotoRegular";
  letter-spacing: 1px;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
