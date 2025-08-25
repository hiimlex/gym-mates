import { Button, Input, MediaSelect, Typography } from "@components/atoms";
import { CreateCrewSteps, ICreateCrewInfoForm } from "@models/collections";
import { InputRefRecorder } from "@models/generic";
import { AppDispatch, StoreState } from "@store/Store";
import { CreateCrewActions } from "@store/slices/CreateCrewSlice";
import { mountImageURLFromBase64 } from "@utils/file.utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Asset } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import S from "./CreateCrewSteps.styles";
import { FadeOut, SlideInLeft, SlideInRight } from "react-native-reanimated";
import Masks from "@utils/masks.utils";
import { DialogActions } from "@store/slices";

interface CreateCrewInfoStepProps {}

const CreateCrewInfoStep: React.FC<CreateCrewInfoStepProps> = () => {
  const { infoForm } = useSelector((state: StoreState) => state.createCrew);
  const { control, formState, watch } = useForm<ICreateCrewInfoForm>({
    mode: "all",
    defaultValues: {
      name: infoForm?.name || "",
      code: infoForm?.code || "",
    },
  });
  const values = watch();
  const [mediaPreview, setMediaPreview] = useState<string | undefined>(
    infoForm?.mediaPreview
  );
  const [media, setMedia] = useState<Asset | undefined>(undefined);
  const fieldsRef: InputRefRecorder<ICreateCrewInfoForm> = {
    name: useRef(null),
    code: useRef(null),
  };
  const dispatch = useDispatch<AppDispatch>();

  const onMediaChange = (media: Asset) => {
    if (media.base64) {
      setMediaPreview(mountImageURLFromBase64(media.base64));
    }

    setMedia(media);
  };

  const goNext = () => {
    const infoValues = values;
    dispatch(
      CreateCrewActions.setInfoForm({ ...infoValues, media, mediaPreview })
    );
    dispatch(CreateCrewActions.setStep(CreateCrewSteps.Settings));
  };

  const canGoNext = useMemo(
    () => !!media && formState.isValid,
    [media, formState, values]
  );

  useEffect(() => {
    dispatch(
      DialogActions.updateData({
        onBackPress: undefined,
      })
    );
  }, []);

  return (
    <S.Container exiting={FadeOut}>
      <S.FormView
        contentContainerStyle={{ gap: 24 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <S.Group>
          <Typography.Body _t>{"createCrew.infoStep.banner"}</Typography.Body>
          <MediaSelect onMediaChange={onMediaChange} preview={mediaPreview} />
        </S.Group>

        <S.Group>
          <Typography.Body _t>{"createCrew.infoStep.name"}</Typography.Body>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="createCrew.infoStep.namePlaceholder"
                onChange={onChange}
                inputProps={{
                  value,
                }}
                inputRef={fieldsRef.name}
              />
            )}
          />
        </S.Group>
        <S.Group>
          <Typography.Body _t>{"createCrew.infoStep.code"}</Typography.Body>
          <Controller
            name="code"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="createCrew.infoStep.codePlaceholder"
                onChange={(value) => {
                  const maskedValue = Masks.crewName(value);

                  onChange(maskedValue);
                }}
                inputProps={{
                  value,
                }}
                inputRef={fieldsRef.name}
              />
            )}
          />
        </S.Group>
      </S.FormView>
      <Button
        title="createCrew.goNext"
        colorScheme="secondary"
        disabled={!canGoNext}
        onPress={goNext}
      />
    </S.Container>
  );
};

export default CreateCrewInfoStep;
