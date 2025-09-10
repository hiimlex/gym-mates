import { MissionsService } from "@api/services";
import {
  AchievementIcon,
  Coin,
  Loader,
  Row,
  Typography,
} from "@components/atoms";
import { BlurProps, QueryKeys } from "@models/generic";
import { OverlayActions } from "@store/slices";
import { useQuery } from "@tanstack/react-query";
import { Colors } from "@theme";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { X } from "react-native-feather";
import { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import S from "./Missions.styles";

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

  const getImageWidthFromAspectRatio = (
    aspectRatio: number,
    height: number
  ) => {
    return +(aspectRatio * height).toFixed(0);
  };

  const close = () => {
    dispatch(OverlayActions.hide());
  };

  const { data, isLoading } = useQuery({
    queryFn: MissionsService.list,
    queryKey: [QueryKeys.Missions.List],
  });

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

  if (loading || isLoading) {
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
          >
            {data &&
              data.data &&
              data.data.missions.map((mission) => (
                <S.MissionItem key={mission._id}>
                  <S.AchievementIconWrapper source={missionBox}>
                    {mission.achievement.rarity && (
                      <AchievementIcon
                        rarity={mission.achievement.rarity}
                        size={72}
                      />
                    )}
                  </S.AchievementIconWrapper>
                  <S.MissionInfo>
                    <Row align="center" justify="space-between">
                      <Typography.Body
                        textColor="textDark"
                        fontWeight="semibold"
                      >
                        {mission.name}
                      </Typography.Body>
                      <Coin textVariant="body" label={`+${mission.reward}`} />
                    </Row>

                    <Typography.Caption
                      textColor="text"
                      style={{
                        flexShrink: 1,
                        maxWidth: width * 0.5,
                        lineHeight: 14,
                      }}
                    >
                      {mission.description}
                    </Typography.Caption>
                  </S.MissionInfo>
                </S.MissionItem>
              ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </S.FloatingBlur>
  );
};

export default Missions;
