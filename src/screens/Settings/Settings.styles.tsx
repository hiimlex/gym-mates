import styled from "@emotion/native";

const Group = styled.View`
  gap: 12px;
`;

const ButtonSwitchContainer = styled.View`
  padding: 6px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.backgroundGradient};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ButtonSwitchItem = styled.TouchableOpacity<{ active?: boolean }>`
  padding: 12px;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.backgroundGradient};
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

export default { Group, ButtonSwitchContainer, ButtonSwitchItem, ScrollView };
