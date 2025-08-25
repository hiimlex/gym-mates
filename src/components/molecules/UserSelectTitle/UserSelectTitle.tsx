import React, { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import S from "./UserSelectTitle.styles";
import { FadeIn, FadeOut, SlideInDown, SlideInUp, SlideOutDown } from "react-native-reanimated";
import {
  IGetInventoryFilters,
  IGetInventoryResponse,
  ItemCategory,
} from "@models/collections";
import { UsersService } from "@api/services";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreState } from "@store/Store";
import { Typography } from "@components/atoms";
import { useMutation } from "@tanstack/react-query";
import { NotifierActions, UserActions } from "@store/slices";
import { getMessageFromError } from "@utils/handleAxiosError";

interface UserSelectTitleProps {
  close: () => void;
}

const UserSelectTitle: React.FC<UserSelectTitleProps> = ({ close }) => {
  const { width, height } = useWindowDimensions();
  const { user } = useSelector((state: StoreState) => state.user);

  const { data, loading, error } = useQuery<
    IGetInventoryResponse,
    IGetInventoryFilters
  >(UsersService.gql.GET_INVENTORY, {
    variables: {
      journeyId: user?.journey._id,
      category: ItemCategory.Title,
    },
    fetchPolicy: "cache-and-network",
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {}, [data]);

  const isSelected = (titleId: string) => {
    return user?.title?._id === titleId;
  };

  const { mutate: selectTitle } = useMutation({
    mutationFn: (titleId: string) => {
      return UsersService.selectTitle(titleId);
    },
    onSuccess: async (data) => {
      await dispatch(UserActions.fetchCurrentUser());

      close();
    },
    onError: (error) => {
      const message = getMessageFromError(error);

      if (message) {
        dispatch(
          NotifierActions.createNotification({
            id: "error-selecting-title",
            message,
            type: "error",
          })
        );
      }
    },
  });

  if (!data || data.journeyById.inventory.length === 0) {
    return <View />;
  }

  return (
    <S.Float
      style={{ width, height }}
      entering={FadeIn}
      exiting={FadeOut}
      activeOpacity={1}
      onPress={close}
    >
      <S.VerticalList
        bounces={false}
        entering={SlideInDown.delay(50)}
        exiting={SlideOutDown}
        showsVerticalScrollIndicator={false}
        snapToInterval={24 + 12} // item height + gap
        decelerationRate="fast"
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: 24,
          gap: 6,
          flexGrow: 1,
        }}
        disableIntervalMomentum={true}
      >
        {data?.journeyById.inventory.map(({ item }, index) => (
          <S.TitleView
            key={index}
            activeOpacity={0.6}
            onPress={() => selectTitle(item._id)}
            disabled={isSelected(item._id)}
          >
            <Typography.Typography
              variant={isSelected(item._id) ? "headingSubtitle" : "body"}
              textAlign="center"
              textColor={isSelected(item._id) ? "primary" : "text"}
            >
              {item.title}
            </Typography.Typography>
          </S.TitleView>
        ))}
      </S.VerticalList>
    </S.Float>
  );
};

export default UserSelectTitle;
