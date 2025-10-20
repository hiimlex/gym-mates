import { Row } from "@components/atoms";
import { useImageSize } from "@hooks/useImageSize/useImageSize";
import React, { useEffect, useMemo, useState } from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import {
  CharCreationZIndex,
  ColorSourceProps,
  EyeColors,
  SexBtnProps,
  SkinToneColors,
  TEyeColor,
  TSkinToneColor,
} from "./CharUi.utils";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@store/Store";
import { SvgXml } from "react-native-svg";
import { CharCreationActions } from "@store/slices/CharCreationSlice";
import { SkinSex } from "@models/collections";

const bodyTypeLabelImg = require("../../../../assets/body_type_label.png");
const eyeColorLabelImg = require("../../../../assets/eye_color_label.png");
const skinToneLabelImg = require("../../../../assets/skin_tone_label.png");
const sexBtnImg = require("../../../../assets/sex_btn.png");
const sexBtnSelectedImg = require("../../../../assets/sex_btn_selected.png");
const femaleIcon = require("../../../../assets/female_icon.png");
const maleIcon = require("../../../../assets/male_icon.png");

interface BodyConfigProps {}

const BodyTypeLabel = () => {
  const { width, height } = useImageSize(bodyTypeLabelImg);

  const resizePercentage = 0.5;

  return (
    <Image
      source={bodyTypeLabelImg}
      style={{
        width: width * resizePercentage,
        height: height * resizePercentage,
      }}
    />
  );
};

const SkinToneLabel = () => {
  const { width, height } = useImageSize(skinToneLabelImg);

  const resizePercentage = 0.5;

  return (
    <Image
      source={skinToneLabelImg}
      style={{
        width: width * resizePercentage,
        height: height * resizePercentage,
      }}
    />
  );
};

const EyeColorLabel = () => {
  const { width, height } = useImageSize(eyeColorLabelImg);

  const resizePercentage = 0.5;

  return (
    <Image
      source={eyeColorLabelImg}
      style={{
        width: width * resizePercentage,
        height: height * resizePercentage,
      }}
    />
  );
};

const SexBtn: React.FC<SexBtnProps> = ({ isSelected, onPress, sex }) => {
  const { width, height } = useImageSize(sexBtnImg);
  const { width: selectedWidth, height: selectedHeight } =
    useImageSize(sexBtnSelectedImg);
  const icon = useMemo(() => (sex === "male" ? maleIcon : femaleIcon), [sex]);

  const resizePercent = 0.6;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        source={isSelected ? sexBtnSelectedImg : sexBtnImg}
        style={{
          width: width * resizePercent,
          height: height * resizePercent,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={icon}
          style={{
            width: 32,
            height: 32,
          }}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const ColorSource: React.FC<ColorSourceProps> = ({
  primary,
  secondary,
  isSelected,
  onPress,
}) => {
  const { baseAssets } = useSelector((state: StoreState) => state.charCreation);
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    if (baseAssets?.resources.color_picker) {
      fetch(baseAssets.resources.color_picker)
        .then((res) => res.text())
        .then((text) => {
          text = text.replace("COLOR_PRIMARY", primary);
          text = text.replace("COLOR_SECONDARY", secondary);
          text = text.replace(
            "SELECTED_COLOR",
            isSelected ? "#ffffff" : "transparent"
          );

          setSvg(text);
        });
    }
  }, [baseAssets, isSelected]);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <SvgXml xml={svg} style={{ width: 32, height: 32 }} />
    </TouchableOpacity>
  );
};

const BodyConfig: React.FC<BodyConfigProps> = () => {
  const dispatch = useDispatch();
  const { skin, palette } = useSelector(
    (state: StoreState) => state.charCreation
  );

  const setSkinSex = (sex: SkinSex) => {
    dispatch(CharCreationActions.setSkin({ sex }));
  };

  const setSkinTone = (skinColorName: TSkinToneColor) => {
    const colors = SkinToneColors[skinColorName];

    if (skin) {
      dispatch(
        CharCreationActions.setSkin({
          sex: skin.sex,
          skinColorName,
          skinColor: colors,
        })
      );
    }
  };

  const setEyeColor = (eyeColor: TEyeColor) => {
    const color = EyeColors[eyeColor];
    if (skin) {
      dispatch(
        CharCreationActions.setSkin({
          ...skin,
          eyeColor: color,
        })
      );
    }
  };

  return (
    <View
      style={{
        gap: 24,
        justifyContent: "flex-start",
        width: "100%",
        padding: 24,
        zIndex: CharCreationZIndex.bodyConfig,
      }}
    >
      <Row align="center" gap={12}>
        <BodyTypeLabel />
        <SexBtn
          sex="male"
          onPress={() => setSkinSex(SkinSex.male)}
          isSelected={skin?.sex === SkinSex.male}
        />
        <SexBtn
          sex="female"
          onPress={() => setSkinSex(SkinSex.female)}
          isSelected={skin?.sex === SkinSex.female}
        />
      </Row>
      <Row align="center" gap={2}>
        <SkinToneLabel />
        {Object.keys(SkinToneColors).map((key: string) => {
          const color = SkinToneColors[key as TSkinToneColor];
          return (
            <ColorSource
              primary={color.primary}
              secondary={color.secondary}
              key={key}
              isSelected={
                skin?.skinColorName === key ||
                palette.SKIN_PRIMARY_COLOR === color.primary
              }
              onPress={() => setSkinTone(key as TSkinToneColor)}
            />
          );
        })}
      </Row>
      <Row align="center">
        <EyeColorLabel />
        {Object.keys(EyeColors).map((key: string) => {
          const color = EyeColors[key as TEyeColor];

          return (
            <ColorSource
              primary={color}
              secondary={color}
              key={key}
              isSelected={
                skin?.eyeColor === color || palette.EYE_COLOR === color
              }
              onPress={() => setEyeColor(key as TEyeColor)}
            />
          );
        })}
      </Row>
    </View>
  );
};

export default BodyConfig;
