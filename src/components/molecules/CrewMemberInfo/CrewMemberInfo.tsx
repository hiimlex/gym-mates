import { Avatar, Row, Typography } from "../../atoms";
import { ICrewMember } from "@models/collections";
import { Colors, setAlphaToColor } from "@theme";
import { format } from "date-fns";
import React from "react";
import { Circle, DollarSign } from "react-native-feather";
import S from "./CrewMemberInfo.styles";
import { useSelector } from "react-redux";
import { StoreState } from "@store/Store";
import { TouchableHighlight, TouchableOpacity } from "react-native";

interface CrewMemberInfoProps {
  member: ICrewMember;
  touchable?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  isOwner?: boolean;
}

const CrewMemberInfo: React.FC<CrewMemberInfoProps> = ({
  member,
  touchable,
  onPress,
  onLongPress,
  isOwner,
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
            <Row gap={6} align="center" width={"auto"}>
              {member.is_admin && !isOwner && (
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

        <Row gap={6} align="center" width={"auto"}>
          <Typography.Button textColor="textLight">
            {member.user.coins}
          </Typography.Button>
          <S.CoinWrapper>
            <DollarSign
              width={10}
              height={10}
              strokeWidth={2}
              stroke={Colors.colors.secondary}
              fill={Colors.colors.secondary}
              fillOpacity={0.2}
            />
          </S.CoinWrapper>
        </Row>
      </S.Container>
    </TouchableOpacity>
  );
};

export default CrewMemberInfo;
