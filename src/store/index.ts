import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/store/slices/auth-slice";
import { onlineTestReducer } from "@/store/slices/online-test-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onlineTest: onlineTestReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
