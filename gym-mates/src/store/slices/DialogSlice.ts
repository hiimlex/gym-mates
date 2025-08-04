import { DialogProps } from "@components/atoms";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DialogState = {
  content: React.ReactNode;
  isOpen: boolean;
  data?: DialogProps;
};

type DialogActionPayload = {
  content: DialogState["content"];
  data?: DialogState["data"];
};

const initialState: DialogState = {
  content: null,
  isOpen: false,
  data: undefined,
};

const DialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<DialogActionPayload>) => {
      state.isOpen = true;
      state.data = action.payload.data;
      if (action.payload.content) {
        state.content = action.payload.content;
      }
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.content = null;
      state.data = undefined;
    },
    updateData: (
      state,
      action: PayloadAction<Partial<DialogState["data"]>>
    ) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const DialogActions = { ...DialogSlice.actions };
export default DialogSlice.reducer;
