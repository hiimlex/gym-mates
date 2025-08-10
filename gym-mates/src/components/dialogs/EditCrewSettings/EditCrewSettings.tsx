import { client } from "@api/apollo";
import { CrewsService } from "@api/services";
import {
  CrewStreak,
  CrewVisibility,
  ICrewsResponse,
  IEditCrewRulesForm,
} from "@models/collections";
import { CrewsActions, DialogActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { useMutation } from "@tanstack/react-query";
import Masks from "@utils/masks.utils";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TextInput } from "react-native";
import { Asset } from "react-native-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Checkbox,
  Input,
  MediaSelect,
  Row,
  Typography,
} from "../../atoms";
import S from "./EditCrewSettings.styles";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  SlideInLeft,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";

const EditCrewSettings: React.FC = () => {
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);
  const { data: dialogData } = useSelector((state: StoreState) => state.dialog);
  const insets = useSafeAreaInsets();
  const [preview, setPreview] = useState<string | undefined>(crew?.banner?.url);
  const [newBanner, setNewBanner] = useState<Asset | undefined>(undefined);
  const [visibility, setVisibility] = useState<CrewVisibility>(
    crew?.visibility || CrewVisibility.Public
  );
  const [streaks, setStreaks] = useState<CrewStreak[]>(crew?.streak || []);
  const dispatch = useDispatch<AppDispatch>();
  const rules = useMemo(() => {
    const { __typename, ...r } = crew?.rules as any;

    return r;
  }, [crew?.rules]);

  const { control, watch } = useForm<IEditCrewRulesForm>({
    mode: "all",
    defaultValues: {
      ...rules,
      lose_streak_in_days: crew?.lose_streak_in_days,
    },
  });
  const values = watch();
  const loseStreakRef = useRef<TextInput | null>(null);
  const scrollRef = useRef<Animated.ScrollView>(null);

  const onBannerChange = (file: Asset) => {
    if (file.base64) {
      setPreview(`data:image/jpeg;base64,${file.base64}`);
    }

    setNewBanner(file);
  };

  const onStreakChange = (streak: CrewStreak) => {
    setStreaks((prev) => {
      if (prev.includes(streak)) {
        return prev.filter((s) => s !== streak);
      } else {
        return [...prev, streak];
      }
    });
  };

  const hasChangedVisibility = useMemo(() => {
    return crew?.visibility !== visibility;
  }, [visibility]);

  const hasChangedRules = useMemo(() => {
    const { lose_streak_in_days, ...rest } = values;
    type RuleKey = keyof typeof rest;

    return Object.keys(rest).some((key) => {
      return rest[key as RuleKey] !== rules[key as RuleKey];
    });
  }, [values]);

  const hasChangedLoseStreak = useMemo(() => {
    return crew?.lose_streak_in_days !== +values.lose_streak_in_days;
  }, [values]);

  const hasChangedStreaks = useMemo(() => {
    return (
      crew?.streak?.length !== streaks.length ||
      crew?.streak?.some((s) => !streaks.includes(s)) ||
      streaks.some((s) => !crew?.streak?.includes(s))
    );
  }, [streaks]);

  const { mutate: updateSettings } = useMutation({
    mutationFn: async () => {
      if (
        hasChangedLoseStreak ||
        hasChangedRules ||
        hasChangedVisibility ||
        hasChangedStreaks
      ) {
        const { lose_streak_in_days, ...rest } = values;
        console.log("Updating crew settings...", rest);
        await CrewsService.updateSettings({
          crew_id: crew?._id || "",
          rules: rest,
          lose_streak_in_days: +lose_streak_in_days,
          visibility,
          streak: streaks,
        });
      }

      if (!!newBanner) {
        console.log("Updating crew banner...");
        await CrewsService.updateBanner({
          crew_id: crew?._id || "",
          file: newBanner,
        });
      }
    },
    onSuccess: async () => {
      const { data } = await client.query<ICrewsResponse>({
        query: CrewsService.gql.CREWS_BY_MEMBER,
        variables: { _id: crew?._id, limit: 1 },
        fetchPolicy: "network-only",
      });
      console.log("Crew settings updated successfully", data.crews[0].rules);
      dispatch(CrewsActions.setCrewView(data.crews[0]));

      if (dialogData?.onBackPress) {
        dialogData.onBackPress();
      }
    },
  });

  useEffect(() => {
    dispatch(
      DialogActions.updateData({
        actionLabel: "crewSettings.save",
        action: updateSettings,
        showAction: () =>
          hasChangedVisibility ||
          hasChangedRules ||
          !!newBanner ||
          hasChangedStreaks ||
          hasChangedLoseStreak,
      })
    );
  }, [
    hasChangedVisibility,
    hasChangedRules,
    hasChangedStreaks,
    !!newBanner,
    hasChangedLoseStreak,
  ]);

  // scroll to field when it is focused
  const scrollToFieldRef = (ref: RefObject<TextInput | null>) => {
    if (ref.current) {
      ref.current.measureInWindow((x, y, width, height) => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            y: y - height,
            animated: true,
          });
        }
      });
    }
  };

  return (
    <S.Container
      contentContainerStyle={{ gap: 24, paddingBottom: insets.bottom }}
      showsVerticalScrollIndicator={false}
      ref={scrollRef}
      entering={FadeInRight}
      exiting={SlideOutRight}
    >
      <MediaSelect
        preview={preview}
        label={crew?.name}
        onMediaChange={onBannerChange}
      />

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
                onFocus: () => scrollToFieldRef(loseStreakRef),
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
    </S.Container>
  );
};

export default EditCrewSettings;
