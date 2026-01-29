import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import { removeCookies, getCookies, setCookies } from "../../utils/utils";
import { auth, googleAuthProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";

const initialState = {
  loading: false,
  authenticated: getCookies("isAuthenticated") || false,
  name: getCookies("name") || null,
  id: getCookies("id") || null,
  email: getCookies("email") || null,
};

// register api
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// login api
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data,
        { withCredentials: true },
      );
      const verifyres = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        { withCredentials: true },
      );

      return { ...res.data, ...verifyres.data };
    } catch (error) {
      return rejectWithValue({
        message: error.response.message,
      });
    }
  },
);

// google api

export const signInWithGoogle = createAsyncThunk(
  "/google-login",
  async (_, { rejectWithValue }) => {
    try {
      // Open Google login popup
      const result = await signInWithPopup(auth, googleAuthProvider);

      // Get Firebase ID Token
      const idToken = await result.user.getIdToken();
  

      // Send ID Token to Backend API
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        { idToken },
      );

      return res.data;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.authenticated = false;
      state.id = null;
      state.name = null;
      state.email = null;

      removeCookies("isAuthenticated");
      removeCookies("name");
      removeCookies("id");
      removeCookies("email");
    },
  },

  extraReducers: (builder) => {
    builder
      //register case
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
        toast.success(action.payload.message || "Register successfully");
      })
      .addCase(registerUser.rejected, (state, action) => {
        toast.error(action.payload.message);
        state.loading = false;
      })
      // login case
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // if (!action.payload?.authenticated) {
        //   toast.error("Authentication failed");
        //   return;
        // }
        state.loading = false;
        state.authenticated = action.payload.authenticated;
        state.name = action.payload.name;
        state.id = action.payload.id;
        setCookies("isAuthenticated", action.payload.authenticated);
        setCookies("email", action.payload.email);
        setCookies("name", action.payload.name);
        setCookies("id", action.payload.id);
        toast.success(action.payload.message);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
        console.log(action.payload);
      })
      // login with Google
      .addCase(signInWithGoogle.rejected, (state, action) => {
        toast.error(action.payload);
        console.log(action.payload);
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        // if (!action.payload?.authenticated) {
        //   toast.error("Authentication failed");
        //   return;
        // }
        state.authenticated = action.payload.authenticated;
        state.name = action.payload.name;
        state.id = action.payload.id;
        setCookies("isAuthenticated", action.payload.authenticated);
        setCookies("email", action.payload.email);
        setCookies("name", action.payload.name);
        setCookies("id", action.payload.id);
        toast.success(action.payload.message);
      });
  },
});

export default authSlice.reducer;
export const { signOut } = authSlice.actions;
