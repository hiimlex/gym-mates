import { WorkoutService } from "@api/services";
import { useMutation } from "@apollo/client";
import { CachedImage } from "@georstat/react-native-image-cache";
import { IWorkoutPostComment } from "@models/collections";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TouchableOpacity, View } from "react-native";
import { Heart } from "react-native-feather";
import { useSelector } from "react-redux";
import Row from "../Row/Row";
import Typography from "../Typography/Typography";

type WorkoutPostCommentProps = IWorkoutPostComment & {
  refetchPost: () => void;
};

export default function WorkoutPostComment({
  refetchPost,
  ...comment
}: WorkoutPostCommentProps) {
  const { user } = useSelector((state: StoreState) => state.user);
  const [handleCommentLike] = useMutation(
    WorkoutService.gql.TOGGLE_COMMENT_LIKE_WORKOUT_POST,
    {
      variables: { comment_id: comment._id },
      fetchPolicy: "network-only",
      onCompleted: () => {
        refetchPost();
      },
      onError: (err) => {
        console.error("Error toggling comment like:", err);
      },
    },
  );

  return (
    <Row key={comment._id} gap={12}>
      {comment.author_id.avatar?.url && (
        <CachedImage
          source={comment.author_id.avatar.url}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            overflow: "hidden",
          }}
          imageStyle={{
            width: 40,
            height: 40,
            objectFit: "cover",
          }}
        />
      )}

      <View style={{ flex: 1, gap: 6 }}>
        <Row gap={6} align="center" justify="space-between">
          <Typography.HeadingSubtitle textColor="textDark">
            {comment.author_id.name}
          </Typography.HeadingSubtitle>
          <Typography.Caption textColor="textLight">
            {formatDate(new Date(comment.created_at), "PPp", {
              locale: ptBR,
            })}
          </Typography.Caption>
        </Row>

        <Typography.Body textColor="text">{comment.content}</Typography.Body>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handleCommentLike()}
        >
          <Row align="center" width={"auto"} gap={6}>
            <Heart
              width={20}
              fill={
                comment.liked_by.includes(user?._id || "")
                  ? Colors.colors.danger
                  : "transparent"
              }
              stroke={
                comment.liked_by.includes(user?._id || "")
                  ? Colors.colors.danger
                  : Colors.colors.text
              }
            />
            <Typography.Button textColor="text">
              {comment.likes_count}
            </Typography.Button>
          </Row>
        </TouchableOpacity>
      </View>
    </Row>
  );
}
