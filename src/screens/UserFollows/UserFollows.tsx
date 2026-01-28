import { UsersService } from "@api/services";
import { Loader, Row, Tabs, Typography } from "@components/atoms";
import { ScreenWrapper, UserInfo } from "@components/molecules";
import { ITabHeader, QueryKeys } from "@models/generic";
import { AppRoutes, ScreenProps } from "@navigation/appRoutes";
import { StoreState } from "@store/Store";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import PagerView from "react-native-pager-view";
import { useSelector } from "react-redux";

const tabsHeader: ITabHeader[] = [
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
  const pagerRef = useRef<PagerView>(null);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      return await UsersService.getFollowersInfo();
    },
    queryKey: [QueryKeys.User.FollowersInfo],
  });

  if (!user) {
    return null;
  }

  return (
    <ScreenWrapper useHeaderHeight>
      <Tabs.Root initialPage={0} header={tabsHeader} pagerRef={pagerRef}>
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

          {data?.data.followers.length === 0 && (
            <Row justify="center" style={{ paddingTop: 24 }}>
              <Typography.Body textColor="textLight" _t>
                {"userFollows.noFollowers"}
              </Typography.Body>
            </Row>
          )}

          {isLoading && <Loader color="primary" />}
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

          {data?.data.following.length === 0 && (
            <Row justify="center" style={{ paddingTop: 24 }}>
              <Typography.Body textColor="textLight" _t>
                {"userFollows.noFollowing"}
              </Typography.Body>
            </Row>
          )}

          {isLoading && <Loader color="primary" />}
        </Tabs.Item>
      </Tabs.Root>
    </ScreenWrapper>
  );
};

export default UserFollows;
