import { UsersService } from "@api/services";
import { useQuery } from "@apollo/client";
import { useNavigationContainerRef } from "@hooks/useNavigationContainer/useNavigationContainer";
import { IUserByIdResponse } from "@models/collections";
import { QueryKeys } from "@models/generic";
import { UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Colors } from "@theme";
import React, { useEffect, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { UserCheck, UserPlus } from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";

const UserViewActions: React.FC = () => {
  const { user: currentUser } = useSelector((state: StoreState) => state.user);
  const { currentRoute } = useNavigationContainerRef();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  const userId = useMemo(
    () => (currentRoute?.params as any).userId,
    [currentRoute?.params]
  );
  const { data, error, refetch } = useQuery<IUserByIdResponse, { _id: string }>(
    UsersService.gql.USER_BY_ID,
    {
      variables: { _id: userId },
      fetchPolicy: "network-only",
    }
  );

  const user = useMemo(() => data?.userById, [data]);

  const isFollowing = useMemo(() => {
    return user?.followers?.some((f) => f._id === currentUser?._id);
  }, [user]);

  const {
    mutate: handleFollowFn,
    data: followData,
    reset: resetFollow,
  } = useMutation({
    mutationFn: async () => UsersService.follow(userId),
  });

  const {
    mutate: handleUnfollowFn,
    data: unfollowData,
    reset: resetUnfollow,
  } = useMutation({
    mutationFn: async () => UsersService.unfollow(userId),
  });

  useEffect(() => {
    if (followData || unfollowData) {
      refetch();
      dispatch(UserActions.fetchCurrentUser());
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.User.FollowersInfo],
      });
      resetFollow();
      resetUnfollow();
    }
  }, [followData, unfollowData]);

  return isFollowing ? (
    <TouchableOpacity activeOpacity={0.6} onPress={() => handleUnfollowFn()}>
      <UserCheck
        width={24}
        height={24}
        fill={Colors.colors.primary}
        stroke={Colors.colors.primary}
        fillOpacity={0.2}
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => handleFollowFn()} activeOpacity={0.6}>
      <UserPlus
        width={24}
        height={24}
        fill={Colors.colors.text}
        stroke={Colors.colors.text}
        fillOpacity={0.2}
      />
    </TouchableOpacity>
  );
};

export default UserViewActions;
