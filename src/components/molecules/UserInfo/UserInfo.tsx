import { Avatar, Row, Typography } from "@components/atoms";
import { IUser } from "@models/collections";
import React from "react";
import Header from "../Header/Header";
import S from "./UserInfo.styles";
import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { AppRoutes } from "@navigation/appRoutes";
import { TouchableOpacity } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UsersService } from "@api/services";
import { QueryKeys } from "@models/generic";

interface UserInfoProps {
  user: IUser;
  showFollowBack?: boolean;
  inCrews?: string[];
}

const UserInfo: React.FC<UserInfoProps> = ({
  user,
  inCrews,
  showFollowBack,
}) => {
  const { navigate } = useAppNavigation();
  const queryClient = useQueryClient();

  const navigateToUserView = () => {
    navigate(AppRoutes.UserView, { userId: user._id });
  };

  const { mutate: handleFollowFn } = useMutation({
    mutationFn: async () => UsersService.follow(user._id),
    onSuccess: async () => {
      console.log("UserInfo: Followed user successfully");
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.User.FollowersInfo],
      });
    },
  });

  return (
    <S.Container
      activeOpacity={0.6}
      disabled={showFollowBack}
      onPress={navigateToUserView}
    >
      <S.AvatarAndInfo>
        <Avatar
          preview={user.avatar?.url}
          disabled
          size={48}
          iconSize={24}
          borderOffset={1}
        />

        <S.Info>
          <Typography.Body>{user.name}</Typography.Body>

          {inCrews && (
            <Row gap={6}>
              {inCrews.map((crew) => (
                <Typography.Tip textColor="primary" key={crew}>
                  {crew}
                </Typography.Tip>
              ))}
            </Row>
          )}
        </S.Info>
      </S.AvatarAndInfo>

      {showFollowBack ? (
        <TouchableOpacity activeOpacity={0.6} onPress={() => handleFollowFn()}>
          <Typography.Button textColor="primary" _t>
            {"userFollows.followBack"}
          </Typography.Button>
        </TouchableOpacity>
      ) : (
        <Header.Coins
          coinValue={user.coins.toString()}
          textColor="text"
          textVariant="button"
          size={10}
          disabled
        />
      )}
    </S.Container>
  );
};

export default UserInfo;
