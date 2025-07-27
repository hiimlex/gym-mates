import { gql } from "@apollo/client";

const WorkoutsByUser = gql`
  query WorkoutsByUser($userId: MongoID, $range: [Date]) {
    workouts(filter: { user: $userId, range: $range }) {
      picture {
        url
      }
      title
      date
      duration
      type
      earned
    }
  }
`;



export default {
  WorkoutsByUser,
};
