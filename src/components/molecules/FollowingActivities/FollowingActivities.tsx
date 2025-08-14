import { WorkoutService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Loader, Typography } from "@components/atoms";
import { IWorkoutsByUser, IWorkoutsFilters } from "@models/collections";
import { StoreState } from "@store/Store";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import S from "./FollowingActivities.styles";
import WorkoutInfo from "../WorkoutInfo/WorkoutInfo";

const FollowingActivities: React.FC = () => {
  const { user } = useSelector((state: StoreState) => state.user);

  const { data, loading } = useQuery<IWorkoutsByUser, IWorkoutsFilters>(
    WorkoutService.gql.WORKOUTS_BY_USER,
    {
      variables: {
        from: user?.following?.map((f) => f._id) || [],
        sort: 'DATE_DESC',
      },
    }
  );

  if (!user?.following || user.following.length === 0) {
    return null;
  }

  return (
    <S.Container>
      <Typography.Body _t>{"home.followingActivities"}</Typography.Body>

      {loading && <Loader color="primary" />}

      {data?.workouts.map((workout) => (
        <WorkoutInfo workout={workout} key={workout._id} showCrewName />
      ))}
    </S.Container>
  );
};

export default FollowingActivities;
