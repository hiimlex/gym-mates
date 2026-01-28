import { ConfigService } from "@api/services";
import {
  ClothingColors,
  EyeColors,
  HairColors,
  SkinToneColors,
} from "@components/molecules/CharCreationUi/ui/CharUi.utils";
import {
  DefaultSvgColorVariables,
  ICharCreationState,
  ISelectedItem,
  ISkinConfig,
  ISvgColorVariables,
  IUserCharacter,
  TMenuTab,
} from "@models/generic";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICharCreationState = {
  step: "body",
  tab: "hair",
  pieces: {
    hair: null,
    bottom: null,
    top: null,
  },
  palette: DefaultSvgColorVariables,
  skin: {
    eyeColor: EyeColors.black,
    eyeColorName: "black",
    skinColor: SkinToneColors["a-2"],
    skinColorName: "a-2",
  },
};

const getBaseCharacterAssets = createAsyncThunk(
  "charCreation/getBaseCharacterAssets",
  async (_) => {
    const data = await ConfigService.getBaseCharacterAssets();

    return data;
  }
);

const CharCreationSlice = createSlice({
  name: "charCreation",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<TMenuTab>) => {
      state.tab = action.payload;
    },
    setSkin: (state, action: PayloadAction<ISkinConfig>) => {
      if (action.payload.sex !== state.skin?.sex) {
        state.pieces = {
          hair: null,
          bottom: null,
          top: null,
        };
      }

      state.skin = { ...state.skin, ...action.payload };

      if (action.payload.eyeColor) {
        state.palette.EYE_COLOR = action.payload.eyeColor;
      }

      if (action.payload.skinColor) {
        state.palette.SKIN_PRIMARY_COLOR = action.payload.skinColor.primary;
        state.palette.SKIN_SECONDARY_COLOR = action.payload.skinColor.secondary;
      }
    },
    reset: (state) => {
      state.step = "body";
      state.skin = undefined;
      state.tab = "hair";
      state.pieces = {
        hair: null,
        bottom: null,
        top: null,
      };
      state.palette = DefaultSvgColorVariables;
    },
    selectPiece: (
      state,
      action: PayloadAction<{
        piece: TMenuTab;
        item: ISelectedItem;
      }>
    ) => {
      const { piece, item } = action.payload;

      state.pieces[piece] = item;
    },
    selectPieceColor: (
      state,
      action: PayloadAction<{
        piece: TMenuTab;
        colorName: string;
      }>
    ) => {
      const { piece, colorName } = action.payload;

      state.pieces[piece] = {
        ...state.pieces[piece],
        colorName,
      };
    },
    updatePalette: (
      state,
      action: PayloadAction<{
        colorKey: keyof ISvgColorVariables;
        color: string;
      }>
    ) => {
      const { colorKey, color } = action.payload;
      state.palette[colorKey] = color;
    },
    setStep: (state, action: PayloadAction<ICharCreationState["step"]>) => {
      state.step = action.payload;
    },
    loadCharacter: (state, action: PayloadAction<IUserCharacter>) => {
      const character = action.payload;

      const skinColor =
        SkinToneColors[character.skin_color as keyof typeof SkinToneColors];
      const eyeColor = EyeColors[character.eye_color as keyof typeof EyeColors];

      if (skinColor && eyeColor && character.sex) {
        state.skin = {
          ...state.skin,
          eyeColorName: character.eye_color,
          eyeColor: eyeColor,
          skinColorName: character.skin_color as keyof typeof SkinToneColors,
          skinColor: skinColor,
          sex: character.sex,
        };
      }

      if (character.hair) {
        state.pieces.hair = character.hair;
        const hairColor = HairColors[character.hair.colorName as keyof typeof HairColors];
        if (hairColor) {
          state.palette.HAIR_PRIMARY_COLOR = hairColor.primary;
          state.palette.HAIR_SECONDARY_COLOR = hairColor.secondary;
          state.palette.HAIR_BORDER_COLOR = hairColor.border || "";
        }
      }
      if (character.top) {
        state.pieces.top = character.top;
        const topColor = ClothingColors[character.top.colorName as keyof typeof ClothingColors];
        if (topColor) {
          state.palette.TOP_PRIMARY_COLOR = topColor.primary;
          state.palette.TOP_SECONDARY_COLOR = topColor.secondary;
        }
      }
      if (character.bottom) {
        state.pieces.bottom = character.bottom;
        const bottomColor = ClothingColors[character.bottom.colorName as keyof typeof ClothingColors];
        if (bottomColor) {
          state.palette.BOTTOM_PRIMARY_COLOR = bottomColor.primary;
          state.palette.BOTTOM_SECONDARY_COLOR = bottomColor.secondary;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBaseCharacterAssets.fulfilled, (state, action) => {
      state.baseAssets = action.payload;
    });

    builder.addCase(getBaseCharacterAssets.rejected, (state) => {
      state.baseAssets = undefined;
    });
  },
});

export const CharCreationActions = {
  ...CharCreationSlice.actions,
  getBaseCharacterAssets,
};

export default CharCreationSlice.reducer;
