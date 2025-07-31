import React from "react";
import S from "./styles";
import { IWorkout } from "@models/collections";
import { BannerPreview, Row, Typography } from "../../atoms";
import { format } from "date-fns";
import { CameraOff, Circle, DollarSign } from "react-native-feather";
import { Colors } from "@theme";

interface WorkoutInfoProps {
  workout: IWorkout;
}

const WorkoutInfo: React.FC<WorkoutInfoProps> = ({ workout }) => {
  const Dot = (
    <Circle
      width={5}
      height={5}
      stroke={Colors.colors.textLight}
      fill={Colors.colors.textLight}
    />
  );

  return (
    <S.WorkoutGroup>
      <Typography.Caption textColor="textLight">
        {format(new Date(workout.date), "dd/MM HH:mm")}
      </Typography.Caption>

      <S.WorkoutRow>
        <Row gap={12} align="center" width={"auto"}>
          <BannerPreview preview={workout.picture?.url} size={48} />

          <S.WorkoutInfo>
            <Typography.Body _t _params={{ name: workout.user.name }}>
              {"crewView.hasPaid"}
            </Typography.Body>

            <Row gap={6} align="center">
              <Typography.Caption textColor="textLight">
                {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
              </Typography.Caption>
              {Dot}
              <Typography.Caption textColor="textLight">
                {workout.title}
              </Typography.Caption>
            </Row>
          </S.WorkoutInfo>
        </Row>

        <Row gap={6} align="center" width={"auto"}>
          <Typography.Button textColor="textLight">
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
