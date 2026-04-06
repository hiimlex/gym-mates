import styled from "@emotion/native";

const Wrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Backdrop = styled.Pressable`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
`;

const KeyboardContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Container = styled.View`
  background-color: white;
  width: 100%;
  padding: 12px;
`;

export default { Wrapper, Backdrop, KeyboardContainer, Container };
