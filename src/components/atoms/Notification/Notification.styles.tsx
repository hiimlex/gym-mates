import styled from "@emotion/native";
import { INotificationType } from "@models/generic";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

const Notification = styled(
  Animated.createAnimatedComponent(TouchableOpacity),
)<{
  type: INotificationType;
}>`
  flex-direction: row;
  border-radius: 12px;
  padding: 6px 12px;
  gap: 6px;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  max-width: 90%;

  shadow-color: ${({ theme }) => theme.colors.borderDark};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 2px;
  elevation: 5;

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
