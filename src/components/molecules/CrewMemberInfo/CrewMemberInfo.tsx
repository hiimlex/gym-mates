import { ICrewMember } from "@models/collections";
import { StoreState } from "@store/Store";
import { Colors } from "@theme";
import { format } from "date-fns";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Circle } from "react-native-feather";
import { useSelector } from "react-redux";
import { Avatar, Coin, Row, Typography } from "../../atoms";
import S from "./CrewMemberInfo.styles";

interface CrewMemberInfoProps {
  member: ICrewMember;
  touchable?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  isOwner?: boolean;
  isAdmin?: boolean;
}

const CrewMemberInfo: React.FC<CrewMemberInfoProps> = ({
  member,
  touchable,
  onPress,
  onLongPress,
  isOwner,
  isAdmin,
}) => {
  const { user } = useSelector((state: StoreState) => state.user);

  const Dot = (
    <Circle
      width={5}
      height={5}
      stroke={Colors.colors.textLight}
      fill={Colors.colors.textLight}
    />
  );

  const itSelf = user?._id === member.user._id;

  return (
    <TouchableOpacity
      disabled={!touchable || itSelf}
      onPress={onPress}
      activeOpacity={0.6}
      onLongPress={onLongPress}
    >
      <S.Container>
        <S.Content>
          <Avatar
            size={48}
            iconSize={24}
            disabled
            preview={member.user.avatar?.url}
            borderOffset={1}
            showBorder
          />
          <S.Info>
            <Typography.Body _t>
              {itSelf ? "crewSettings.member.you" : member.user.name}
            </Typography.Body>
            <Row gap={6} align="center" wrap="wrap">
              {isAdmin && (
                <>
                  <Typography.Caption _t textColor="textLight">
                    {"crewSettings.admin"}
                  </Typography.Caption>
                  {Dot}
                </>
              )}
              {isOwner && (
                <>
                  <Typography.Caption _t textColor="textLight">
                    {"crewSettings.owner"}
                  </Typography.Caption>
                  {Dot}
                </>
              )}
              <Typography.Caption
                textColor="textLight"
                _t
                _params={{
                  date: format(new Date(member.joined_at), "dd/MM/yyyy"),
                }}
              >
                {"crewSettings.member.joined_at"}
              </Typography.Caption>
            </Row>
          </S.Info>
        </S.Content>

        <Coin
          label={"+" + member.user.coins.toString()}
          textColor="textLight"
          textVariant="body"
        />
      </S.Container>
    </TouchableOpacity>
  );
};

export default CrewMemberInfo;
