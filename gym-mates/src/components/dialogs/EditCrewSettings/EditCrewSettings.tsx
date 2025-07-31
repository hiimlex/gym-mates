import {
  CrewStreak,
  CrewVisibility,
  IEditCrewRulesForm,
} from "@models/collections";
import { AppDispatch, StoreState } from "@store/store";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Asset } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Checkbox,
  Input,
  MediaSelect,
  Row,
  Typography,
} from "../../atoms";
import S from "./styles";
import { DialogActions } from "@store/slices";
import Masks from "@utils/masks.utils";

const EditCrewSettings: React.FC = () => {
  const { crewView: crew } = useSelector((state: StoreState) => state.crews);
  const [preview, setPreview] = useState<string | undefined>(crew?.banner?.url);
  const [newBanner, setNewBanner] = useState<Asset | undefined>(undefined);
  const [visibility, setVisibility] = useState<CrewVisibility>(
    crew?.visibility || CrewVisibility.Public
  );
  const [streaks, setStreaks] = useState<CrewStreak[]>(crew?.streak || []);
  const [loseStreakAt, setLoseStreakAt] = useState<number | undefined>(
    crew?.lose_streak_in_days || 2
  );
  const dispatch = useDispatch<AppDispatch>();
  const rules = useMemo(() => {
    const { __typename, ...r } = crew?.rules as any;

    return r;
  }, [crew?.rules]);

  const { control, watch } = useForm<IEditCrewRulesForm>({
    mode: "all",
    defaultValues: { ...rules },
  });
  const values = watch();

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
    type RuleKey = keyof typeof values;

    return Object.keys(values).some((key) => {
      return values[key as RuleKey] !== rules[key as RuleKey];
    });
  }, [values]);

  const hasChangedStreaks = useMemo(() => {
    return (
      crew?.streak?.length !== streaks.length ||
      crew?.streak?.some((s) => !streaks.includes(s)) ||
      streaks.some((s) => !crew?.streak?.includes(s))
    );
  }, [streaks]);

  useEffect(() => {
    dispatch(
      DialogActions.updateData({
        actionLabel: "crewSettings.save",
        action: () => {},
        showAction: () =>
          hasChangedVisibility ||
          hasChangedRules ||
          !!newBanner ||
          hasChangedStreaks,
      })
    );
  }, [hasChangedVisibility, hasChangedRules, hasChangedStreaks, !!newBanner]);

  return (
    <S.Container>
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

        <Input
          placeholder={"2"}
          inputProps={{
            style: { width: 100, paddingLeft: 24 },
            value: loseStreakAt?.toString(),
            autoCorrect: false,
            keyboardType: "numeric",
            autoComplete: "off",
          }}
          onChange={(value) => {
            const numValue = Masks.number(value);
            setLoseStreakAt(+numValue);
          }}
          suffix={
            <Typography.Caption textColor="textLight" _t>
              {"units.days"}
            </Typography.Caption>
          }
        />
      </Row>
    </S.Container>
  );
};

export default EditCrewSettings;
