"use client";

import { useEffect, useState } from "react";

import { fetchOnlineTests } from "@/features/online-test/services/online-test.service";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { setOnlineTests } from "@/store/slices/online-test-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function useOnlineTests() {
  const dispatch = useAppDispatch();
  const tests = useAppSelector((state) => state.onlineTest.tests);
  const hasLoadedTests = useAppSelector(
    (state) => state.onlineTest.hasLoadedTests,
  );
  const activeUser = useAppSelector((state) => state.auth.activeUser);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!activeUser || hasLoadedTests) {
      return;
    }

    async function loadOnlineTests() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetchOnlineTests();
        dispatch(setOnlineTests(response));
      } catch (error) {
        setErrorMessage(
          getApiErrorMessage(error, "Failed to load online tests."),
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadOnlineTests();
  }, [activeUser, dispatch, hasLoadedTests]);

  return {
    tests,
    isLoading,
    errorMessage,
  };
}
