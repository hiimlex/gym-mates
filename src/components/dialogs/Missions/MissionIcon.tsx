import { CachedImage } from "@georstat/react-native-image-cache";
import { OverlayType } from "@models/generic";
import { OverlayActions } from "@store/slices";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
// import Mission from "../../../assets/mission_icon.svg";
import S from "./Missions.styles";

interface MissionsIconProps {
  children?: React.ReactNode;
}

const MissionIcon: React.FC<MissionsIconProps> = ({ children }) => {
  const dispatch = useDispatch();

  const openMissionsDialog = () => {
    dispatch(
      OverlayActions.show({
        type: OverlayType.Missions,
      })
    );
  };

  return (
    <S.MissionButton
      activeOpacity={0.6}
      onPress={openMissionsDialog}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../../assets/mission_icon_paper.png")}
        style={{ width: 32, height: 32 }}
      />
      {/* <Mission width={48} height={48} /> */}
    </S.MissionButton>
  );
};

export default MissionIcon;
