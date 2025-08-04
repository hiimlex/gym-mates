import React, {useEffect, useMemo} from 'react';
import {View, ViewStyle} from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {Circle, G, Svg} from 'react-native-svg';
import {loaderStyles} from './Loader.styles';
import { Colors, TColors } from '@theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ILoaderProps {
  wrapperStyle?: ViewStyle;
  color: TColors;
  size?: string;
  strokeWidth?: number;
}

export const DEFAULT_LOADER_SIZE = '100';

const Loader: React.FC<ILoaderProps> = ({
  color,
  wrapperStyle,
  size = DEFAULT_LOADER_SIZE,
  strokeWidth = 3,
}) => {
  const r = useMemo(() => +size / (2 * Math.PI), [size]);
  const halfCircle = useMemo(() => r + strokeWidth, [strokeWidth, r]);
  const diameter = useMemo(() => halfCircle * 2, [halfCircle]);

  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);

  const colorScheme = useMemo(() => Colors.colors[color], [color]);

  const startAnimation = () => {
    progress.value = withTiming(0.6, {duration: 1000});

    progress.value = withRepeat(
      withSequence(
        withTiming(0.7, {duration: 800}),
        withTiming(0.1, {duration: 2000}),
      ),
      -1,
      true,
    );

    rotation.value = withRepeat(
      withTiming(360, {easing: Easing.linear, duration: 900}),
      -1,
      false,
    );
  };

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: +size * (1 - progress.value),
    };
  }, [progress, size]);

  useEffect(() => {
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  }, []);

  return (
    <View style={[loaderStyles.container, wrapperStyle]}>
      <Animated.View style={animatedViewStyle}>
        <Svg
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}>
          <G origin={`${halfCircle}, ${halfCircle}`} rotation="-90">
            <AnimatedCircle
              cx="50%"
              cy="50%"
              r={r}
              animatedProps={animatedCircleProps}
              strokeWidth={strokeWidth}
              stroke={colorScheme}
              fill={'transparent'}
              strokeDasharray={size}
            />
          </G>
        </Svg>
      </Animated.View>
    </View>
  );
};

export default Loader;