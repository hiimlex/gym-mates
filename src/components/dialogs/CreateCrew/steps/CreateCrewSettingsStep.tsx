import React, { useEffect, useMemo, useRef, useState } from "react";
import S from "./CreateCrewSteps.styles";
import { FadeOut } from "react-native-reanimated";
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Row,
  Typography,
} from "@components/atoms";
import {
  CreateCrewSteps,
  CrewStreak,
  CrewVisibility,
  ICreateCrewSettingsForm,
  ICrewRules,
  IEditCrewRulesForm,
} from "@models/collections";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreState } from "@store/Store";
import { DialogActions, NotifierActions } from "@store/slices";
import { CreateCrewActions } from "@store/slices/CreateCrewSlice";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import Masks from "@utils/masks.utils";
import { KeyboardAvoidingView, TextInput } from "react-native";
import { scrollToFieldRef } from "@utils/scrollToFieldRef";
import { useMutation } from "@tanstack/react-query";
import { CrewsService } from "@api/services";
import { client } from "@api/apollo";
import { getMessageFromError } from "@utils/handleAxiosError";

interface CreateCrewSettingsStepProps {}

const CreateCrewSettingsStep: React.FC<CreateCrewSettingsStepProps> = () => {
  const { infoForm } = useSelector((state: StoreState) => state.createCrew);
  const [visibility, setVisibility] = useState<CrewVisibility>(
    CrewVisibility.Public
  );
  const [streaks, setStreaks] = useState<CrewStreak[]>([
    CrewStreak.Weekly,
    CrewStreak.Monthly,
  ]);
  const dispatch = useDispatch<AppDispatch>();
  const scrollRef = useRef<ScrollView>(null);
  const loseStreakRef = useRef<TextInput>(null);

  const rules: ICrewRules = {
    gym_focused: true,
    pay_on_past: true,
    pay_without_picture: true,
    show_members_rank: true,
    free_weekends: false,
  };

  const {
    control,
    formState,
    getValues: getRulesValues,
  } = useForm<IEditCrewRulesForm>({
    mode: "all",
    defaultValues: {
      ...rules,
      lose_streak_in_days: "2",
    },
  });

  const onStreakChange = (streak: CrewStreak) => {
    if (streaks.includes(streak)) {
      setStreaks(streaks.filter((s) => s !== streak));
    } else {
      setStreaks([...streaks, streak]);
    }
  };

  useEffect(() => {
    dispatch(
      DialogActions.updateData({
        onBackPress: () =>
          dispatch(CreateCrewActions.setStep(CreateCrewSteps.Info)),
      })
    );
  }, []);

  const canFinish = useMemo(
    () => !!visibility && streaks.length > 0 && formState.isValid,
    [visibility, streaks, formState.isValid]
  );

  const { mutate, data, isPending } = useMutation({
    mutationFn: async () => {
      if (infoForm) {
        const settingsForm: ICreateCrewSettingsForm = {
          visibility,
          rules: getRulesValues(),
          streak: streaks,
        };

        const res = await CrewsService.create(infoForm, settingsForm);

        return res;
      }
    },
    onSuccess: async () => {
      await client.refetchQueries({ include: ["CrewsByMember"] });

      dispatch(DialogActions.closeDialog());
    },
    onError: (error) => {
      const message = getMessageFromError(error);

      if (message) {
        dispatch(
          NotifierActions.createNotification({
            id: "create-crew-error",
            type: "error",
            message,
          })
        );
      }
    },
  });

  return (
    <S.Container exiting={FadeOut}>
      <KeyboardAvoidingView
        style={{ gap: 24, flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={140}
      >
        <S.FormView
          contentContainerStyle={{ gap: 24, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
        >
          <S.Group>
            <Typography.Body textColor="text" _t>
              {"crewSettings.visibility"}
            </Typography.Body>

            <S.VisibilityCard
              touchable
              isActive={visibility === CrewVisibility.Public}
              onPress={() => {
                setVisibility(CrewVisibility.Public);
              }}
            >
              <Typography.Body
                textColor={
                  visibility === CrewVisibility.Public ? "primary" : "text"
                }
                _t
              >
                {"crewVisibility.public"}
              </Typography.Body>
              <Typography.Caption _t textColor="textLight">
                {"crewSettings.publicDescription"}
              </Typography.Caption>
            </S.VisibilityCard>
            <S.VisibilityCard
              touchable
              isActive={visibility === CrewVisibility.Private}
              onPress={() => {
                setVisibility(CrewVisibility.Private);
              }}
            >
              <Typography.Body
                textColor={
                  visibility === CrewVisibility.Private ? "primary" : "text"
                }
                _t
              >
                {"crewVisibility.private"}
              </Typography.Body>
              <Typography.Caption _t textColor="textLight">
                {"crewSettings.privateDescription"}
              </Typography.Caption>
            </S.VisibilityCard>
          </S.Group>

          <S.Group>
            <Typography.Body textColor="text" _t>
              {"crewSettings.rules"}
            </Typography.Body>

            <S.RulesPanel>
              {Object.keys(rules).map((rule) => (
                <Controller
                  key={rule}
                  name={rule as keyof IEditCrewRulesForm}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      label={`crewSettings.rulesType.${rule}`}
                      _t
                      checked={Boolean(field.value)}
                      onChange={field.onChange}
                    />
                  )}
                />
              ))}
            </S.RulesPanel>
          </S.Group>

          <S.Group>
            <Typography.Body textColor="text" _t>
              {"crewSettings.streaks"}
            </Typography.Body>

            <Row gap={12}>
              {Object.values(CrewStreak).map((streak) => (
                <Badge
                  label={`crewStreaks.${streak}`}
                  _t
                  key={streak}
                  active={streaks.includes(streak)}
                  touchable
                  onPress={() => onStreakChange(streak)}
                />
              ))}
            </Row>
          </S.Group>

          <Row justify="space-between" align="center">
            <Typography.Body textColor="text" _t>
              {"crewSettings.loseStreakAt"}
            </Typography.Body>

            <Controller
              name="lose_streak_in_days"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
                  inputProps={{
                    style: { width: 100, paddingLeft: 24 },
                    autoCorrect: false,
                    keyboardType: "numeric",
                    autoComplete: "off",
                    onFocus: () => scrollToFieldRef(loseStreakRef, scrollRef),
                    value: value.toString(),
                  }}
                  inputRef={loseStreakRef}
                  onChange={(value) => {
                    const masked = Masks.number(value);

                    onChange(masked);
                  }}
                  suffix={
                    <Typography.Caption textColor="textLight" _t>
                      {"units.days"}
                    </Typography.Caption>
                  }
                />
              )}
            />
          </Row>
        </S.FormView>
      </KeyboardAvoidingView>
      <Button
        title="createCrew.finish"
        colorScheme="secondary"
        disabled={!canFinish}
        loading={isPending}
        onPress={() => mutate()}
      />
    </S.Container>
  );
};

export default CreateCrewSettingsStep;
