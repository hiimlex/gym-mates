import { DialogProps } from "@components/atoms";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DialogState = {
  content: React.ReactNode;
  isOpen: boolean;
  data?: DialogProps;
  stack: React.ReactNode[];
  stackData: DialogProps[];
  canGoBack: boolean;
};

type DialogActionPayload = {
  content: DialogState["content"];
  data?: DialogState["data"];
};

const initialState: DialogState = {
  content: null,
  isOpen: false,
  data: undefined,
  stack: [],
  stackData: [],
  canGoBack: false,
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
    moveToNextDialog: (state, action: PayloadAction<DialogActionPayload>) => {
      state.isOpen = true;
      // store current dialog in stack
      if (state.data) {
        state.stackData.push(state.data);
      }
      state.stack.push(state.content);
      // set new dialog
      state.data = action.payload.data;
      state.content = action.payload.content;
      state.canGoBack = true;
    },
    moveToPreviousDialog: (state) => {
      state.isOpen = true;
      // restore previous dialog from stack
      state.content = state.stack.pop() || null;
      state.data = state.stackData.pop() || undefined;

      if (!state.content) {
        state.isOpen = false;
        state.data = undefined;
      }
    },
  },
});

export const DialogActions = { ...DialogSlice.actions };
export default DialogSlice.reducer;
