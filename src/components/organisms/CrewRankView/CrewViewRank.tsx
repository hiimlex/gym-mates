import { CrewLastActivities, CrewTodayWorkouts } from "@components/molecules";
import { StoreState } from "@store/Store";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import S from "./CrewRankView.styles";
import { setAlphaToColor } from "@theme";
import { Avatar, Loader, Row, Typography } from "@components/atoms";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@models/generic";
import { CrewsService } from "@api/services";
import Masks from "@utils/masks.utils";
import { View, Image } from "react-native";

const CrewRankView: React.FC = () => {
  const { user } = useSelector((state: StoreState) => state.user);
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);

  const { data, error, isPending } = useQuery({
    queryFn: () =>
      CrewsService.getCrewRank({
        crew_id: crew?._id || "",
        show_all: false,
      }),
    queryKey: [QueryKeys.Crew.GetCrewRank],
    staleTime: 0,
  });

  const rank = useMemo(() => data?.data, [data]);

  return (
    <S.Container>
      {rank && rank.length === 3 && (
        <S.RankRow>
          <S.RankColumnWrapper>
            <Avatar
              size={42}
              borderOffset={4}
              showBorder
              iconSize={24}
              borderColor="bronze"
              preview={rank[2]?.avatar?.url}
              disabled
            />
            <Typography.Body textColor="text">
              {Masks.getFirstName(rank[2].name) || "N/A"}
            </Typography.Body>
            <Image
              source={require("../../../assets/podium_3.png")}
              style={{ marginRight: -12 }}
            />
          </S.RankColumnWrapper>
          <S.RankColumnWrapper>
            <Avatar
              size={42}
              borderOffset={4}
              showBorder
              iconSize={24}
              borderColor="gold"
              preview={rank[0].avatar?.url}
              disabled
            />
            <Typography.Body textColor="text">
              {Masks.getFirstName(rank[0].name) || "N/A"}
            </Typography.Body>
            <Image source={require("../../../assets/podium_1.png")} />
          </S.RankColumnWrapper>
          <S.RankColumnWrapper>
            <Avatar
              size={42}
              borderOffset={4}
              showBorder
              iconSize={24}
              borderColor="silver"
              preview={rank[1].avatar?.url}
              disabled
            />
            <Typography.Body textColor="text">
              {Masks.getFirstName(rank[1].name) || "N/A"}
            </Typography.Body>
            <Image
              source={require("../../../assets/podium_2.png")}
              style={{ marginLeft: -22 }}
            />
          </S.RankColumnWrapper>
        </S.RankRow>
      )}

      {(!rank || rank.length < 3) && !isPending && (
        <View>
          <Typography.Body textColor="textLight" _t>
            {"crewView.noRank"}
          </Typography.Body>
        </View>
      )}
      {isPending && (
        <S.LoaderWrapper>
          <Loader color="secondary" />
          <Typography.Body _t>{"crewView.loadingRank"}</Typography.Body>
        </S.LoaderWrapper>
      )}
      <CrewTodayWorkouts />
      <CrewLastActivities label="crewView.lastActivities" />
    </S.Container>
  );
};

export default CrewRankView;
