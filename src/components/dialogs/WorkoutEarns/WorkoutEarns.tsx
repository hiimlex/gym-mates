import React, { useEffect } from "react";
import { View } from "react-native";
import S from "./WorkoutEarns.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreState } from "@store/Store";
import { Coin, Dialog, Typography } from "@components/atoms";
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
      <Coin showLabel={false} size={80} />

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
    </S.Container>
  );
};

export default WorkoutEarns;
