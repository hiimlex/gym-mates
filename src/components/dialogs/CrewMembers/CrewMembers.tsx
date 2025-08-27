import { CrewsService } from "@api/services";
import { useQuery } from "@apollo/client";
import { Avatar, Typography } from "@components/atoms";
import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { ICrew } from "@models/collections";
import { AppDispatch, StoreState } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CrewMemberInfo from "../../molecules/CrewMemberInfo/CrewMemberInfo";
import S from "./CrewMembers.styles";
import { DialogActions } from "@store/slices";
import { AppRoutes } from "@navigation/appRoutes";

const CrewMembers: React.FC = () => {
  const { user } = useSelector((state: StoreState) => state.user);
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);

  const dispatch = useDispatch<AppDispatch>();
  const { navigate } = useAppNavigation();

  const isAdmin = useMemo(
    () =>
      crew?.members_w_user.some((m) => m.user._id === user?._id && m.is_admin),
    [crew, user]
  );

  const { data, refetch } = useQuery<ICrew>(CrewsService.gql.GET_CREW_BY_ID, {
    variables: { _id: crew?._id },
    fetchPolicy: "cache-and-network",
  });

  const showActionsMenu = () => {
    console.log("showActionsMenu on long press");
  };

  const navigateToUserView = (userId: string) => {
    dispatch(DialogActions.closeDialog());
    navigate(AppRoutes.UserView, { userId });
  };

  const { mutate } = useMutation({
    mutationFn: async () => {},
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <S.Container contentContainerStyle={{ gap: 12 }}>
      {crew?.members_w_user.map((member) => (
        <CrewMemberInfo
          touchable
          member={member}
          key={member._id}
          onLongPress={showActionsMenu}
        />
      ))}

      {isAdmin && (
        <>
          <Typography.HeadingSubtitle textColor="text" _t>
            {"crewMembers.requests"}
          </Typography.HeadingSubtitle>

          {crew?.white_list &&
            crew?.white_list.map((requestUser) => (
              <S.RequestItem>
                <S.RequestInfo>
                  <Avatar
                    preview={requestUser.avatar?.url}
                    size={48}
                    borderOffset={1}
                    iconSize={24}
                  />
                  <Typography.Body
                    _t
                    _params={{ name: requestUser.name }}
                    textColor="text"
                  >
                    {"crewMembers.wantsToJoin"}
                  </Typography.Body>
                </S.RequestInfo>

                <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
                  <Typography.Button textColor="primary" _t>
                    {"crewMembers.accept"}
                  </Typography.Button>
                </TouchableOpacity>
              </S.RequestItem>
            ))}

          {!crew?.white_list || crew?.white_list.length === 0 ? (
            <Typography.Body textColor="textLight" _t>
              {"crewMembers.noRequests"}
            </Typography.Body>
          ) : null}
        </>
      )}
    </S.Container>
  );
};

export default CrewMembers;
