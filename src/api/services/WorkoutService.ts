import api from "@api/api";
import { gql } from "@apollo/client";
import { ICreateWorkoutPayload, IWorkout } from "@models/collections";
import { BackendImageMulterKey, Endpoints } from "@models/generic";
import { assetToBuffer } from "@utils/file.utils";
import { AxiosResponse } from "axios";

const WORKOUTS_BY_USER = gql`
  query WorkoutsByUser(
    $userId: MongoID
    $range: [Date]
    $from: [MongoID]
    $sort: SortFindManyWorkoutsInput
    $limit: Int
  ) {
    workouts(
      filter: { user: $userId, range: $range, from: $from }
      sort: $sort
      limit: $limit
    ) {
      picture {
        url
      }
      user {
        _id
        name
        avatar {
          url
        }
      }
      date
      duration
      type
      earned
      _id
      shared_to {
        name
      }
    }
  }
`;

const WORKOUTS_BY_CREW = gql`
  query WorkoutsByCrew(
    $crewId: [MongoID!]
    $range: [Date]
    $earned_op: OperatorsFilterInput
  ) {
    workouts(
      filter: { shared_to_in: $crewId, range: $range, earned_op: $earned_op }
      sort: DATE_DESC
    ) {
      picture {
        url
      }
      user {
        _id
        name
        avatar {
          url
        }
      }
      date
      duration
      type
      earned
      _id
    }
  }
`;

const WORKOUT_POST_BY_WORKOUT_ID = gql`
  query WorkoutPostOne($workoutId: MongoID!) {
    workoutPostOne(filter: { workout_id: $workoutId }) {
      workout_id {
        picture {
          url
        }
        date
        type
        duration
        earned
        _id
        created_at
        updated_at
      }
      author_id {
        name
        avatar {
          url
        }
        email
        coins
      }
      content
      _id
      created_at
      updated_at
      liked_by
      comments {
        post_id
        content
        liked_by
        _id
        created_at
        updated_at
        likes_count
        author_id {
          name
          avatar {
            url
          }
        }
      }
      comments_count
      likes_count
    }
  }
`;

const TOGGLE_LIKE_WORKOUT_POST = gql`
  mutation ToggleLikeWorkoutPost($post_id: MongoID!) {
    toggleWorkoutPostLike(post_id: $post_id) {
      likes_count
      comments_count
    }
  }
`;

const TOGGLE_COMMENT_LIKE_WORKOUT_POST = gql`
  mutation ToggleLikeWorkoutPostComment($comment_id: MongoID!) {
    toggleWorkoutPostCommentLike(comment_id: $comment_id) {
      likes_count
    }
  }
`;

const CREATE_WORKOUT_POST_COMMENT = gql`
  mutation CreateWorkoutPostComment($post_id: MongoID!, $content: String!) {
    createWorkoutPostComment(post_id: $post_id, content: $content) {
      content
      post_id
    }
  }
`;

const createWorkout = async (
  payload: ICreateWorkoutPayload,
): Promise<AxiosResponse<IWorkout>> => {
  const formData = new FormData();

  const { picture, shared_to, ...workoutData } = payload;
  if (picture) {
    formData.append(BackendImageMulterKey, assetToBuffer([picture])[0] as any);
  }

  if (workoutData) {
    type WorkoutDataKeys = keyof typeof workoutData;
    Object.keys(workoutData).forEach((key) => {
      formData.append(key, workoutData[key as WorkoutDataKeys].toString());
    });
  }

  if (shared_to && shared_to.length > 0) {
    shared_to.forEach((crewId) => {
      formData.append("shared_to", crewId.toString());
    });
  }

  const response = await api.post(Endpoints.WorkoutsCreate, formData);

  return response;
};

export default {
  gql: {
    WORKOUTS_BY_USER,
    WORKOUTS_BY_CREW,
    WORKOUT_POST_BY_WORKOUT_ID,
    CREATE_WORKOUT_POST_COMMENT,
    TOGGLE_LIKE_WORKOUT_POST,
    TOGGLE_COMMENT_LIKE_WORKOUT_POST,
  },
  createWorkout,
};
