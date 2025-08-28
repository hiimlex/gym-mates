import { WorkoutService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Loader, Typography } from "@components/atoms";
import { IWorkoutsByUser, IWorkoutsFilters } from "@models/collections";
import { StoreState } from "@store/Store";
import React, { useEffect, useMemo } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import S from "./FollowingActivities.styles";
import WorkoutInfo from "../WorkoutInfo/WorkoutInfo";
import { OverlayActions } from "@store/slices";
import { OverlayType } from "@models/generic";

const FollowingActivities: React.FC = () => {
  const { user } = useSelector((state: StoreState) => state.user);

  const followingIds: string[] = useMemo(
    () => user?.following?.map((f) => f._id) || [],
    [user]
  );

  const { data, loading } = useQuery<IWorkoutsByUser, IWorkoutsFilters>(
    WorkoutService.gql.WORKOUTS_BY_USER,
    {
      variables: {
        from: [...followingIds, user?._id || ""],
        sort: "DATE_DESC",
      },
    }
  );

  const dispatch = useDispatch();

  const showImageViewerOverlay = (index: number) => {
    const workout = data?.workouts.filter(
      (w) => !!w.picture?.url 
    )

    dispatch(
      OverlayActions.show({
        type: OverlayType.WorkoutImageViewer,
        data: {
          initialIndex: index,
          workouts: data?.workouts || [],
        },
      })
    );
  };

  if (!user?.following || user.following.length === 0) {
    return null;
  }

  return (
    <S.Container>
      <Typography.Body _t>{"home.followingActivities"}</Typography.Body>

      {loading && <Loader color="primary" />}

      {data?.workouts.map((workout, index) => (
        <WorkoutInfo
          workout={workout}
          key={workout._id}
          showCrewName
          showImageViewerOnPress
          loggedUserWorkout={workout.user._id === user._id}
          onImagePress={() => showImageViewerOverlay(index)}
        />
      ))}
    </S.Container>
  );
};

export default FollowingActivities;
