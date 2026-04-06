import { Button, Input, Typography } from "@components/atoms";
import { iconByWorkoutType } from "@components/atoms/Icons/Icons";
import { CachedImage } from "@georstat/react-native-image-cache";
import { ICreateWorkoutForm, WorkoutType } from "@models/collections";
import { InputRefRecorder } from "@models/generic";
import { AddWorkoutActions, CameraActions, DialogActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { Colors } from "@theme";
import { mountImageURLFromBase64 } from "@utils/file.utils";
import Masks from "@utils/masks.utils";
import { subDays } from "date-fns";
import React, {
  cloneElement,
  RefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Camera } from "react-native-feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import ShareWorkout from "../ShareWorkout/ShareWorkout";
import S from "./AddWorkout.styles";

const AddWorkout: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { picture, formData } = useSelector(
    (state: StoreState) => state.addWorkout,
  );
  const { asset } = useSelector((state: StoreState) => state.camera);

  const { control, formState, getValues } = useForm<ICreateWorkoutForm>({
    mode: "all",
    defaultValues: formData,
  });

  const dispatch = useDispatch<AppDispatch>();
  const scrollRef = useRef<ScrollView>(null);

  const fieldsRef: InputRefRecorder<ICreateWorkoutForm> = {
    date: useRef(null),
    duration: useRef(null),
    type: useRef(null),
  };

  useEffect(() => {
    dispatch(AddWorkoutActions.setPicture(asset));
  }, [asset]);

  const minimumDate = subDays(new Date(), 2);
  const maximumDate = new Date();

  const datePickerStyles = useMemo(() => {
    if (Platform.OS === "ios") {
      return {
        height: 100,
        transform: [{ scale: 0.8 }],
      };
    }

    return {
      height: 100,
    };
  }, []);

  const openCamera = () => {
    dispatch(AddWorkoutActions.setFormData(getValues()));

    dispatch(CameraActions.setShowFullscreen(true));
  };

  const nextStep = () => {
    dispatch(AddWorkoutActions.setFormData(getValues()));

    dispatch(
      DialogActions.moveToNextDialog({
        content: <ShareWorkout />,
        data: {
          title: "links.shareInCrew",
          _t: true,
        },
      }),
    );
  };

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={12}
    >
      <S.Container
        ref={scrollRef}
        contentContainerStyle={{
          gap: 24,
          flexGrow: 1,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 6 }}>
          <S.TakePictureButton activeOpacity={0.6} onPress={openCamera}>
            {picture && picture.base64 && (
              <CachedImage
                source={mountImageURLFromBase64(picture.base64)}
                onError={() => {}}
                style={{
                  width: 160,
                  height: 200,
                  borderRadius: 12,
                }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 12 }}
              ></CachedImage>
            )}
            {!picture && (
              <Camera
                color={Colors.colors.primary}
                fill={Colors.colors.primary}
                fillOpacity={0.1}
                width={32}
                height={32}
                strokeWidth={1}
              />
            )}
          </S.TakePictureButton>
          <Typography.Body textColor="text" _t textAlign="center">
            {"addWorkout.takeAPicture"}
          </Typography.Body>
        </View>

        <View style={{ gap: 6 }}>
          <Typography.Body _t>{"addWorkout.fields.date"}</Typography.Body>

          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                date={value}
                onDateChange={(date) => onChange(date)}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                style={datePickerStyles}
              />
            )}
          />
        </View>

        <View style={{ gap: 12 }}>
          <Typography.Body _t>{"addWorkout.fields.type"}</Typography.Body>
          <Controller
            control={control}
            name="type"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: "row",
                  gap: 12,
                }}
              >
                {Object.values(WorkoutType).map((type) => (
                  <S.CustomBadge
                    touchable
                    onPress={() => onChange(type)}
                    key={type}
                  >
                    {cloneElement(
                      iconByWorkoutType[type]({
                        size: 20,
                        strokeWidth: 2,
                        fill:
                          value === type
                            ? Colors.colors.primary
                            : Colors.colors.textLight,
                        stroke:
                          value === type
                            ? Colors.colors.primary
                            : Colors.colors.textLight,
                      }),
                    )}
                    <Typography.Body
                      _t
                      textColor={value === type ? "primary" : "textLight"}
                    >
                      {`workoutTypes.${type}`}
                    </Typography.Body>
                  </S.CustomBadge>
                ))}
              </ScrollView>
            )}
          />
        </View>

        <Controller
          control={control}
          name="duration"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <View style={{ gap: 6 }}>
              <Typography.Body _t>
                {"addWorkout.fields.duration"}
              </Typography.Body>
              <Input
                placeholder="0"
                onChangeText={(value) => {
                  const masked = Masks.number(value);
                  onChange(masked);
                }}
                inputRef={fieldsRef.duration}
                value={value ? value.toString() : undefined}
                keyboardType="numeric"
                onFocus={() => scrollToFieldRef(fieldsRef.duration)}
                suffix={
                  <Typography.Caption textColor="textLight" _t>
                    {"units.minutes"}
                  </Typography.Caption>
                }
              />
            </View>
          )}
        />

        <Button
          title="addWorkout.buttons.next"
          colorScheme="secondary"
          onPress={nextStep}
          disabled={!formState.isValid}
        />
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default AddWorkout;
