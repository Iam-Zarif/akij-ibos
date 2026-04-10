import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AppUser } from "@/features/auth/types/auth.types";

type AuthState = {
  activeUser: AppUser | null;
  isHydrated: boolean;
};

const initialState: AuthState = {
  activeUser: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuthState(state, action: PayloadAction<AppUser | null>) {
      state.activeUser = action.payload;
      state.isHydrated = true;
    },
    signInSuccess(state, action: PayloadAction<AppUser>) {
      state.activeUser = action.payload;
      state.isHydrated = true;
    },
    signOut(state) {
      state.activeUser = null;
      state.isHydrated = true;
    },
  },
});

export const { hydrateAuthState, signInSuccess, signOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
