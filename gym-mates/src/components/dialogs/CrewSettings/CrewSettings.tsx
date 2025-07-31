import { AppDispatch, StoreState } from "@store/store";
import { Colors } from "@theme";
import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Check, ChevronRight, Edit, Image, LogOut } from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { Row, Typography } from "../../atoms";
import CrewMemberInfo from "../../molecules/CrewMemberInfo/CrewMemberInfo";
import S from "./styles";
import { useDialogService } from "@hooks";
import { DialogActions } from "@store/slices";
import EditCrewSettings from "../EditCrewSettings/EditCrewSettings";

const CrewSettings: React.FC = () => {
  const { user } = useSelector((state: StoreState) => state.user);
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);
  const dispatch = useDispatch<AppDispatch>();

  const isAdmin = useMemo(
    () =>
      crew?.members_w_user.some((m) => m.user._id === user?._id && m.is_admin),
    [crew, user]
  );

  const activeRules = useMemo(
    () =>
      Object.keys(crew?.rules || {}).filter(
        (ruleKey) => (crew?.rules as any)[ruleKey] === true
      ),
    [crew?.rules]
  );

  const openEditCrewSettings = () => {
    dispatch(
      DialogActions.openDialog({
        content: <EditCrewSettings />,
        data: {
          title: "links.editCrew",
          _t: true,
        },
      })
    );
  };

  return (
    <S.Container
      contentContainerStyle={{ gap: 24, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Row gap={12} align="center" width={"auto"}>
        {crew?.banner?.url ? (
          <S.Banner source={crew?.banner?.url || ""} onError={() => {}} />
        ) : (
          <S.EmptyPreview>
            <Image
              width={28}
              height={28}
              strokeWidth={1.5}
              stroke={Colors.colors.text}
              fill={Colors.colors.text}
              fillOpacity={0.2}
            />
          </S.EmptyPreview>
        )}
        <View style={{ gap: 6 }}>
          <Typography.Heading textColor="textDark">
            {crew?.name}
          </Typography.Heading>
          <Typography.Body textColor="textLight">{crew?.code}</Typography.Body>
        </View>
      </Row>

      <S.Group>
        <Row justify="space-between" align="center">
          <Typography.Body _t textColor="text">
            {"crewSettings.members"}
          </Typography.Body>

          {isAdmin && (
            <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
              <Typography.Button textColor="primary" _t>
                {"crewSettings.member.all"}
              </Typography.Button>
            </TouchableOpacity>
          )}
        </Row>

        {crew?.members_w_user.map((member) => (
          <CrewMemberInfo member={member} key={member._id} />
        ))}
      </S.Group>

      <S.Group>
        <Typography.Body textColor="text" _t>
          {"crewSettings.rules"}
        </Typography.Body>

        <S.RulesPanel>
          <S.Rule>
            <Check width={16} height={16} stroke={Colors.colors.borderDark} />

            <Typography.Body _t textColor="text">
              {"crewVisibility." + crew?.visibility}
            </Typography.Body>
          </S.Rule>

          {activeRules.map((rule) => (
            <S.Rule key={rule}>
              <Check width={16} height={16} stroke={Colors.colors.borderDark} />

              <Typography.Body _t textColor="text">
                {"crewSettings.rulesType." + rule}
              </Typography.Body>
            </S.Rule>
          ))}

          {crew?.streak.map((streak) => (
            <S.Rule key={streak}>
              <Check width={16} height={16} stroke={Colors.colors.borderDark} />

              <Typography.Body _t textColor="text">
                {"crewSettings.streakType." + streak}
              </Typography.Body>
            </S.Rule>
          ))}
        </S.RulesPanel>
      </S.Group>

      <S.HR />

      {isAdmin && (
        <S.ButtonCard touchable onPress={openEditCrewSettings}>
          <Row gap={12} align="center" width={"auto"}>
            <Edit
              width={20}
              height={20}
              color={Colors.colors.primary}
              stroke={Colors.colors.primary}
              fillOpacity={0.2}
            />
            <Typography.Body textColor="text" _t>
              {"crewSettings.edit"}
            </Typography.Body>
          </Row>

          <ChevronRight width={20} height={20} stroke={Colors.colors.text} />
        </S.ButtonCard>
      )}

      <S.ButtonCard touchable onPress={() => {}}>
        <S.ButtonCardRow>
          <LogOut
            width={20}
            height={20}
            stroke={Colors.colors.danger}
            fill={Colors.colors.danger}
            fillOpacity={0.2}
          />

          <Typography.Body textColor="text" _t>
            {"crewSettings.quit"}
          </Typography.Body>
        </S.ButtonCardRow>
        <ChevronRight width={20} height={20} stroke={Colors.colors.text} />
      </S.ButtonCard>
    </S.Container>
  );
};

export default CrewSettings;
