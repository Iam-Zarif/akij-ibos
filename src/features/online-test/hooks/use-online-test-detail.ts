"use client";

import { useEffect, useState } from "react";

import { fetchOnlineTestById } from "@/features/online-test/services/online-test.service";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { setCurrentOnlineTest } from "@/store/slices/online-test-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function useOnlineTestDetail(testId?: string) {
  const dispatch = useAppDispatch();
  const currentTestId = useAppSelector(
    (state) => state.onlineTest.currentTestId,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!testId || currentTestId === testId) {
      return;
    }

    const resolvedTestId = testId;

    async function loadOnlineTest() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const test = await fetchOnlineTestById(resolvedTestId);
        dispatch(setCurrentOnlineTest(test));
      } catch (error) {
        setErrorMessage(
          getApiErrorMessage(error, "Failed to load online test."),
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadOnlineTest();
  }, [currentTestId, dispatch, testId]);

  return {
    isLoading,
    errorMessage,
  };
}
