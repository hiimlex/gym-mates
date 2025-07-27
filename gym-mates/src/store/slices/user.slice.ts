import { AuthService } from "@api/services";
import { IUser, IUserState } from "@models/collections";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const userState: IUserState = { user: null };

const fetchCurrentUser = createAsyncThunk<IUser>(
  "user/fetchCurrentUser",
  async (_, { getState }) => {
    const { data } = await AuthService.me();
    return data;
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loadingCurrentUser = false;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loadingCurrentUser = true;
    });

    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.loadingCurrentUser = false;
      state.isAuthenticated = false;
    });
  },
});

export const UserActions = { ...UserSlice.actions, fetchCurrentUser };

export default UserSlice.reducer;
