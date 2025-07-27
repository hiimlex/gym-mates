import { gql } from "@apollo/client";

const CrewsByMember = gql`
  query Crews($members: [MongoID!]) {
    crews(filter: { members: $members }) {
      name
      banner {
        url
      }
      code
    }
  }
`;

export default {
  CrewsByMember,
};
