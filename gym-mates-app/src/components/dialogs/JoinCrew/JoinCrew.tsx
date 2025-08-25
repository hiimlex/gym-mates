import { client } from "@api/apollo";
import { CrewsService } from "@api/services";
import { useQuery } from "@apollo/client";
import { CrewVisibility, ICrew, ICrewsResponse } from "@models/collections";
import { DialogActions, NotifierActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import { Colors } from "@theme";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Check } from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Input, Loader, Row, Typography } from "../../atoms";
import CrewInfo from "../../molecules/CrewInfo/CrewInfo";
import S from "./JoinCrew.styles";
import { getMessageFromError } from "@utils/handleAxiosError";

const JoinCrew: React.FC = () => {
  const { user } = useSelector((state: StoreState) => state.user);
  const [filters, setFilters] = useState({
    search: "",
  });
  const [oldTimeout, setOldTimeout] = useState<NodeJS.Timeout | null>(null);

  const {
    data,
    loading: loadingCrew,
    refetch,
  } = useQuery<ICrewsResponse>(CrewsService.gql.SEARCH_CREWS, {
    variables: filters,
    fetchPolicy: "cache-and-network",
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (oldTimeout) {
      clearTimeout(oldTimeout);
    }

    const timeout = setTimeout(() => {
      refetch();
    }, 300);

    setOldTimeout(timeout);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [filters]);

  const getActiveRules = (crew: ICrew) =>
    Object.keys(crew?.rules || {}).filter(
      (ruleKey) => (crew?.rules as any)[ruleKey] === true
    );

  const crew: ICrew | undefined = useMemo(
    () => (!!filters.search && data?.crews[0]) || undefined,
    [data]
  );

  const { mutate: joinCrew, isPending: isJoining } = useMutation({
    mutationFn: CrewsService.joinCrew,
    onSuccess: async () => {
      await client.refetchQueries({ include: ["CrewsByMember"] });

      dispatch(DialogActions.closeDialog());
    },
    onError: (error) => {
      const message = getMessageFromError(error);

      if (message) {
        dispatch(
          NotifierActions.createNotification({
            id: "join-crew-error",
            type: "error",
            message,
          })
        );
      }
    },
  });

  const handleJoinCrew = () => {
    if (crew) {
      joinCrew(crew.code);
    }
  };

  const alreadyJoined = useMemo(() => {
    return crew?.members_w_user.some((member) => member.user._id === user?._id);
  }, [crew]);

  return (
    <S.Container>
      <S.InputGroup>
        <Typography.Body _t textColor="text">
          {"joinCrew.search"}
        </Typography.Body>
        <Input
          placeholder={"..."}
          onChange={(value) => setFilters({ search: value })}
          inputProps={{
            autoComplete: "off",
            autoCorrect: false,
            autoCapitalize: "none",
            value: filters.search,
          }}
        />
      </S.InputGroup>

      <S.Content>
        {crew && (
          <S.CrewCard key={crew._id}>
            <CrewInfo crew={crew} />
            <View style={{ gap: 12 }}>
              <Typography.Body _t>{"crewSettings.members"}</Typography.Body>

              <Row gap={12} wrap="wrap">
                {crew.members_w_user.map((member) => (
                  <Avatar
                    key={member.user._id}
                    preview={member?.user?.avatar?.url}
                    disabled
                    size={48}
                    showBorder
                    borderOffset={1}
                    iconSize={24}
                  />
                ))}
              </Row>
            </View>
            <View style={{ gap: 12 }}>
              <Typography.Body _t>{"crewSettings.rules"}</Typography.Body>

              <View style={{ gap: 6 }}>
                <Row gap={6} align="center" width={"auto"}>
                  <Check
                    width={16}
                    height={16}
                    stroke={Colors.colors.borderDark}
                  />

                  <Typography.Body _t textColor="text">
                    {"crewVisibility." + crew?.visibility}
                  </Typography.Body>
                </Row>

                {getActiveRules(crew).map((rule) => (
                  <Row gap={6} align="center" width={"auto"} key={rule}>
                    <Check
                      width={16}
                      height={16}
                      stroke={Colors.colors.borderDark}
                    />

                    <Typography.Body _t textColor="text">
                      {"crewSettings.rulesType." + rule}
                    </Typography.Body>
                  </Row>
                ))}

                {crew?.streak.map((streak) => (
                  <Row gap={6} align="center" width={"auto"} key={streak}>
                    <Check
                      width={16}
                      height={16}
                      stroke={Colors.colors.borderDark}
                    />

                    <Typography.Body _t textColor="text">
                      {"crewSettings.streakType." + streak}
                    </Typography.Body>
                  </Row>
                ))}
              </View>
            </View>
          </S.CrewCard>
        )}
        {loadingCrew && <Loader color="primary" />}
      </S.Content>
      <Button
        title={
          alreadyJoined
            ? "joinCrew.alreadyJoined"
            : crew?.visibility === CrewVisibility.Public
              ? "joinCrew.join"
              : "joinCrew.request"
        }
        colorScheme="secondary"
        disabled={!crew || alreadyJoined}
        onPress={handleJoinCrew}
        loading={isJoining}
      />
    </S.Container>
  );
};

export default JoinCrew;
