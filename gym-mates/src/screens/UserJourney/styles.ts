import styled from "@emotion/native";

const Container = styled.View`
  flex: 1;
  gap: 24px;
  padding: 24px;
`;

const Header = styled.View`
  gap: 12px;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const LoaderWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const JourneyEventWrapper = styled.View`
  gap: 12px;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const JourneyEvent = styled.View`
  padding: 6px;
  flex: 1;
  gap: 6px;
`;

const Timeline = styled.View`
  min-width: 8px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HistoryLine = styled.View`
  width: 1px;
  flex-grow: 1;
  height: max-content;
  background-color: ${({ theme }) => theme.colors.border};
`;

const EventDot = styled.View`
  position: absolute;
  top: 10px;
  left: 0;
  width: 8px;
  z-index: 1;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export default {
  Container,
  Header,
  ScrollView,
  LoaderWrapper,
  JourneyEventWrapper,
  JourneyEvent,
  HistoryLine,
  EventDot,
  Timeline,
};
