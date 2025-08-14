import { WorkoutService } from "@api/services";
import { useQuery } from "@apollo/client";
import { IWorkoutsByCrew } from "@models/collections";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import React from "react";
import { Frown } from "react-native-feather";
import { useSelector } from "react-redux";
import { Loader, Row, Typography } from "../../atoms";
import WorkoutInfo from "../WorkoutInfo/WorkoutInfo";
import S from "./CrewLastActivities.styles";

const CrewLastActivities: React.FC = () => {
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);

  const { data, loading } = useQuery<IWorkoutsByCrew>(
    WorkoutService.gql.WORKOUTS_BY_CREW,
    {
      variables: { crewId: crew?._id },
      fetchPolicy: "cache-and-network",
    }
  );

  return (
    <S.Container>
      <Typography.Body _t>{"crewView.lastActivities"}</Typography.Body>

      {loading && <Loader color="primary" />}

      {!loading &&
        data &&
        data.workouts &&
        data.workouts.map((workout) => (
          <WorkoutInfo workout={workout} key={workout._id} />
        ))}

      {!loading && (!data || (data.workouts && data.workouts.length === 0)) && (
        <Row gap={6} align="center" width={"auto"}>
          <Frown
            width={20}
            height={20}
            strokeWidth={2}
            stroke={Colors.colors.textLight}
            fill={Colors.colors.textLight}
            fillOpacity={0.2}
          />
          <Typography.Caption textColor="textLight" _t>
            {"crewView.noActivities"}
          </Typography.Caption>
        </Row>
      )}
    </S.Container>
  );
};

export default CrewLastActivities;
