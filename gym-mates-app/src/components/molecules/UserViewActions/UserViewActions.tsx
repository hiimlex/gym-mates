import { UsersService } from "@api/services";
import { useQuery } from "@apollo/client";
import { useNavigationContainerRef } from "@hooks/useNavigationContainer/useNavigationContainer";
import { IUserByIdResponse } from "@models/collections";
import { UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import { Colors } from "@theme";
import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { UserCheck, UserPlus } from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";

const UserViewActions: React.FC = () => {
  const { user: currentUser } = useSelector((state: StoreState) => state.user);
  const { currentRoute } = useNavigationContainerRef();
  const dispatch = useDispatch<AppDispatch>();

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

  const { mutate: handleFollowFn, data: followData } = useMutation({
    mutationFn: async () => UsersService.follow(userId),
    onSuccess: async () => {
      console.log("User view actions: Followed user successfully");

      await refetch();
      await dispatch(UserActions.fetchCurrentUser());
    },
  });

  const { mutate: handleUnfollowFn, data: unfollowData } = useMutation({
    mutationFn: async () => UsersService.unfollow(userId),
    onSuccess: async () => {
      console.log("User view actions: Unfollowed user successfully");
      await refetch();
      await dispatch(UserActions.fetchCurrentUser());
    },
  });

  return (
    <View>
      {isFollowing ? (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handleUnfollowFn()}
        >
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
      )}
    </View>
  );
};

export default UserViewActions;
