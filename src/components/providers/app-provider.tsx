"use client";

import { useEffect, type ReactNode } from "react";
import { Provider } from "react-redux";

import {
  readStoredAuthUser,
  writeStoredAuthUser,
} from "@/features/auth/utils/auth-storage";
import {
  readStoredOnlineTestState,
  writeStoredOnlineTestState,
} from "@/features/online-test/utils/online-test-storage";
import { store } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hydrateAuthState } from "@/store/slices/auth-slice";
import { hydrateOnlineTestState } from "@/store/slices/online-test-slice";

type AppProviderProps = {
  children: ReactNode;
};

function AuthPersistence() {
  const dispatch = useAppDispatch();
  const activeUser = useAppSelector((state) => state.auth.activeUser);

  useEffect(() => {
    dispatch(hydrateAuthState(readStoredAuthUser()));
  }, [dispatch]);

  useEffect(() => {
    const storedUser = readStoredAuthUser();

    if (!activeUser && storedUser) {
      return;
    }

    writeStoredAuthUser(activeUser);
  }, [activeUser]);

  return null;
}

function OnlineTestPersistence() {
  const dispatch = useAppDispatch();
  const onlineTestState = useAppSelector((state) => state.onlineTest);

  useEffect(() => {
    dispatch(hydrateOnlineTestState(readStoredOnlineTestState()));
  }, [dispatch]);

  useEffect(() => {
    const storedState = readStoredOnlineTestState();

    if (
      !storedState &&
      !onlineTestState.basicInfoDraft.title &&
      onlineTestState.savedQuestions.length === 0
    ) {
      return;
    }

    if (
      storedState &&
      !onlineTestState.basicInfoDraft.title &&
      onlineTestState.savedQuestions.length === 0
    ) {
      return;
    }

    writeStoredOnlineTestState(onlineTestState);
  }, [onlineTestState]);

  return null;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <Provider store={store}>
      <AuthPersistence />
      <OnlineTestPersistence />
      {children}
    </Provider>
  );
}
