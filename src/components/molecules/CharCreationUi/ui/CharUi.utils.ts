import {
  ICreateCharacterPayload,
  IHairColor,
  IPaletteColor,
  ISelectedItem,
  ISkinConfig,
  ISvgColorVariables,
  TMenuTab,
} from "@models/generic";

export function replaceSvgColors(svg: string, colors: ISvgColorVariables) {
  let modifiedSvg = svg;
  for (const [key, value] of Object.entries(colors)) {
    const regex = new RegExp(key, "g");
    modifiedSvg = modifiedSvg.replace(regex, value);
  }
  return modifiedSvg;
}

export const CharCreationZIndex = {
  bg: 0,
  floor: 1,
  mirror: 1,
  charBase: 2,
  skin: 3,
  menu: 4,
  menuTabs: 5,
  bodyConfig: 4,
  palette: 5,
};

export interface CharPiecesUrl {
  base: string;
  hair: string;
}

export interface SexBtnProps {
  isSelected?: boolean;
  onPress?: () => void;
  sex: "male" | "female";
}

export interface ColorSourceProps {
  primary: string;
  secondary: string;
  isSelected?: boolean;
  onPress?: () => void;
}

export interface PaletteColorProps {
  primary: string;
  secondary: string;
  border?: string;
  isSelected?: boolean;
  onPress?: () => void;
}

export type TSkinToneColor = "a-1" | "a-2" | "b-1" | "b-2" | "c-1" | "c-2";

export const SkinToneColors: Record<TSkinToneColor, IPaletteColor> = {
  "a-1": { primary: "#fce3ca", secondary: "#eec39a" },
  "a-2": { primary: "#eec39a", secondary: "#d9a066" },
  "b-1": { primary: "#cf9f96", secondary: "#b58a83" },
  "b-2": { primary: "#9c675d", secondary: "#8f563b" },
  "c-1": { primary: "#8f563b", secondary: "#754934" },
  "c-2": { primary: "#6b4545", secondary: "#663931" },
};

export type TEyeColor =
  | "black"
  | "blue"
  | "green"
  | "brown"
  | "gray"
  | "hazel"
  | "red";

export const EyeColors: Record<TEyeColor, string> = {
  black: "#000000",
  blue: "#5fcde4",
  green: "#c6f29c",
  brown: "#45283c",
  gray: "#999999",
  hazel: "#b4a76c",
  red: "#bf4e52",
};

export const HairColors: Record<string, IHairColor> = {
  black: { primary: "#2c222b", secondary: "#1c1518", border: "#000000" },
  brown: { primary: "#6f4e37", secondary: "#4b3621", border: "#3b2f2f" },
  brownLight: { primary: "#a67c52", secondary: "#7b5e3c", border: "#5c4033" },
  blonde: { primary: "#f0e2b6", secondary: "#c9b470", border: "#a89c6d" },
  red: { primary: "#bf4e52", secondary: "#86152f", border: "#580e1f" },
  blue: { primary: "#4a6fa5", secondary: "#2c3e50", border: "#1b2838" },
  pink: { primary: "#e91e63", secondary: "#ad1457", border: "#880e4f" },
  white: { primary: "#e0e0e0", secondary: "#9e9e9e", border: "#757575" },
  gray: { primary: "#888888", secondary: "#555555", border: "#444444" },
};

export const ClothingColors: Record<string, IPaletteColor> = {
  blue: { primary: "#639bff", secondary: "#5b6ee1" },
  red: { primary: "#e63946", secondary: "#a4161a" },
  green: { primary: "#2a9d8f", secondary: "#264653" },
  yellow: { primary: "#f4d35e", secondary: "#ee964b" },
  orange: { primary: "#f4a261", secondary: "#e76f51" },
  purple: { primary: "#9d4edd", secondary: "#5a189a" },
  pink: { primary: "#ff6f91", secondary: "#d6336c" },
  black: { primary: "#343a40", secondary: "#212529" },
  white: { primary: "#f8f9fa", secondary: "#ced4da" },
  brown: { primary: "#8d6e63", secondary: "#5d4037" },
  teal: { primary: "#4db6ac", secondary: "#00695c" },
  navy: { primary: "#1e3a5f", secondary: "#102542" },
  maroon: { primary: "#800000", secondary: "#4b0000" },
  olive: { primary: "#808000", secondary: "#4b4b00" },
};

export function buildCharacterPayload(
  skin: ISkinConfig,
  pieces?: Record<TMenuTab, ISelectedItem | null>
): ICreateCharacterPayload | null {
  if (!skin.eyeColorName || !skin.sex || !skin.skinColorName) {
    return null;
  }

  const payload: ICreateCharacterPayload = {
    eye_color: skin.eyeColorName,
    sex: skin.sex,
    skin_color: skin.skinColorName,
  };

  if (pieces) {
    Object.keys(pieces).forEach((tab) => {
      const piece = pieces[tab as TMenuTab];
      if (piece && piece.item) {
        payload[tab as TMenuTab] = {
          item: piece.item._id,
          colorName: piece.colorName,
        };
      }
    });
  }

  return payload;
}
