import { WorkoutService } from "@api/services";
import { useMutation } from "@apollo/client";
import { Input, Row } from "@components/atoms";
import { CachedImage } from "@georstat/react-native-image-cache";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { Send } from "react-native-feather";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import S from "./AddWorkoutPostComment.styles";

interface AddWorkoutPostCommentProps {
  refetchPost: () => void;
  post_id: string;
}

export interface AddWorkoutPostCommentRef {
  open: () => void;
  close: () => void;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const AddWorkoutPostComment = forwardRef<
  AddWorkoutPostCommentRef,
  AddWorkoutPostCommentProps
>(({ refetchPost, post_id }: AddWorkoutPostCommentProps, ref) => {
  const { user } = useSelector((state: StoreState) => state.user);
  const insets = useSafeAreaInsets();
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState("");

  const [handleComment, { data, loading, error }] = useMutation(
    WorkoutService.gql.CREATE_WORKOUT_POST_COMMENT,
    {
      variables: { content, post_id },
      onError: (err) => {
        console.error("Error creating comment:", err);
      },
      onCompleted: () => {
        setContent("");
        refetchPost();
        close();
      },
    },
  );

  const open = useCallback(() => {
    setIsVisible(true);
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [close, open],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <S.Wrapper>
      <S.Backdrop onPress={close} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
        style={{ flex: 1 }}
      >
        <S.KeyboardContainer>
          <S.Container style={{ paddingBottom: insets.bottom }}>
            <Row align="center" gap={18}>
              {user?.avatar?.url && (
                <CachedImage
                  source={user.avatar.url}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                  imageStyle={{ borderRadius: 20, objectFit: "cover" }}
                />
              )}
              <Input
                placeholder={"workoutPost.addCommentPlaceholder"}
                containerStyle={{ flex: 1 }}
                value={content}
                onChange={({ nativeEvent }) => setContent(nativeEvent.text)}
              />

              {content.trim() !== "" && (
                <AnimatedTouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    handleComment();
                  }}
                  entering={FadeInRight}
                >
                  <Send color={Colors.colors.text} />
                </AnimatedTouchableOpacity>
              )}
            </Row>
          </S.Container>
        </S.KeyboardContainer>
      </KeyboardAvoidingView>
    </S.Wrapper>
  );
});

export default AddWorkoutPostComment;
