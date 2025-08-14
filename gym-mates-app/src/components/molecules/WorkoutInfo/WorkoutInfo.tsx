import React, { useEffect } from "react";
import S from "./WorkoutInfo.styles";
import { IWorkout } from "@models/collections";
import { BannerPreview, Row, Typography } from "../../atoms";
import { format } from "date-fns";
import { CameraOff, Circle, DollarSign } from "react-native-feather";
import { Colors } from "@theme";
import { StoreState } from "@store/Store";
import { useSelector } from "react-redux";
import { View } from "react-native";

interface WorkoutInfoProps {
  workout: IWorkout;
  dateFormat?: string;
  loggedUserWorkout?: boolean;
  showDateTime?: boolean;
  showCrewName?: boolean;
}

const WorkoutInfo: React.FC<WorkoutInfoProps> = ({
  workout,
  dateFormat = "dd/MM/yy HH:mm",
  loggedUserWorkout = false,
  showDateTime = true,
  showCrewName = false,
}) => {
  const { user } = useSelector((state: StoreState) => state.user);

  const Dot = (
    <Circle
      width={5}
      height={5}
      stroke={Colors.colors.textLight}
      fill={Colors.colors.textLight}
    />
  );

  const isToday =
    !!workout.date &&
    format(new Date(workout.date), "yyyy-MM-dd") ===
      format(new Date(), "yyyy-MM-dd");

  useEffect(() => {},[])

  return (
    <S.WorkoutGroup>
      <S.WorkoutRow>
        {isToday && showDateTime && (
          <Typography.Caption
            textColor="textLight"
            _t
            _params={{ time: format(new Date(workout.date), "HH:mm") }}
          >
            {"crewView.todayWorkout"}
          </Typography.Caption>
        )}
        {!isToday && showDateTime && (
          <Typography.Caption textColor="textLight">
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
          <BannerPreview preview={workout.picture?.url} size={48} />

          <S.WorkoutInfo>
            {loggedUserWorkout && (
              <Typography.Body _t _params={{ name: user?.name }}>
                {"journey.events.paid"}
              </Typography.Body>
            )}
            {!loggedUserWorkout && (
              <Typography.Body _t _params={{ name: workout.user.name }}>
                {"crewView.hasPaid"}
              </Typography.Body>
            )}

            <Row gap={6} align="center">
              {/* {receiptLabel.map((label, index) => (
                <Typography.Caption key={label} textColor="textLight" _t>
                  {`crewStreaks.${label}`}
                </Typography.Caption>
              ))} */}
              <Typography.Caption textColor="textLight">
                {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
              </Typography.Caption>
            </Row>
          </S.WorkoutInfo>
        </Row>

        <Row gap={6} align="center" width={"auto"}>
          <Typography.Button textColor="text">
            + {workout.earned}
          </Typography.Button>
          <S.CoinWrapper>
            <DollarSign
              width={10}
              height={10}
              strokeWidth={2}
              stroke={Colors.colors.secondary}
              fill={Colors.colors.secondary}
              fillOpacity={0.2}
            />
          </S.CoinWrapper>
        </Row>
      </S.WorkoutRow>
    </S.WorkoutGroup>
  );
};

export default WorkoutInfo;
