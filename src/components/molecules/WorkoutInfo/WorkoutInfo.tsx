import { IWorkout } from "@models/collections";
import { StoreState } from "@store/Store";
import { Colors, TColors } from "@theme";
import { format } from "date-fns";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { Circle, DollarSign } from "react-native-feather";
import { useSelector } from "react-redux";
import { BannerPreview, Coin, Row, Typography } from "../../atoms";
import S from "./WorkoutInfo.styles";
import Header from "../Header/Header";

interface WorkoutInfoProps {
  workout: IWorkout;
  dateFormat?: string;
  loggedUserWorkout?: boolean;
  showDateTime?: boolean;
  showCrewName?: boolean;
  showImageViewerOnPress?: boolean;
  onImagePress?: () => void;
  showImage?: boolean;
  textColor?: TColors;
  textAlt?: TColors;
}

const WorkoutInfo: React.FC<WorkoutInfoProps> = ({
  workout,
  dateFormat = "dd/MM/yy HH:mm",
  loggedUserWorkout = false,
  showDateTime = true,
  showCrewName = false,
  showImageViewerOnPress = false,
  onImagePress,
  showImage = true,
  textColor = "textDark",
  textAlt = "textLight",
}) => {
  const { user } = useSelector((state: StoreState) => state.user);

  const Dot = (
    <Circle
      width={5}
      height={5}
      stroke={Colors.colors[textAlt]}
      fill={Colors.colors[textAlt]}
    />
  );

  const isToday =
    !!workout.date &&
    format(new Date(workout.date), "yyyy-MM-dd") ===
      format(new Date(), "yyyy-MM-dd");

  const receiptLabel = useMemo(() => {
    const labels: string[] = [workout.title];

    if (workout.type) {
      labels.push(`workoutTypes.${workout.type}`);
    }

    if (workout.receipt) {
      Object.keys(workout.receipt).forEach((key) => {
        if (workout.receipt[key as keyof typeof workout.receipt] > 0) {
          labels.push(`crewStreaks.${key}`);
        }
      });
    }

    return labels;
  }, [workout]);

  return (
    <S.WorkoutGroup>
      <S.WorkoutRow>
        {isToday && showDateTime && (
          <Typography.Caption
            textColor={textAlt}
            _t
            _params={{ time: format(new Date(workout.date), "HH:mm") }}
          >
            {"crewView.todayWorkout"}
          </Typography.Caption>
        )}
        {!isToday && showDateTime && (
          <Typography.Caption textColor={textAlt}>
            {format(new Date(workout.date), dateFormat)}
          </Typography.Caption>
        )}

        {showCrewName && (
          <Typography.Caption textColor="primary">
            {workout.shared_to.map((crew) => crew.name).join(", ")}
          </Typography.Caption>
        )}
      </S.WorkoutRow>

      <S.WorkoutRow>
        <Row gap={12} align="center" width={"auto"}>
          {showImage && (
            <TouchableOpacity
              disabled={!showImageViewerOnPress || !workout.picture?.url}
              onPress={onImagePress}
              activeOpacity={0.6}
            >
              <BannerPreview
                preview={workout.picture?.url}
                size={48}
                iconSize={20}
              />
            </TouchableOpacity>
          )}

          <S.WorkoutInfo>
            {loggedUserWorkout && (
              <Typography.Body
                _t
                textColor={textColor}
                _params={{ name: user?.name }}
              >
                {"crewView.youPaid"}
              </Typography.Body>
            )}
            {!loggedUserWorkout && (
              <Typography.Body
                textColor={textColor}
                _t
                _params={{ name: workout.user.name }}
              >
                {"crewView.hasPaid"}
              </Typography.Body>
            )}

            <Row gap={6} align="center">
              {receiptLabel.map((label, index) => (
                <Row gap={6} width="auto" align="center" key={index}>
                  <Typography.Caption textColor={textAlt} _t>
                    {label}
                  </Typography.Caption>
                  {index < receiptLabel.length - 1 && Dot}
                </Row>
              ))}
            </Row>
          </S.WorkoutInfo>
        </Row>

        <Coin
          label={"+" + workout.earned.toString()}
          textColor={textColor}
          textVariant="body"
        />
      </S.WorkoutRow>
    </S.WorkoutGroup>
  );
};

export default WorkoutInfo;
