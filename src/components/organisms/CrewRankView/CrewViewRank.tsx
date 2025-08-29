import { CrewLastActivities, CrewTodayWorkouts } from "@components/molecules";
import { StoreState } from "@store/Store";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import S from "./CrewRankView.styles";
import { setAlphaToColor } from "@theme";
import { Avatar, Loader, Typography } from "@components/atoms";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@models/generic";
import { CrewsService } from "@api/services";
import Masks from "@utils/masks.utils";

const CrewRankView: React.FC = () => {
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);

  const { data, error, isPending } = useQuery({
    queryFn: () =>
      CrewsService.getCrewRank({
        crew_id: crew?._id || "",
        show_all: false,
      }),
    queryKey: [QueryKeys.Crew.GetCrewRank],
  });

  const rank = useMemo(() => data?.data, [data]);

  return (
    <S.Container>
      {rank && (
        <S.RankRow>
          <S.RankColumnWrapper>
            <Avatar
              size={42}
              borderOffset={1}
              showBorder
              iconSize={24}
              borderColor="bronze"
              preview={rank[2].avatar.url}
              disabled
            />
            <Typography.Body textColor="text">
              {Masks.getFirstName(rank[2].name) || "N/A"}
            </Typography.Body>
            <S.RankColumn height={30} bg={setAlphaToColor("#BC5E00", 60)}>
              <Typography.Body textAlign="center">{"3º"}</Typography.Body>
            </S.RankColumn>
          </S.RankColumnWrapper>
          <S.RankColumnWrapper>
            <Avatar
              size={42}
              borderOffset={1}
              showBorder
              iconSize={24}
              borderColor="gold"
              preview={rank[0].avatar.url}
              disabled
            />
            <Typography.Body textColor="text">
              {Masks.getFirstName(rank[0].name) || "N/A"}
            </Typography.Body>
            <S.RankColumn height={56} bg={setAlphaToColor("#F3C70D", 60)}>
              <Typography.Body textAlign="center">{"1º"}</Typography.Body>
            </S.RankColumn>
          </S.RankColumnWrapper>
          <S.RankColumnWrapper>
            <Avatar
              size={42}
              borderOffset={1}
              showBorder
              iconSize={24}
              borderColor="silver"
              preview={rank[1].avatar.url}
              disabled
            />
            <Typography.Body textColor="text">
              {Masks.getFirstName(rank[1].name) || "N/A"}
            </Typography.Body>
            <S.RankColumn height={40} bg={setAlphaToColor("#CDCFE5", 60)}>
              <Typography.Body textAlign="center">{"2º"}</Typography.Body>
            </S.RankColumn>
          </S.RankColumnWrapper>
        </S.RankRow>
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
