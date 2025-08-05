import api from "@api/api";
import { gql } from "@apollo/client";
import {
  IEditProfileForm,
  IGetJourneyFilters,
  IUpdateHealthForm,
  IUserJourney,
} from "@models/collections";
import { Endpoints } from "@models/generic";
import { assetToBuffer } from "@utils/file.utils";
import { queryBuilder } from "@utils/queryBuilder";
import { AxiosResponse } from "axios";
import { Asset } from "react-native-image-picker";

const USER_BY_ID = gql`
  query UserById($_id: MongoID!) {
    userById(_id: $_id) {
      name
      email
      coins
      favorites
      day_streak
      created_at
      _id
      updated_at
      avatar {
        url
      }
      title {
        name
        title
      }
      coins
      crews_count
      followers {
        _id
        name
        avatar {
          url
        }
      }
      following {
        _id
        name
        avatar {
          url
        }
      }
    }
  }
`;

const UPDATE_USER_BY_ID = gql`
  mutation UpdateUserById($_id: MongoID!, $data: UpdateByIdUsersInput!) {
    updateUserById(_id: $_id, record: $data) {
      recordId
      record {
        name
        email
      }
      error
    }
  }
`;

const createHealthy = async (body: IUpdateHealthForm) => {
  const response = await api.post(Endpoints.UsersCreateHealthy, body);

  return response;
};

const updateAvatar = async (file: Asset) => {
  const formData = new FormData();
  formData.append("image", assetToBuffer([file])[0] as any);

  const response = await api.put(Endpoints.UsersUpdateAvatar, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const getJourney = async (
  filters?: IGetJourneyFilters
): Promise<AxiosResponse<IUserJourney>> => {
  const queryString = queryBuilder(filters);

  const response = await api.get(
    `${Endpoints.UsersGetJourney}${queryString ? `?${queryString}` : ""}`
  );
  return response;
};

const follow = async (userId: string) => {
  const response = await api.post(Endpoints.UsersFollow, {
    follower_id: userId,
  });

  return response;
};

const unfollow = async (userId: string) => {
  const response = await api.post(Endpoints.UsersUnfollow, {
    follower_id: userId,
  });

  return response;
};

const updateProfile = async (
  userId: string,
  data: Partial<IEditProfileForm>
): Promise<AxiosResponse<null>> => {
  const response = await api.put(
    Endpoints.UsersUpdateProfile,
    data
  );

  return response;
};

export default {
  gql: {
    USER_BY_ID,
    UPDATE_USER_BY_ID,
  },
  createHealthy,
  updateAvatar,
  getJourney,
  follow,
  unfollow,
  updateProfile,
};
