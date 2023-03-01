import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { _getUsers } from "../../../apis/data";
import Routes from "../../../constants/routes";
import { globalNavigate } from "../../../untils/GlobalHistory";

const initialState = {
  users: {},
  isAuth: false,
  isLoading: false,
  userInfo: {},
  loginError: null,
};

export const actLogin = createAsyncThunk(
  "auth/actLogin",
  async (formData, thunkAPI) => {
    const { username, password } = formData;
    try {
      const users = await _getUsers();
      if (users[username] && password === users[username].password) {
        return {
          users: users,
          user: users[username],
        };
      } else throw new Error("Account or password incorrect!");
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const actFetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const users = await _getUsers();
      return users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    actLogout: (state, _) => {
      state.users = {};
      state.isAuth = false;
      state.isLoading = false;
      state.userInfo = {};
      state.loginError = null;
      globalNavigate(Routes.LOGIN_PAGE);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLogin.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      state.loginError = action.payload;
      state.isLoading = false;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      const { users, user } = action.payload;
      state.isAuth = true;
      state.isLoading = false;
      state.loginError = null;
      state.userInfo = user;
      state.users = users;
      toast.success("Login Success!");
    });
    builder.addCase(actFetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { actLogout } = authSlice.actions;
export default authSlice.reducer;
