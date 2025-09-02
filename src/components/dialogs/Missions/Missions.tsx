import React from "react";
import {
  View,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import S from "./Missions.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurProps } from "@models/generic";
import { FadeIn, FadeOut, Easing } from "react-native-reanimated";
import { Row } from "@components/atoms";

const missionBg = require("./missions_bg.png");

interface MissionsProps {}

const Missions: React.FC<MissionsProps> = ({}) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return (
    <S.FloatingBlur
      style={{
        width,
        height,
        paddingTop: insets.top + 24,
        paddingBottom: insets.bottom + 48,
      }}
      {...BlurProps}
      entering={FadeIn.duration(100)}
      exiting={FadeOut.easing(Easing.inOut(Easing.ease))}
    >
      <ImageBackground
        source={missionBg}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            paddingTop: 60,
            paddingHorizontal: 48,
          }}
        >
          <Row
            style={{
              width: "100%",
              height: 24,
              zIndex: 2,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ width: 48, height: 48 }}
            ></TouchableOpacity>
          </Row>
        </View>
      </ImageBackground>
    </S.FloatingBlur>
  );
};

export default Missions;
