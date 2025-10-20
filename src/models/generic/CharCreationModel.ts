import { TSkinToneColor } from "@components/molecules/CharCreationUi/CharUi/CharUi.utils";
import { IItem, SkinPiece, SkinSex } from "../collections";

export type TMenuTab = "top" | "bottom" | "hair";

export interface ISelectedItem {
  item?: IItem;
  colorName: string;
}

export interface IPaletteColor {
  primary: string;
  secondary: string;
}

export interface IHairColor extends IPaletteColor {
  border: string;
}

export interface ICharPiece {
  width: number;
  height: number;
  zIndex: number;
  piece?: SkinPiece;
}

export interface IRemoteCharPiece extends ICharPiece {
  uri: string;
}

export interface ISvgColorVariables {
  HAIR_PRIMARY_COLOR: string;
  HAIR_SECONDARY_COLOR: string;
  HAIR_BORDER_COLOR: string;
  SKIN_PRIMARY_COLOR: string;
  SKIN_SECONDARY_COLOR: string;
  TOP_PRIMARY_COLOR: string;
  TOP_SECONDARY_COLOR: string;
  BOTTOM_PRIMARY_COLOR: string;
  BOTTOM_SECONDARY_COLOR: string;
  EYE_COLOR: string;
}

export const DefaultSvgColorVariables: ISvgColorVariables = {
  HAIR_PRIMARY_COLOR: "#2c222b",
  HAIR_SECONDARY_COLOR: "#1c1518",
  HAIR_BORDER_COLOR: "#000000",
  SKIN_PRIMARY_COLOR: "#eec39a",
  SKIN_SECONDARY_COLOR: "#d9a066",
  TOP_PRIMARY_COLOR: "#639bff",
  TOP_SECONDARY_COLOR: "#5b6ee1",
  BOTTOM_PRIMARY_COLOR: "#f8f9fa",
  BOTTOM_SECONDARY_COLOR: "#ced4da",
  EYE_COLOR: "#000000",
};

export interface ISkinConfig {
  sex: SkinSex;
  skinColorName?: TSkinToneColor;
  skinColor?: IPaletteColor;
  eyeColor?: string;
}

export type TCharCreationStep = "body" | "clothing";

export interface ICharCreationState {
  step: TCharCreationStep;
  tab: TMenuTab;
  skin?: ISkinConfig;
  pieces: Record<TMenuTab, ISelectedItem | null>;
  palette: ISvgColorVariables;
  baseAssets?: { resources: IBaseCharacterAssets };
}

export interface IBaseCharacterAssets {
  base_male: string;
  base_female: string;
  color_picker: string;
  palette_picker: string;
}
