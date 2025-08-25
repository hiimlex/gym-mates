import api from "@api/api";
import { gql } from "@apollo/client";
import {
  IDeviceInfo,
  IDeviceRegistration,
  IEditProfileForm,
  IGetFollowersInfoResponse,
  IGetJourneyFilters,
  IUpdateHealthForm,
  IUserJourney,
} from "@models/collections";
import { BackendImageMulterKey, Endpoints } from "@models/generic";
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
      journey {
        _id
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

const GET_INVENTORY = gql`
  query GetInventory($journeyId: MongoID!, $category: String, $search: String) {
    journeyById(_id: $journeyId) {
      inventory(filter: { category: $category, search: $search }) {
        owned_at
        item {
          ... on Title {
            _id
            category
            name
            price
            requirements
            created_at
            updated_at
            title
          }
          ... on Achievement {
            _id
            category
            name
            price
            requirements
            created_at
            updated_at
            key
            description
          }
          ... on Badge {
            _id
            category
            name
            price
            requirements
            created_at
            updated_at
          }
          ... on Avatar {
            _id
            category
            name
            price
            requirements
            created_at
            updated_at
          }
          ... on Skin {
            _id
            category
            name
            price
            requirements
            created_at
            updated_at
          }
          ... on Figure {
            _id
            category
            name
            price
            requirements
            created_at
            updated_at
          }
        }
      }
    }
  }
`;

const createHealthy = async (body: IUpdateHealthForm) => {
  const response = await api.post(Endpoints.UsersCreateHealthy, body);

  return response;
};

const updateAvatar = async (file: Asset) => {
  const formData = new FormData();
  formData.append(BackendImageMulterKey, assetToBuffer([file])[0] as any);

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
  const response = await api.put(Endpoints.UsersUpdateProfile, data);

  return response;
};

const getFollowersInfo = async (): Promise<
  AxiosResponse<IGetFollowersInfoResponse>
> => {
  const response = await api.get(Endpoints.UsersGetFollowersInfo);
  return response;
};

const registerDevice = async (payload: IDeviceRegistration) => {
  const response = await api.post(Endpoints.UsersRegisterDeviceToken, payload);

  return response;
};

const selectTitle = async (title_id: string) => {
  const response = await api.put(Endpoints.UsersSelectTitle, { title_id });

  return response;
}

export default {
  gql: {
    USER_BY_ID,
    UPDATE_USER_BY_ID,
    GET_INVENTORY,
  },
  createHealthy,
  updateAvatar,
  getJourney,
  follow,
  unfollow,
  updateProfile,
  getFollowersInfo,
  registerDevice,
  selectTitle
};
