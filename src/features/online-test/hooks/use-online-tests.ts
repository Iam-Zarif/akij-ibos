"use client";

import { useEffect, useState } from "react";

import { fetchOnlineTests } from "@/features/online-test/services/online-test.service";
import { readAuthToken } from "@/features/auth/utils/auth-cookie";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { setOnlineTests } from "@/store/slices/online-test-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function useOnlineTests() {
  const dispatch = useAppDispatch();
  const tests = useAppSelector((state) => state.onlineTest.tests);
  const hasLoadedTests = useAppSelector(
    (state) => state.onlineTest.hasLoadedTests,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (hasLoadedTests || !readAuthToken()) {
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
  }, [dispatch, hasLoadedTests]);

  return {
    tests,
    isLoading,
    errorMessage,
  };
}
