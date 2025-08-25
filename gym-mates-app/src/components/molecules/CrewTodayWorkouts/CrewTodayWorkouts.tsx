import { WorkoutService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Loader, Row, Typography } from "@components/atoms";
import { IFile, IWorkoutsByCrew } from "@models/collections";
import { Colors } from "@theme";
import { format } from "date-fns";
import React, { useState } from "react";
import { Frown } from "react-native-feather";
import S from "./CrewTodayWorkouts.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreState } from "@store/Store";
import { getMessageFromError } from "@utils/handleAxiosError";
import { NotifierActions } from "@store/slices";

const CrewTodayWorkouts: React.FC = () => {
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);
  const [membersAvatar, setMembersAvatar] = useState<IFile[]>([]);
  const today = new Date();
  const todayFormatted = format(today, "MM-dd-yy");
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading } = useQuery<IWorkoutsByCrew>(
    WorkoutService.gql.WORKOUTS_BY_CREW,
    {
      variables: {
        crewId: crew?._id,
        range: [todayFormatted, todayFormatted],
        earned_op: { gte: 1 },
      },
      onError: (error) => {
        const message = getMessageFromError(error);

        if (message) {
          dispatch(
            NotifierActions.createNotification({
              id: "home-fetch-crews-error",
              type: "error",
              message,
            })
          );
        }
      },
      fetchPolicy: "cache-and-network",
    }
  );

  return (
    <S.Container>
      <Typography.Body _t>{"crewView.todayWorkouts"}</Typography.Body>
      <Row gap={12} align="center">
        {loading && <Loader color="primary" />}

        {!loading &&
          !!data &&
          data.workouts &&
          data.workouts.map((workout) => (
            <S.MemberAvatar
              source={workout.user.avatar?.url ?? ""}
              onError={() => {}}
              key={workout._id}
            ></S.MemberAvatar>
          ))}

        {!loading && (!data || data.workouts.length === 0) && (
          <S.EmptyAvatar>
            <Frown
              width={20}
              height={20}
              stroke={Colors.colors.textLight}
              fill={Colors.colors.textLight}
              fillOpacity={0.2}
            />
          </S.EmptyAvatar>
        )}
      </Row>
    </S.Container>
  );
};

export default CrewTodayWorkouts;
