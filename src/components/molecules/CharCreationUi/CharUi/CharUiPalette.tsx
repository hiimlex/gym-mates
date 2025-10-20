import { useImageSize } from "@hooks/useImageSize/useImageSize";
import { StoreState } from "@store/Store";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import S from "./CharUi.styles";
import {
  CharCreationZIndex,
  ClothingColors,
  HairColors,
  PaletteColorProps,
} from "./CharUi.utils";
import { CharCreationActions } from "@store/slices/CharCreationSlice";
import { ISvgColorVariables } from "@models/generic";

const paletteMenu = require("../../../../assets/palette_menu.png");

const PaletteColor: React.FC<PaletteColorProps> = ({
  isSelected,
  primary,
  onPress,
}) => {
  const { baseAssets } = useSelector((state: StoreState) => state.charCreation);
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    if (baseAssets && baseAssets.resources.palette_picker) {
      fetch(baseAssets.resources.palette_picker)
        .then((res) => res.text())
        .then((svg) => {
          let txt = svg;
          txt = txt.replace(
            "SELECTED_COLOR",
            isSelected ? "#ffffff" : "#000000"
          );
          txt = txt.replace("COLOR_PRIMARY", primary);

          setSvg(txt);
        });
    }
  }, [baseAssets?.resources, isSelected]);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        width: 22,
        height: 22,
        zIndex: CharCreationZIndex.palette + 1,
      }}
      onPress={onPress}
    >
      <SvgXml xml={svg} style={{ width: 22, height: 22 }} />
    </TouchableOpacity>
  );
};

const CharUiPalette: React.FC = () => {
  const { tab, pieces, palette } = useSelector(
    (state: StoreState) => state.charCreation
  );
  const { width, height } = useImageSize(paletteMenu);
  const resizePercent = 0.65;
  const dispatch = useDispatch();

  const onSelectColor = (
    colorKey: string,
    primary: string,
    secondary: string,
    border?: string
  ) => {
    dispatch(
      CharCreationActions.selectPieceColor({ piece: tab, colorName: colorKey })
    );

    const uppercaseTab = tab.toUpperCase();

    dispatch(
      CharCreationActions.updatePalette({
        colorKey: `${uppercaseTab}_PRIMARY_COLOR` as keyof ISvgColorVariables,
        color: primary,
      })
    );
    dispatch(
      CharCreationActions.updatePalette({
        colorKey: `${uppercaseTab}_SECONDARY_COLOR` as keyof ISvgColorVariables,
        color: secondary,
      })
    );

    if (
      border &&
      Object.keys(palette).includes(`${uppercaseTab}_BORDER_COLOR`)
    ) {
      dispatch(
        CharCreationActions.updatePalette({
          colorKey: `${uppercaseTab}_BORDER_COLOR` as keyof ISvgColorVariables,
          color: border,
        })
      );
    }
  };

  return (
    <S.Palette
      source={paletteMenu}
      style={{
        width: width * resizePercent,
        height: height * resizePercent,
        zIndex: CharCreationZIndex.palette,
        margin: "auto",
      }}
      resizeMode="contain"
    >
      {tab === "hair" &&
        Object.keys(HairColors).map((colorKey) => (
          <PaletteColor
            key={colorKey}
            isSelected={
              pieces.hair?.colorName === colorKey ||
              palette.HAIR_PRIMARY_COLOR ===
                HairColors[colorKey as keyof typeof HairColors].primary
            }
            primary={HairColors[colorKey as keyof typeof HairColors].primary}
            secondary={
              HairColors[colorKey as keyof typeof HairColors].secondary
            }
            onPress={() =>
              onSelectColor(
                colorKey,
                HairColors[colorKey as keyof typeof HairColors].primary,
                HairColors[colorKey as keyof typeof HairColors].secondary,
                HairColors[colorKey as keyof typeof HairColors].border
              )
            }
          />
        ))}

      {(tab === "bottom" || tab === "top") &&
        Object.keys(ClothingColors).map((colorKey) => (
          <PaletteColor
            key={colorKey}
            isSelected={
              (tab === "bottom" && pieces.bottom?.colorName === colorKey) ||
              (tab === "top" && pieces.top?.colorName === colorKey) ||
              (tab === "bottom" &&
                palette.BOTTOM_PRIMARY_COLOR ===
                  ClothingColors[colorKey as keyof typeof ClothingColors]
                    .primary) ||
              (tab === "top" &&
                palette.TOP_PRIMARY_COLOR ===
                  ClothingColors[colorKey as keyof typeof ClothingColors]
                    .primary)
            }
            primary={
              ClothingColors[colorKey as keyof typeof ClothingColors].primary
            }
            secondary={
              ClothingColors[colorKey as keyof typeof ClothingColors].secondary
            }
            onPress={() =>
              onSelectColor(
                colorKey,
                ClothingColors[colorKey as keyof typeof ClothingColors].primary,
                ClothingColors[colorKey as keyof typeof ClothingColors]
                  .secondary
              )
            }
          />
        ))}
    </S.Palette>
  );
};

export default CharUiPalette;
