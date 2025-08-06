import { WorkoutService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Loader, Row, Typography } from "@components/atoms";
import { IFile, IWorkoutsByCrew } from "@models/collections";
import { Colors } from "@theme";
import { format } from "date-fns";
import React, { useState } from "react";
import { Frown } from "react-native-feather";
import S from "./CrewTodayWorkouts.styles";
import { useSelector } from "react-redux";
import { StoreState } from "@store/Store";

const CrewTodayWorkouts: React.FC = () => {
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);
  const [membersAvatar, setMembersAvatar] = useState<IFile[]>([]);
  const today = new Date();
  const todayFormatted = format(today, "MM-dd-yy");

  const { data, loading } = useQuery<IWorkoutsByCrew>(
    WorkoutService.gql.WORKOUTS_BY_CREW,
    {
      variables: {
        crewId: crew?._id,
        range: [todayFormatted, todayFormatted],
        earned_op: { gte: 1 },
      },
      onError: (error) => {
        console.error("Error fetching today's workouts:", error);
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
