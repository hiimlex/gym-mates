import styled from "@emotion/native";
import { ZIndex } from "@models/generic";

export const AbsoluteContainer = styled.View`
  position: absolute;
  top: 0;
  z-index: ${ZIndex.Notifier};
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
`;

export default {
  AbsoluteContainer,
};
