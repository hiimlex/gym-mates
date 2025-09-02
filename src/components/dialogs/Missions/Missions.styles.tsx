import styled from '@emotion/native';
import { setAlphaToColor } from '@theme';
import { BlurView } from 'expo-blur';
import Animated from 'react-native-reanimated';

const FloatingBlur = styled(Animated.createAnimatedComponent(BlurView))`
  position: absolute;
  z-index: 999;
  bottom: 0;
  left: 0;
  flex: 1;
  background: ${setAlphaToColor("#000000", 60)};
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
`;
export default { FloatingBlur };