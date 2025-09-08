import styled from "@emotion/native";
import { INotificationType } from "@models/generic";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

const Notification = styled(
  Animated.createAnimatedComponent(TouchableOpacity)
)<{
  type: INotificationType;
}>`
  flex-direction: row;
  border-radius: 12px;
  padding: 6px 12px;
  gap: 6px;
  align-items: center;
  justify-content: center;
  width: 60%;

  ${({ type, theme }) => {
    switch (type) {
      case "error":
        return `
        background-color: ${theme.colors.danger};
      `;
      case "info":
        return `
        background-color: ${theme.colors.border};
      `;
      case "success":
        return `
        background-color: ${theme.colors.success};
      `;
      case "warning":
        return `
        background-color: ${theme.colors.secondary};
      `;
    }
  }}
`;

export default { Notification };
