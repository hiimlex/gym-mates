import { gql } from "@apollo/client";

const CrewsByMember = gql`
  query CrewsByMember($userId: [MongoID]) {
    crews(filter: { userId: $userId }) {
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

export default {
  CrewsByMember,
};
