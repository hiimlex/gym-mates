import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  ImageBackground,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import S from "./Missions.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurProps } from "@models/generic";
import {
  FadeIn,
  FadeOut,
  Easing,
  FadeInDown,
  FadeOutDown,
} from "react-native-reanimated";
import { AchievementIcon, Coin, Row, Typography } from "@components/atoms";
import { X } from "react-native-feather";
import { useDispatch } from "react-redux";
import { OverlayActions } from "@store/slices";
import { Colors } from "@theme";
import { Header } from "@components/molecules";

const missionBg = require("../../../assets/missions_bg_sm.png");
const missionBox = require("../../../assets/mission_box.png");

interface MissionsProps {}

const Missions: React.FC<MissionsProps> = ({}) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [bgAspectRatio, setBgAspectRatio] = useState(1);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const availableHeight = useMemo(
    // device height - insets - paddings
    () => height - (insets.top + insets.bottom + 82),
    [height, insets]
  );

  useEffect(() => {
    const imageSrc = Image.resolveAssetSource(missionBg);
    Image.getSize(imageSrc.uri, (width, height) => {
      const aspectRatio = width / height;
      setBgAspectRatio(aspectRatio);
      setImageWidth(width);
      setImageHeight(height);

      setLoading(false);
    });
  }, []);

  const getImageWidthFromAspectRatio = (
    aspectRatio: number,
    height: number
  ) => {
    return +(aspectRatio * height).toFixed(0);
  };

  const close = () => {
    dispatch(OverlayActions.hide());
  };

  if (loading) {
    return null;
  }

  return (
    <S.FloatingBlur
      style={{
        width,
        height,
        paddingTop: insets.top + 24,
      }}
      {...BlurProps}
      entering={FadeInDown.duration(100)}
    >
      <ImageBackground
        source={missionBg}
        style={{
          width: getImageWidthFromAspectRatio(bgAspectRatio, availableHeight),
          height: availableHeight,
          alignSelf: "center",
        }}
      >
        {/* Paper content */}
        <View
          style={{
            flex: 1,
            marginTop: 60,
            marginBottom: 86,
            marginLeft: 50,
            marginRight: 60,
          }}
        >
          {/* Header close */}
          <Row
            style={{
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ padding: 3 }}
              onPress={close}
            >
              <X width={28} height={28} stroke={Colors.colors.textDark} />
            </TouchableOpacity>
          </Row>
          {/* Mission list */}
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={{
              marginTop: 32,
              marginBottom: 12,
            }}
            contentContainerStyle={{ gap: 24 }}
          >
            <S.MissionItem>
              <S.AchievementIconWrapper source={missionBox}>
                <AchievementIcon rarity="common" size={72} />
              </S.AchievementIconWrapper>
              <S.MissionInfo>
                <Row align="center" justify="space-between">
                  <Typography.Body textColor="textDark" fontWeight="semibold">
                    {"First workout"}
                  </Typography.Body>
                  <Coin textVariant="body" label="+5" />
                </Row>

                <Typography.Caption
                  textColor="text"
                  style={{
                    flexShrink: 1,
                    maxWidth: width * 0.5,
                    lineHeight: 14,
                  }}
                >
                  {"Complete your first workout."}
                </Typography.Caption>
              </S.MissionInfo>
            </S.MissionItem>
          </ScrollView>
        </View>
      </ImageBackground>
    </S.FloatingBlur>
  );
};

export default Missions;
