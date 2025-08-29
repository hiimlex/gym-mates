import {
  Button,
  ControlledInput,
  Icons,
  Input,
  MediaSelect,
  Typography,
} from "@components/atoms";
import { ICreateWorkoutForm, WorkoutType } from "@models/collections";
import { InputRefRecorder } from "@models/generic";
import { AddWorkoutActions, DialogActions } from "@store/slices";
import { AppDispatch, StoreState } from "@store/Store";
import { Colors } from "@theme";
import Masks from "@utils/masks.utils";
import { subDays } from "date-fns";
import React, {
  cloneElement,
  ReactElement,
  RefObject,
  useMemo,
  useRef,
  useState,
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
import { Asset } from "react-native-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { IIConProps } from "../../atoms/Icons/Icons";
import ShareWorkout from "../ShareWorkout/ShareWorkout";
import S from "./AddWorkout.styles";

const AddWorkout: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { picture, formData } = useSelector(
    (state: StoreState) => state.addWorkout
  );

  const { control, formState, getValues } = useForm<ICreateWorkoutForm>({
    mode: "all",
    defaultValues: formData,
  });

  const picturePreview = useMemo(() => {
    if (picture) {
      return `data:${picture.type};base64,${picture.base64}`;
    }
    return undefined;
  }, [picture]);

  const [date, setDate] = useState<Date>(new Date());
  const dispatch = useDispatch<AppDispatch>();
  const scrollRef = useRef<ScrollView>(null);

  const fieldsRef: InputRefRecorder<ICreateWorkoutForm> = {
    title: useRef(null),
    date: useRef(null),
    duration: useRef(null),
    type: useRef(null),
  };

  const onPictureChange = (newAsset: Asset) => {
    dispatch(AddWorkoutActions.setPicture(newAsset));
  };

  const iconByWorkoutType: Record<
    WorkoutType,
    (props?: IIConProps) => ReactElement
  > = {
    gym: (props) => <Icons.Gym {...props} />,
    aerobics: (props) => <Icons.Aerobic {...props} />,
    running: (props) => <Icons.Running {...props} />,
    cycling: (props) => <Icons.Bike {...props} />,
    cross_fit: (props) => <Icons.Free {...props} />,
    cardio: (props) => <Icons.Running {...props} />,
    yoga: (props) => <Icons.Yoga {...props} />,
    swimming: (props) => <Icons.Swimming {...props} />,
    other: (props) => <Icons.Free {...props} />,
  };

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

  const nextStep = () => {
    dispatch(AddWorkoutActions.setFormData(getValues()));

    dispatch(
      DialogActions.openDialog({
        content: <ShareWorkout />,
        data: {
          title: "links.shareInCrew",
          _t: true,
        },
      })
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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <S.Container
        ref={scrollRef}
        contentContainerStyle={{
          gap: 24,
          flexGrow: 1,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Controller
          control={control}
          name="title"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <View style={{ gap: 6 }}>
              <Typography.Body _t>{"addWorkout.fields.title"}</Typography.Body>
              <Input
                placeholder="addWorkout.fields.title"
                onChangeText={onChange}
                inputRef={fieldsRef.title}
                value={value}
              />
            </View>
          )}
        />

        <View style={{ gap: 6 }}>
          <Typography.Body _t>{"addWorkout.fields.picture"}</Typography.Body>
          <MediaSelect
            preview={picturePreview}
            onMediaChange={onPictureChange}
          />
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
                      })
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
          defaultValue={0}
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
                value={value.toString()}
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
