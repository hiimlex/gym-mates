import { Coin, Typography } from "@components/atoms";
import { AppDispatch, StoreState } from "@store/Store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import S from "./WorkoutEarns.styles";

const WorkoutEarns: React.FC = () => {
  const { createdWorkout } = useSelector(
    (state: StoreState) => state.addWorkout,
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <S.Container>
      <Coin showLabel={false} size={80} />

      {createdWorkout?.earned! === 0 && (
        <Typography.Heading
          _t
          textAlign="center"
          _params={{
            coins: createdWorkout?.earned,
            plural: (createdWorkout?.earned || 0) < 1 ? "s" : "",
          }}
        >
          {"addWorkout.earnedNothingText"}
        </Typography.Heading>
      )}

      {createdWorkout?.earned! > 0 && (
        <Typography.Heading
          _t
          textAlign="center"
          _params={{
            coins: createdWorkout?.earned,
            plural: (createdWorkout?.earned || 0) < 1 ? "s" : "",
          }}
        >
          {"addWorkout.paidText"}
        </Typography.Heading>
      )}
    </S.Container>
  );
};

export default WorkoutEarns;
