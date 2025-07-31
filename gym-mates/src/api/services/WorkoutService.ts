import api from "@api/api";
import { gql } from "@apollo/client";
import { ICreateWorkoutPayload, IWorkout } from "@models/collections";
import { Endpoints } from "@models/generic";
import { assetToBuffer } from "@utils/file.utils";
import { AxiosResponse } from "axios";

const WorkoutsByUser = gql`
  query WorkoutsByUser($userId: MongoID, $range: [Date]) {
    workouts(filter: { user: $userId, range: $range }) {
      picture {
        url
      }
      user {
        name
        avatar {
          url
        }
      }
      title
      date
      duration
      type
      earned
      _id
    }
  }
`;

const WorkoutsByCrew = gql`
  query WorkoutsByCrew($crewId: [MongoID!], $range: [Date]) {
    workouts(filter: { shared_to: $crewId, range: $range }, sort: DATE_DESC) {
      picture {
        url
      }
      user {
        name
        avatar {
          url
        }
      }
      title
      date
      duration
      type
      earned
      _id
    }
  }
`;

const createWorkout = async (payload: ICreateWorkoutPayload): Promise<AxiosResponse<IWorkout>> => {
  const formData = new FormData();

  const { picture, shared_to, ...workoutData } = payload;
  if (picture) {
    formData.append("image", assetToBuffer([picture])[0] as any);
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
  WorkoutsByUser,
  WorkoutsByCrew,
  createWorkout,
};
