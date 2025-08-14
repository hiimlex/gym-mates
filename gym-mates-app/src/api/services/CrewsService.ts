import api from "@api/api";
import { gql } from "@apollo/client";
import {
  IUpdateCrewBannerPayload,
  IUpdateCrewPayload,
} from "@models/collections";
import { Endpoints } from "@models/generic";
import { assetToBuffer } from "@utils/file.utils";

const CREWS_BY_MEMBER = gql`
  query CrewsByMember(
    $userId: [MongoID]
    $created_by: MongoID
    $favorites: [MongoID]
    $_id: MongoID
    $limit: Int
  ) {
    crews(
      filter: {
        userId: $userId
        created_by: $created_by
        favorites: $favorites
        _id: $_id
      },
      limit: $limit
    ) {
      _id
      name
      banner {
        url
      }
      members_w_user {
        _id
        is_admin
        joined_at
        user {
          _id
          name
          avatar {
            url
          }
          coins
        }
      }
      code
      visibility
      rules {
        gym_focused
        pay_on_past
        pay_without_picture
        show_members_rank
        free_weekends
      }
      streak
      created_by
      created_at
      updated_at
      lose_streak_in_days
    }
  }
`;

const SEARCH_CREWS = gql`
  query SearchCrews($search: String) {
    crews(filter: { search: $search }, limit: 1) {
      _id
      name
      banner {
        url
      }
      members_w_user {
        _id
        is_admin
        joined_at
        user {
          _id
          name
          avatar {
            url
          }
          coins
        }
      }
      code
      visibility
      rules {
        gym_focused
        pay_on_past
        pay_without_picture
        show_members_rank
        free_weekends
      }
      streak
      created_by
      created_at
      updated_at
      lose_streak_in_days
    }
  }
`;

const favorite = async (crewId: string) => {
  const response = await api.put(Endpoints.CrewsFavorite, {
    crew_id: crewId,
  });

  return response;
};

const updateSettings = async (payload: IUpdateCrewPayload) => {
  const response = await api.put(Endpoints.CrewsUpdateConfig, payload);
  return response;
};

const updateBanner = async (payload: IUpdateCrewBannerPayload) => {
  const formData = new FormData();
  formData.append("image", assetToBuffer([payload.file])[0] as any);
  formData.append("crew_id", payload.crew_id);

  const response = await api.put(Endpoints.CrewsUpdateBanner, formData);
  return response;
};

const joinCrew = async (code: string) => {
  const response = await api.post(Endpoints.CrewsJoin, {
    code,
  });

  return response;
};

const leave = async (code: string) => {
  const response = await api.post(Endpoints.CrewsLeave, { code });

  return response;
};

export default {
  gql: {
    CREWS_BY_MEMBER,
    SEARCH_CREWS,
  },
  favorite,
  updateSettings,
  updateBanner,
  joinCrew,
  leave,
};
