"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Provider } from "react-redux";

import { fetchCurrentUser } from "@/features/auth/services/auth.service";
import {
  clearAuthToken,
  readAuthToken,
  readAuthUser,
  writeAuthUser,
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
  const router = useRouter();
  const activeUser = useAppSelector((state) => state.auth.activeUser);
  const isHydrated = useAppSelector((state) => state.auth.isHydrated);
  const hasAttemptedHydration = useRef(false);

  useEffect(() => {
    if (hasAttemptedHydration.current) {
      return;
    }

    hasAttemptedHydration.current = true;

    const token = readAuthToken();

    if (!token) {
      dispatch(hydrateAuthState(null));
      return;
    }

    const cachedUser = readAuthUser();

    if (cachedUser) {
      dispatch(hydrateAuthState(cachedUser));
    }

    fetchCurrentUser()
      .then((user) => {
        writeAuthUser(user);
        dispatch(hydrateAuthState(user));
      })
      .catch(() => {
        clearAuthToken();
        dispatch(hydrateAuthState(null));
      });
  }, [dispatch]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (!activeUser && !pathname.startsWith("/auth/login")) {
      router.replace("/auth/login");
    }
  }, [activeUser, isHydrated, pathname, router]);

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
