import { CrewsService } from "@api/services";
import { useQuery } from "@apollo/client";
import {
  Dropdown,
  DropdownAnchor,
  DropdownItem,
} from "@components/atoms/Dropdown/Dropdown";
import { useAppNavigation } from "@hooks/useAppNavigation/useAppNavigation";
import { useNotifier } from "@hooks/useNotifier";
import { ICrewMember, ICrewsResponse } from "@models/collections";
import { AppRoutes } from "@navigation/appRoutes";
import { CrewsActions, DialogActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { Colors } from "@theme";
import { getMessageFromError } from "@utils/handleAxiosError";
import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Check,
  ChevronRight,
  Edit,
  LogOut,
  Trash,
  X,
} from "react-native-feather";
import { FadeInLeft, SlideOutLeft } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { BannerPreview, Row, Typography } from "../../atoms";
import CrewMemberInfo from "../../molecules/CrewMemberInfo/CrewMemberInfo";
import CrewMembers from "../CrewMembers/CrewMembers";
import EditCrewSettings from "../EditCrewSettings/EditCrewSettings";
import LeaveCrew from "../LeaveCrew/LeaveCrew";
import S from "./CrewSettings.styles";

const CrewSettings: React.FC = () => {
  const { user } = useSelector((state: StoreState) => state.user);
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);
  const dispatch = useDispatch<AppDispatch>();
  const { notify } = useNotifier();
  const { navigate } = useAppNavigation();

  const { refetch: refetchCrew } = useQuery<ICrewsResponse>(
    CrewsService.gql.GET_CREW_BY_ID,
    {
      variables: { _id: crew?._id },
      skip: !crew?._id,
      fetchPolicy: "network-only",
    },
  );

  const isAdmin = useMemo(
    () =>
      crew?.members_w_user.some((m) => m.user._id === user?._id && m.is_admin),
    [crew, user],
  );

  const isOwner = useMemo(() => crew?.created_by === user?._id, [crew, user]);

  const rulesAsArray = useMemo(
    () =>
      Object.entries(crew?.rules || {})
        .map((entry) => entry)
        .filter(([key]) => key !== "__typename" && key !== "show_members_rank"),
    [crew?.rules],
  );

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
      }),
    );
  };

  const openCrewMembers = () => {
    dispatch(
      DialogActions.moveToNextDialog({
        content: <CrewMembers />,
        data: {
          title: "crewMembers.title",
          _t: true,
        },
      }),
    );
  };

  const handleLeaveCrew = () => {
    dispatch(
      DialogActions.moveToNextDialog({
        content: <LeaveCrew crewCode={crew?.code || ""} />,
        data: {
          title: "leaveCrew.title",
          _t: true,
        },
      }),
    );
  };

  const canManageMember = (member: ICrewMember) => {
    if (!crew || !user) {
      return false;
    }

    const isCurrentUser = member.user._id === user._id;
    const isCrewOwner = member.user._id === crew.created_by;

    return (isOwner || isAdmin) && !isCurrentUser && !isCrewOwner;
  };

  const refreshCrewView = async () => {
    const result = await refetchCrew();
    const nextCrew = result.data?.crews?.[0];

    if (nextCrew) {
      dispatch(CrewsActions.setCrewView(nextCrew));
    }
  };

  const handleMakeAdmin = async (member: ICrewMember) => {
    if (!crew?._id) {
      return;
    }

    try {
      await CrewsService.updateAdmins({
        crew_id: crew._id,
        user_id: member.user._id,
        set_admin: true,
      });

      await refreshCrewView();

      notify({
        id: `crew-settings-make-admin-${member._id}-${Date.now()}`,
        message: "crewSettings.member.actions.makeAdminSuccess",
        type: "success",
      });
    } catch (error) {
      const message = getMessageFromError(error);

      notify({
        id: `crew-settings-make-admin-error-${member._id}-${Date.now()}`,
        message,
        type: "error",
        _t: message.startsWith("errors."),
      });
    }
  };

  const handleKickMember = async (member: ICrewMember) => {
    if (!crew?._id) {
      return;
    }

    try {
      await CrewsService.kickMember({
        crew_id: crew._id,
        user_id: member.user._id,
      });

      await refreshCrewView();

      notify({
        id: `crew-settings-kick-member-${member._id}-${Date.now()}`,
        message: "crewSettings.member.actions.kickSuccess",
        type: "success",
      });
    } catch (error) {
      const message = getMessageFromError(error);

      notify({
        id: `crew-settings-kick-member-error-${member._id}-${Date.now()}`,
        message,
        type: "error",
        _t: message.startsWith("errors."),
      });
    }
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
        <BannerPreview size={60} iconSize={24} preview={crew?.banner?.url} />
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
            <TouchableOpacity activeOpacity={0.6} onPress={openCrewMembers}>
              <Typography.Button textColor="primary" _t>
                {"crewSettings.member.all"}
              </Typography.Button>
            </TouchableOpacity>
          )}
        </Row>

        {crew?.members_w_user.map((member) => (
          <Dropdown key={member._id}>
            <DropdownAnchor>
              {({ open }) => (
                <CrewMemberInfo
                  touchable
                  onPress={() => {
                    navigateToUserView(member.user._id);
                  }}
                  onLongPress={canManageMember(member) ? open : undefined}
                  member={member}
                  isAdmin={member.is_admin}
                  isOwner={member.user._id === crew.created_by}
                />
              )}
            </DropdownAnchor>

            {canManageMember(member) && isOwner && !member.is_admin && (
              <DropdownItem
                _t
                label="crewSettings.member.actions.makeAdmin"
                onPress={() => handleMakeAdmin(member)}
              />
            )}

            {canManageMember(member) && (
              <DropdownItem
                _t
                danger
                label="crewSettings.member.actions.kick"
                onPress={() => handleKickMember(member)}
              />
            )}
          </Dropdown>
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

          {rulesAsArray.map(([rule, value], index) => (
            <S.Rule key={index}>
              {!value && (
                <X width={16} height={16} stroke={Colors.colors.danger} />
              )}
              {value && (
                <Check
                  width={16}
                  height={16}
                  stroke={Colors.colors.borderDark}
                />
              )}

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
        <S.ButtonCard touchable onPress={() => handleLeaveCrew()}>
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
