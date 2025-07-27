import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./slices/user.slice";

const rootReducer = combineReducers({
  user: UserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type StoreState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
