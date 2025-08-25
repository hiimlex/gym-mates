import {
  ICreateNotification,
  INotifierState,
  IRemoveNotification,
} from "@models/generic";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: INotifierState = {
  notifications: [],
};

const NotifierSlice = createSlice({
  name: "notifier",
  initialState,
  reducers: {
    createNotification: (state, action: PayloadAction<ICreateNotification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<IRemoveNotification>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload.id
      );
    },
  },
});

export const NotifierActions = NotifierSlice.actions;
export default NotifierSlice.reducer;
