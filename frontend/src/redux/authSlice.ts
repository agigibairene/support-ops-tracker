import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Api";

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk<User,LoginCredentials,{ rejectValue: string }>("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    // Get Laravel Sanctum CSRF cookie first
    await api.get("/sanctum/csrf-cookie");

    // Login
    const response = await api.post("/login", credentials);

    return response.data.user;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      "Invalid email or password.";

    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed.";
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;