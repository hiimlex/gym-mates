import React, { useEffect } from "react";
import { View } from "react-native";
import S from "./WorkoutEarns.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreState } from "@store/Store";
import { Dialog, Typography } from "@components/atoms";
import { DollarSign } from "react-native-feather";
import { Colors } from "@theme";
import { AddWorkoutActions, DialogActions } from "@store/slices";

const WorkoutEarns: React.FC = () => {
  const { createdWorkout } = useSelector(
    (state: StoreState) => state.addWorkout
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      DialogActions.updateData({
        onBackPress: () => {
          dispatch(DialogActions.closeDialog());
          dispatch(AddWorkoutActions.reset());
        },
      })
    );
  }, []);

  useEffect(() => {
    if (!createdWorkout || createdWorkout?.earned === 0) {
      dispatch(AddWorkoutActions.reset());
      dispatch(DialogActions.closeDialog());
    }
  }, [createdWorkout]);

  return (
    <S.Container>
      <S.Coin>
        <DollarSign
          width={24}
          height={24}
          stroke={Colors.colors.secondary}
          strokeWidth={3}
        />
      </S.Coin>

      <Typography.Heading
        _t
        textAlign="center"
        _params={{
          coins: createdWorkout?.earned,
        }}
      >
        {"addWorkout.paidText"}
      </Typography.Heading>
    </S.Container>
  );
};

export default WorkoutEarns;
