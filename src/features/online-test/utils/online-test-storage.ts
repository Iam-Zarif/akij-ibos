import { ONLINE_TEST_STORAGE_KEY } from "@/features/online-test/constants/online-test-storage";
import type { BasicInfoDraft } from "@/features/online-test/types/basic-info.types";
import type { PreviewQuestion } from "@/features/online-test/types/question.types";

export type StoredOnlineTestState = {
  basicInfoDraft: BasicInfoDraft;
  savedQuestions: PreviewQuestion[];
};

export function readStoredOnlineTestState() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.localStorage.getItem(ONLINE_TEST_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as StoredOnlineTestState;
  } catch {
    window.localStorage.removeItem(ONLINE_TEST_STORAGE_KEY);
    return null;
  }
}

export function writeStoredOnlineTestState(state: StoredOnlineTestState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ONLINE_TEST_STORAGE_KEY, JSON.stringify(state));
}
