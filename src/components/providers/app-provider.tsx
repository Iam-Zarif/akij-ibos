"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";

import { fetchCurrentUser } from "@/features/auth/services/auth.service";
import {
  clearAuthToken,
  readAuthToken,
} from "@/features/auth/utils/auth-cookie";
import { store } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateAuthState } from "@/store/slices/auth-slice";
import { clearOnlineTestState } from "@/store/slices/online-test-slice";

type AppProviderProps = {
  children: ReactNode;
};

function AuthPersistence() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const activeUser = useAppSelector((state) => state.auth.activeUser);
  const isHydrated = useAppSelector((state) => state.auth.isHydrated);

  useEffect(() => {
    const token = readAuthToken();

    if (!token) {
      dispatch(hydrateAuthState(null));

      if (!pathname.startsWith("/auth/login")) {
        window.location.replace("/auth/login");
      }

      return;
    }

    fetchCurrentUser()
      .then((user) => {
        dispatch(hydrateAuthState(user));
      })
      .catch(() => {
        clearAuthToken();
        dispatch(hydrateAuthState(null));

        if (!pathname.startsWith("/auth/login")) {
          window.location.replace("/auth/login");
        }
      });
  }, [dispatch, pathname]);

  useEffect(() => {
    if (!isHydrated || activeUser) {
      return;
    }

    dispatch(clearOnlineTestState());
  }, [activeUser, dispatch, isHydrated]);

  return null;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <Provider store={store}>
      <AuthPersistence />
      {children}
    </Provider>
  );
}
