import WorkoutService from "@api/services/WorkoutService";
import { useMutation, useQuery } from "@apollo/client";
import { Coin, Loader, Row, Typography } from "@components/atoms";
import { ScreenWrapper } from "@components/molecules";
import { IWorkoutGetPost } from "@models/collections";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import React, { cloneElement } from "react";

import { iconByWorkoutType } from "@components/atoms/Icons/Icons";
import WorkoutPostComment from "@components/atoms/WorkoutPostComment/WorkoutPostComment";
import AddWorkoutPostComment, {
  AddWorkoutPostCommentRef,
} from "@components/molecules/AddWorkoutPostComment/AddWorkoutPostComment";
import { CachedImage } from "@georstat/react-native-image-cache";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TouchableOpacity, View } from "react-native";
import { Clock, Heart, MessageCircle } from "react-native-feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import S from "./WorkoutPost.styles";

export default function WorkoutPost({
  route: {
    params: { workoutId },
  },
}: ScreenProps<AppRoutes.WorkoutPost>) {
  const insets = useSafeAreaInsets();
  const { user } = useSelector((state: StoreState) => state.user);
  const { data, loading, refetch } = useQuery<{
    workoutPostOne: IWorkoutGetPost;
  }>(WorkoutService.gql.WORKOUT_POST_BY_WORKOUT_ID, {
    variables: { workoutId },
    fetchPolicy: "network-only",
  });

  const [handleLike] = useMutation(
    WorkoutService.gql.TOGGLE_LIKE_WORKOUT_POST,
    {
      variables: { post_id: data?.workoutPostOne._id },
      fetchPolicy: "network-only",
      onCompleted: () => {
        refetch();
      },
    },
  );

  const addCommentRef = React.useRef<AddWorkoutPostCommentRef>(null);

  if (loading || !data?.workoutPostOne) {
    return (
      <ScreenWrapper useHeaderHeight>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Loader color="primary" />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper useHeaderHeight padding={0} gap={0}>
      <S.WorkoutPostImagePlacement
        hasImage={!!data.workoutPostOne.workout_id.picture}
      >
        {data.workoutPostOne.workout_id.picture &&
        data.workoutPostOne.workout_id.picture.url ? (
          <CachedImage
            source={data.workoutPostOne.workout_id.picture.url}
            style={{ width: "100%", height: "100%" }}
          />
        ) : null}
      </S.WorkoutPostImagePlacement>

      <S.Container
        contentContainerStyle={{ gap: 12, paddingBottom: insets.bottom }}
      >
        <Row gap={12} align="center">
          <Row gap={6} align="center" width={"auto"}>
            {cloneElement(
              iconByWorkoutType[data.workoutPostOne.workout_id.type]({
                size: 16,
                strokeWidth: 2,
                fill: Colors.colors.tertiary,
                stroke: Colors.colors.tertiary,
              }),
            )}
            <Typography.Caption textColor="tertiary" _t>
              {"workoutTypes." + data.workoutPostOne.workout_id.type}
            </Typography.Caption>
          </Row>
          <Row gap={6} align="center" width={"auto"}>
            <Clock width={16} color={Colors.colors.tertiary} />
            <Typography.Caption textColor="tertiary">
              {data.workoutPostOne.workout_id.duration}m
            </Typography.Caption>
          </Row>

          <Typography.Caption></Typography.Caption>
        </Row>

        <Row gap={12} justify="space-between">
          <Row width={"auto"} gap={12}>
            {data.workoutPostOne.author_id.avatar?.url && (
              <CachedImage
                source={data.workoutPostOne.author_id.avatar.url}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  overflow: "hidden",
                }}
                imageStyle={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                }}
              />
            )}

            <S.UserInfoColumn>
              <Typography.Heading textColor="textDark">
                {data.workoutPostOne.author_id.name}
              </Typography.Heading>

              <Typography.Caption textColor="textLight">
                {formatDate(new Date(data.workoutPostOne.created_at), "PPp", {
                  locale: ptBR,
                })}
              </Typography.Caption>
            </S.UserInfoColumn>
          </Row>

          <Coin
            label={"+" + data.workoutPostOne.workout_id.earned}
            textVariant="body"
          />
        </Row>

        <Typography.Body textColor="text" _t={!data.workoutPostOne.content}>
          {data.workoutPostOne.content ?? "workoutPost.noContent"}
        </Typography.Body>

        <S.WorkoutInteractions>
          <TouchableOpacity activeOpacity={0.6} onPress={() => handleLike()}>
            <Row align="center" width={"auto"} gap={6}>
              <Heart
                width={20}
                fill={
                  data.workoutPostOne.liked_by.includes(user?._id || "")
                    ? Colors.colors.danger
                    : "transparent"
                }
                stroke={
                  data.workoutPostOne.liked_by.includes(user?._id || "")
                    ? Colors.colors.danger
                    : Colors.colors.text
                }
              />
              <Typography.Button textColor="text">
                {data.workoutPostOne.likes_count}
              </Typography.Button>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => addCommentRef.current?.open()}
          >
            <Row align="center" width={"auto"} gap={6}>
              <MessageCircle width={20} color={Colors.colors.text} />
              <Typography.Button textColor="text">
                {data.workoutPostOne.comments_count}
              </Typography.Button>
            </Row>
          </TouchableOpacity>
        </S.WorkoutInteractions>

        <S.HR />

        <S.CommentsSection>
          {data.workoutPostOne.comments.map((comment) => (
            <WorkoutPostComment
              refetchPost={refetch}
              key={comment._id}
              {...comment}
            />
          ))}
        </S.CommentsSection>
      </S.Container>

      <AddWorkoutPostComment
        post_id={data.workoutPostOne._id}
        ref={addCommentRef}
        refetchPost={refetch}
      />
    </ScreenWrapper>
  );
}
