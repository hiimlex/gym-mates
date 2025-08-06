import { AppDispatch, StoreState } from "@store/Store";
import { Colors } from "@theme";
import React, { useMemo } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Settings, Star } from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import S from "./CrewView.styles";
import { useDialogService } from "@hooks/useDialogService/useDialogService";
import { useMutation } from "@tanstack/react-query";
import { CrewsService } from "@api/services";
import { UserActions } from "@store/slices";
import { AxiosError } from "axios";

interface CrewViewActionsProps {
  style?: ViewStyle;
}

const CrewViewActions: React.FC<CrewViewActionsProps> = ({ style }) => {
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);
  const { user } = useSelector((state: StoreState) => state.user);
  const { openCrewSettings } = useDialogService();

  const isFavorite = useMemo(
    () =>
      user?.favorites?.some((fav) => fav.toString() === crew?._id.toString()),
    [user?.favorites]
  );

  const dispatch = useDispatch<AppDispatch>();

  const { mutate: favoriteCrew } = useMutation({
    mutationFn: CrewsService.favorite,
    onSuccess: async () => {
      await dispatch(UserActions.fetchCurrentUser());
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error("Error favoriting crew:", error.response?.data.message);
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
    <S.Container style={[style]}>
      <TouchableOpacity activeOpacity={0.6} onPress={handleFavoriteCrew}>
        <Star
          width={24}
          height={24}
          stroke={
            isFavorite ? Colors.colors.secondary : Colors.colors.textLight
          }
          fill={isFavorite ? Colors.colors.secondary : "transparent"}
          fillOpacity={0.2}
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
