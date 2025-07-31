import { AppDispatch, StoreState } from "@store/store";
import { Colors } from "@theme";
import React, { useMemo } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Settings, Star } from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import S from "./styles";
import { useDialogService } from "@hooks";

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

  return (
    <S.Container style={[style]}>
      <TouchableOpacity activeOpacity={0.6}>
        <Star
          width={20}
          height={20}
          stroke={
            isFavorite ? Colors.colors.secondary : Colors.colors.textLight
          }
          fill={isFavorite ? Colors.colors.secondary : "transparent"}
          fillOpacity={0.2}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={openCrewSettings}>
        <Settings
          width={20}
          height={20}
          stroke={Colors.colors.text}
          fill={Colors.colors.text}
          fillOpacity={0.2}
        />
      </TouchableOpacity>
    </S.Container>
  );
};

export default CrewViewActions;
