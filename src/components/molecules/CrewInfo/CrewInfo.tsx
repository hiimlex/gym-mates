import { BannerPreview, Row, Typography } from "@components/atoms";
import { ICrew } from "@models/collections";
import { StoreState } from "@store/Store";
import { Colors, TColors } from "@theme";
import React from "react";
import { View } from "react-native";
import { Code, User } from "react-native-feather";
import { useSelector } from "react-redux";
import S from "./CrewInfo.styles";

interface CrewInfoProps {
  crew: ICrew;
  bannerSize?: number;
  largeTitle?: boolean;
  titleColor?: TColors;
}

const CrewInfo: React.FC<CrewInfoProps> = ({
  crew,
  bannerSize = 48,
  largeTitle = false,
  titleColor = "text",
}) => {
  const { user } = useSelector((state: StoreState) => state.user);

  const isMember = crew.members_w_user.some(
    (member) => member.user._id === user?._id
  );

  return (
    <S.Container>
      <Row gap={12} align="center" width={"auto"}>
        <BannerPreview preview={crew?.banner?.url} size={bannerSize} />

        <View style={{ gap: 6 }}>
          {largeTitle && (
            <Typography.Heading fontWeight="medium" textColor={titleColor} _t>
              {crew.name}
            </Typography.Heading>
          )}
          {!largeTitle && (
            <Typography.Body fontWeight="medium" textColor={titleColor} _t>
              {crew.name}
            </Typography.Body>
          )}

          <Row gap={12}>
            <Row gap={3} align="center" width={"auto"}>
              <Code width={16} height={16} stroke={Colors.colors.textLight} />
              <Typography.Caption textColor="textLight">
                {crew.code}
              </Typography.Caption>
            </Row>
            <Row gap={3}>
              <User
                width={16}
                height={16}
                stroke={Colors.colors.textLight}
                fill={Colors.colors.textLight}
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Typography.Caption textColor="textLight">
                {crew.members_w_user.length}
              </Typography.Caption>
            </Row>
          </Row>
        </View>
      </Row>
    </S.Container>
  );
};

export default CrewInfo;
