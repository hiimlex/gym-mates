import { ConfigService } from "@api/services";
import {
  DefaultSvgColorVariables,
  ICharCreationState,
  ISelectedItem,
  ISkinConfig,
  ISvgColorVariables,
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
  skin: undefined,
};

const getBaseCharacterAssets = createAsyncThunk(
  "charCreation/getBaseCharacterAssets",
  async (_, thunkAPI) => {
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
