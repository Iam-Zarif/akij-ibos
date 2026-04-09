import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { MockUser } from "@/features/auth/types/auth.types";

type AuthState = {
  activeUser: MockUser | null;
};

const initialState: AuthState = {
  activeUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuthState(state, action: PayloadAction<MockUser | null>) {
      state.activeUser = action.payload;
    },
    signInSuccess(state, action: PayloadAction<MockUser>) {
      state.activeUser = action.payload;
    },
    signOut(state) {
      state.activeUser = null;
    },
  },
});

export const { hydrateAuthState, signInSuccess, signOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
