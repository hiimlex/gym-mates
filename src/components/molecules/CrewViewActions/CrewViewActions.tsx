import { CrewsService } from "@api/services";
import { useDialogService } from "@hooks/useDialogService/useDialogService";
import { NotifierActions, UserActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import { Colors } from "@theme";
import { getMessageFromError } from "@utils/handleAxiosError";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { Settings, Star } from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import S from "./CrewView.styles";

interface CrewViewActionsProps {}

const CrewViewActions: React.FC<CrewViewActionsProps> = () => {
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);
  const { user } = useSelector((state: StoreState) => state.user);
  const { openCrewSettings } = useDialogService();

  const isFavorite = useMemo(
    () =>
      user?.favorites?.some((fav) => fav.toString() === crew?._id.toString()),
    [user?.favorites],
  );

  const dispatch = useDispatch<AppDispatch>();

  const { mutate: favoriteCrew } = useMutation({
    mutationFn: CrewsService.favorite,
    onSuccess: async () => {
      await dispatch(UserActions.fetchCurrentUser());
    },
    onError: (error) => {
      const message = getMessageFromError(error);

      if (message) {
        dispatch(
          NotifierActions.createNotification({
            id: "favorite-crew-error",
            type: "error",
            message,
          }),
        );
      }
    },
  });

  const handleFavoriteCrew = () => {
    if (crew?._id) {
      favoriteCrew(crew._id);
    }
  };

  if (!crew) {
    return null;
  }

  return (
    <S.Container>
      <TouchableOpacity activeOpacity={0.6} onPress={handleFavoriteCrew}>
        <Star
          width={24}
          height={24}
          stroke={
            isFavorite ? Colors.colors.secondary : Colors.colors.textLight
          }
          fill={isFavorite ? Colors.colors.secondary : "transparent"}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={openCrewSettings}>
        <Settings
          width={24}
          height={24}
          stroke={Colors.colors.text}
          fill={Colors.colors.text}
          fillOpacity={0.2}
        />
      </TouchableOpacity>
    </S.Container>
  );
};

export default CrewViewActions;
