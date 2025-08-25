import { client } from "@api/apollo";
import { CrewsService } from "@api/services";
import { AppRoutes } from "@navigation/appRoutes";
import { DialogActions, NotifierActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import { Colors } from "@theme";
import { AxiosError } from "axios";
import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Check,
  ChevronRight,
  Edit,
  Image,
  LogOut,
  Trash,
} from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { BannerPreview, Row, Typography } from "../../atoms";
import CrewMemberInfo from "../../molecules/CrewMemberInfo/CrewMemberInfo";
import S from "./CrewSettings.styles";
import EditCrewSettings from "../EditCrewSettings/EditCrewSettings";
import {
  FadeInLeft,
  FadeOutLeft,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
import { getMessageFromError } from "@utils/handleAxiosError";

const CrewSettings: React.FC = () => {
  const { user } = useSelector((state: StoreState) => state.user);
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);
  const dispatch = useDispatch<AppDispatch>();
  const { navigate } = useAppNavigation();

  const isAdmin = useMemo(
    () =>
      crew?.members_w_user.some((m) => m.user._id === user?._id && m.is_admin),
    [crew, user]
  );

  const isOwner = useMemo(() => crew?.created_by === user?._id, [crew, user]);

  const activeRules = useMemo(
    () =>
      Object.keys(crew?.rules || {}).filter(
        (ruleKey) => (crew?.rules as any)[ruleKey] === true
      ),
    [crew?.rules]
  );

  const { mutate: leaveCrew } = useMutation({
    mutationFn: CrewsService.leave,
    onSuccess: async () => {
      await client.refetchQueries({
        include: ["CrewsByMember"],
      });
      dispatch(DialogActions.closeDialog());
      navigate(AppRoutes.Home);
    },
    onError: (error) => {
      const message = getMessageFromError(error);

      if (message) {
        dispatch(
          NotifierActions.createNotification({
            id: "leave-crew-error",
            type: "error",
            message,
          })
        );
      }
    },
  });

  const navigateToUserView = (userId: string) => {
    dispatch(DialogActions.closeDialog());
    navigate(AppRoutes.UserView, { userId });
  };

  const openEditCrewSettings = () => {
    dispatch(
      DialogActions.moveToNextDialog({
        content: <EditCrewSettings />,
        data: {
          title: "crewSettings.editCrew.title",
          _t: true,
        },
      })
    );
  };

  if (!crew) {
    return null;
  }

  return (
    <S.Container
      contentContainerStyle={{ gap: 24, flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      exiting={SlideOutLeft}
      entering={FadeInLeft}
    >
      <Row gap={12} align="center" width={"auto"}>
        <BannerPreview size={60} preview={crew?.banner?.url} />
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
          <CrewMemberInfo
            touchable
            onPress={() => {
              navigateToUserView(member.user._id);
            }}
            member={member}
            key={member._id}
          />
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

      {!isOwner && (
        <S.ButtonCard touchable onPress={() => leaveCrew(crew.code)}>
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
      )}

      {isOwner && (
        <S.ButtonCard touchable onPress={() => {}}>
          <S.ButtonCardRow>
            <Trash
              width={20}
              height={20}
              stroke={Colors.colors.danger}
              fill={Colors.colors.danger}
              fillOpacity={0.2}
            />
            <Typography.Body textColor="text" _t>
              {"crewSettings.delete"}
            </Typography.Body>
          </S.ButtonCardRow>
          <ChevronRight width={20} height={20} stroke={Colors.colors.text} />
        </S.ButtonCard>
      )}
    </S.Container>
  );
};

export default CrewSettings;
