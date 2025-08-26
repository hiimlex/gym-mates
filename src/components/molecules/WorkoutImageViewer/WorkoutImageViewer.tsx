import { StoreState } from "@store/Store";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import S from "./WorkoutImageViewer.styles";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { OverlayActions } from "@store/slices";
import { Row, Tabs, Typography } from "@components/atoms";
import { ArrowLeft } from "react-native-feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@theme";
import WorkoutInfo from "../WorkoutInfo/WorkoutInfo";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  SlideInDown,
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutRight,
} from "react-native-reanimated";

interface WorkoutImageViewerProps {}

const WorkoutImageViewer: React.FC<WorkoutImageViewerProps> = ({}) => {
  const { data } = useSelector((state: StoreState) => state.overlay);
  const workouts = useMemo(() => data?.workouts || [], [data]);
  const initialIndex = useMemo(() => data?.initialIndex || 0, [data]);
  const [index, setIndex] = useState<number>(initialIndex);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const currentWorkout = useMemo(() => {
    return workouts[index] || null;
  }, [workouts, index]);

  const close = () => {
    dispatch(OverlayActions.hide());
  };

  if (!currentWorkout) {
    return null;
  }

  return (
    <S.FloatingBlur
      style={{
        width,
        height,
        paddingTop: insets.top + 24,
        paddingBottom: insets.bottom + 48,
      }}
      intensity={15}
      entering={SlideInRight}
      exiting={SlideOutRight}
    >
      <Row gap={12}>
        <TouchableOpacity activeOpacity={0.6} onPress={close}>
          <ArrowLeft stroke={Colors.colors.white} />
        </TouchableOpacity>
        <Typography.HeadingSubtitle textColor="white" _t>
          {"workoutViewer.title"}
        </Typography.HeadingSubtitle>
      </Row>
      <Typography.Body _t textColor="textLight">
        {"workoutViewer.tip"}
      </Typography.Body>

      <Tabs.Root
        initialPage={index}
        containerStyle={{ width: width - 48 }}
        onPageSelected={(e) => setIndex(e.nativeEvent.position)}
        offscreenPageLimit={24}
      >
        {workouts.map((workout, index) => (
          <Tabs.Item
            key={index}
            contentContainerStyle={{ flex: 1, gap: 12, paddingHorizontal: 6 }}
            bounces={false}
          >
            <S.WorkoutPreviewWrapper>
              <S.WorkoutPreview
                source={workout.picture?.url || ""}
                style={{ height: height * 0.6 }}
                onError={() => {}}
              ></S.WorkoutPreview>
            </S.WorkoutPreviewWrapper>
            <WorkoutInfo
              workout={workout}
              textColor="white"
              textAlt="secondary"
              showImage={false}
            />
          </Tabs.Item>
        ))}
      </Tabs.Root>
    </S.FloatingBlur>
  );
};

export default WorkoutImageViewer;
