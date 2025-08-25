import { AuthService } from "@api/services";
import { IUser, IUserState } from "@models/collections";
import { AccessTokenKey } from "@models/generic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const userState: IUserState = { user: null };

const fetchCurrentUser = createAsyncThunk<IUser>(
  "user/fetchCurrentUser",
  async (_, { getState, dispatch }) => {
    const accessToken = await AsyncStorage.getItem(AccessTokenKey);

    if (!accessToken || accessToken === null) {
      throw new Error("No access token found");
    }

    dispatch(UserActions.setLoading(true));

    const { data } = await AuthService.me();
    return data;
  }
);

const logout = createAsyncThunk<void>(
  "user/logout",
  async (_, { dispatch }) => {
    await AsyncStorage.removeItem(AccessTokenKey);
    dispatch(UserActions.clearUser());
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.loadingCurrentUser = false;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loadingCurrentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loadingCurrentUser = false;
      state.isAuthenticated = true;
    });

    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loadingCurrentUser = false;
      state.isAuthenticated = false;
      state.errorLoadingCurrentUser = action.payload;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.loadingCurrentUser = false;
      state.isAuthenticated = false;
    });
  },
});

export const UserActions = { ...UserSlice.actions, fetchCurrentUser, logout };

export default UserSlice.reducer;
