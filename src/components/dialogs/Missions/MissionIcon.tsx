import { CachedImage } from "@georstat/react-native-image-cache";
import { OverlayType } from "@models/generic";
import { OverlayActions } from "@store/slices";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import Mission from './mission_icon.svg';

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
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={openMissionsDialog}
      style={{
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CachedImage
        source={require("./mission_icon.png")}
        style={{ width: 60, height: 60 }}
        imageStyle={{ width: 60, height: 60 }}
      />
      {/* <Mission width={48} height={48} /> */}

    </TouchableOpacity>
  );
};

export default MissionIcon;
