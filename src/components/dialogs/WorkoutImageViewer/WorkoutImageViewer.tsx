import { Row, Tabs, Typography } from "@components/atoms";
import { BlurProps } from "@models/generic";
import { OverlayActions } from "@store/slices";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import React, { useMemo, useState } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { CameraOff, X } from "react-native-feather";
import { Easing, FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import WorkoutInfo from "../../molecules/WorkoutInfo/WorkoutInfo";
import S from "./WorkoutImageViewer.styles";

interface WorkoutImageViewerProps {}

const WorkoutImageViewer: React.FC<WorkoutImageViewerProps> = ({}) => {
  const { user } = useSelector((state: StoreState) => state.user);
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
      {...BlurProps}
      entering={FadeIn.duration(100)}
      exiting={FadeOut.easing(Easing.inOut(Easing.ease))}
    >
      <Row gap={12} align="center">
        <TouchableOpacity activeOpacity={0.6} onPress={close}>
          <X stroke={Colors.colors.white} />
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
              {workout.picture?.url && (
                <S.WorkoutPreview
                  source={workout.picture?.url || ""}
                  style={{ height: height * 0.6 }}
                  onError={() => {}}
                ></S.WorkoutPreview>
              )}
              {!workout.picture?.url && (
                <CameraOff width={64} height={64} color={Colors.colors.white} />
              )}
            </S.WorkoutPreviewWrapper>
            <WorkoutInfo
              workout={workout}
              textColor="white"
              textAlt="secondary"
              showImage={false}
              loggedUserWorkout={workout.user._id === user?._id}
            />
          </Tabs.Item>
        ))}
      </Tabs.Root>
    </S.FloatingBlur>
  );
};

export default WorkoutImageViewer;
