import { UsersService } from "@api/services";
import { Tabs, Typography } from "@components/atoms";
import { ScreenWrapper, UserInfo } from "@components/molecules";
import { useScreenSize } from "@hooks/useScreenSize/useScreenSize";
import { QueryKeys, TabHeader } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { StoreState } from "@store/Store";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import S from "./UserFollows.styles";

const tabsHeader: TabHeader[] = [
  {
    key: 0,
    title: "userFollows.followers",
  },
  {
    key: 1,
    title: "userFollows.following",
  },
];

const UserFollows: React.FC<ScreenProps<AppRoutes.UserFollows>> = ({}) => {
  const { user } = useSelector((state: StoreState) => state.user);
  const { headerHeight } = useScreenSize();

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      return await UsersService.getFollowersInfo();
    },
    queryKey: [QueryKeys.User.FollowersInfo],
  });

  useEffect(() => {
    console.log("UserFollows: Data fetched");
  }, [data]);

  if (!user) {
    return null;
  }

  return (
    <ScreenWrapper>
      <S.Container style={{ paddingTop: headerHeight + 24 }}>
        <S.Header>
          <Typography.Heading _t>{"userFollows.title"}</Typography.Heading>
        </S.Header>

        <Tabs.Root initialPage={0} header={tabsHeader}>
          <Tabs.Item
            key={0}
            contentContainerStyle={{
              gap: 12,
            }}
          >
            {data?.data.followers.map((follower) => (
              <UserInfo
                user={follower.user}
                key={follower.user._id}
                showFollowBack={!follower.is_mutual}
                inCrews={follower.in_crews?.map((crew) => crew.name)}
              />
            ))}
          </Tabs.Item>
          <Tabs.Item key={1}>
            {data?.data.following.map((following) => (
              <UserInfo
                user={following.user}
                key={following.user._id}
                showFollowBack={!following.is_mutual}
                inCrews={following.in_crews?.map((crew) => crew.name)}
              />
            ))}
          </Tabs.Item>
        </Tabs.Root>
      </S.Container>
    </ScreenWrapper>
  );
};

export default UserFollows;
