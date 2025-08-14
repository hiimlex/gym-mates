import React, { useEffect } from "react";
import S from "./ShareWorkout.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import {
  BannerPreview,
  Button,
  Card,
  Checkbox,
  Row,
  Typography,
} from "@components/atoms";
import { useQuery } from "@apollo/client";
import { CrewsService, WorkoutService } from "@api/services";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreState } from "@store/Store";
import { ICrewsResponse } from "@models/collections";
import { AddWorkoutActions, DialogActions, UserActions } from "@store/slices";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { DateTimeFormat } from "@models/generic";
import { client } from "@api/apollo";
import WorkoutEarns from "../WorkoutEarns/WorkoutEarns";

const ShareWorkout: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { user } = useSelector((state: StoreState) => state.user);
  const { shared_to, picture, formData } = useSelector(
    (state: StoreState) => state.addWorkout
  );

  const { data: crewsData } = useQuery<ICrewsResponse>(
    CrewsService.gql.CREWS_BY_MEMBER,
    {
      variables: { userId: user?._id },
    }
  );

  const dispatch = useDispatch<AppDispatch>();

  const selectCrew = (crewId: string) => {
    let newSharedTo: string[] = [...(shared_to || [])];
    const isShared = newSharedTo.includes(crewId);
    if (isShared) {
      newSharedTo = newSharedTo.filter((id) => id !== crewId);
    }

    if (!isShared) {
      newSharedTo.push(crewId);
    }

    dispatch(AddWorkoutActions.setSharedTo(newSharedTo));
  };

  const { mutate: createWorkout, isPending } = useMutation({
    mutationFn: WorkoutService.createWorkout,
    onSuccess: async (data) => {
      await dispatch(UserActions.fetchCurrentUser());

      await client.refetchQueries({
        include: [WorkoutService.gql.WORKOUTS_BY_USER],
      });

      if (data.data) {
        dispatch(AddWorkoutActions.setCreatedWorkout(data.data));
      }

      dispatch(
        DialogActions.openDialog({
          content: <WorkoutEarns />,
        })
      );
    },
    onError: (error) => {
      console.error("Error creating workout:", error);
    },
  });

  const handleCreateWorkout = () => {
    if (shared_to && shared_to.length > 0 && formData) {
      createWorkout({
        picture,
        title: formData.title,
        date: format(new Date(formData.date), DateTimeFormat),
        type: formData.type,
        duration: formData.duration,
        shared_to,
      });
    }
  };

  return (
    <S.Container contentContainerStyle={{ flex: 1, gap: 24 }}>
      {crewsData?.crews?.map((crew) => (
        <S.CrewCard
          key={crew._id}
          touchable
          onPress={() => selectCrew(crew._id)}
          active={shared_to?.includes(crew._id)}
        >
          <Row gap={12} align="center" width={"auto"}>
            <BannerPreview preview={crew?.banner?.url} size={48} />
            <Typography.HeadingSubtitle textColor="primary">
              {crew?.name}
            </Typography.HeadingSubtitle>
          </Row>

          <Checkbox checked={shared_to?.includes(crew._id)} disabled />
        </S.CrewCard>
      ))}

      <S.FloatButton style={{ paddingBottom: insets.bottom + 12, width }}>
        <Button
          colorScheme="secondary"
          title="addWorkout.buttons.paid"
          disabled={!shared_to?.length}
          onPress={handleCreateWorkout}
          loading={isPending}
        />
      </S.FloatButton>
    </S.Container>
  );
};

export default ShareWorkout;
