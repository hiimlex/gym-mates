import styled from '@emotion/native';

const Container = styled.TouchableOpacity`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.white};
  padding: 6px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 12px;
`;

export default { Container };