import { WorkoutService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Loader, Typography } from "@components/atoms";
import { IWorkoutsByUser, IWorkoutsFilters } from "@models/collections";
import { OverlayType } from "@models/generic";
import { OverlayActions } from "@store/slices";
import { StoreState } from "@store/Store";
import React, { useMemo } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import WorkoutInfo from "../WorkoutInfo/WorkoutInfo";
import S from "./FollowingActivities.styles";

const FollowingActivities: React.FC = () => {
  const { user } = useSelector((state: StoreState) => state.user);

  const followingIds: string[] = useMemo(
    () => user?.following?.map((f) => f._id) || [],
    [user],
  );

  const { data, loading } = useQuery<IWorkoutsByUser, IWorkoutsFilters>(
    WorkoutService.gql.WORKOUTS_BY_USER,
    {
      variables: {
        from: [...followingIds, user?._id || ""],
        sort: "DATE_DESC",
        limit: 10,
      },
    },
  );

  const dispatch = useDispatch();

  const showImageViewerOverlay = (index: number) => {
    const workout = data?.workouts.filter((w) => !!w.picture?.url);

    dispatch(
      OverlayActions.show({
        type: OverlayType.WorkoutImageViewer,
        data: {
          initialIndex: index,
          workouts: data?.workouts || [],
        },
      }),
    );
  };

  if (!user?.following || user.following.length === 0) {
    return null;
  }

  return (
    <S.Container>
      <Typography.Body _t>{"home.followingActivities"}</Typography.Body>

      {loading && <Loader color="primary" />}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 18 }}
        style={{ height: 500 }}
      >
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

        {data?.workouts.length === 0 && !loading && (
          <Typography.Caption _t>
            {"home.noFollowingActivities"}
          </Typography.Caption>
        )}
      </ScrollView>
    </S.Container>
  );
};

export default FollowingActivities;
