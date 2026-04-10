"use client";

import { apiClient } from "@/lib/api-client";
import type { BasicInfoDraft } from "@/features/online-test/types/basic-info.types";
import type { OnlineTestRecord } from "@/features/online-test/types/online-test.types";
import type { PreviewQuestion } from "@/features/online-test/types/question.types";

type OnlineTestsResponse = {
  data: OnlineTestRecord[];
};

type OnlineTestResponse = {
  data: OnlineTestRecord;
  message?: string;
};

export async function fetchOnlineTests() {
  const response = await apiClient.get<OnlineTestsResponse>("/online-tests");
  return response.data.data;
}

export async function fetchOnlineTestById(testId: string) {
  const response = await apiClient.get<OnlineTestResponse>(
    `/online-tests/${testId}`,
  );
  return response.data.data;
}

export async function createOnlineTest(payload: BasicInfoDraft) {
  const response = await apiClient.post<OnlineTestResponse>(
    "/online-tests",
    payload,
  );
  return response.data.data;
}

export async function updateOnlineTestBasicInfo(
  testId: string,
  payload: BasicInfoDraft,
) {
  const response = await apiClient.put<OnlineTestResponse>(
    `/online-tests/${testId}/basic-info`,
    payload,
  );

  return response.data.data;
}

export async function saveOnlineTestQuestion(
  testId: string,
  payload: PreviewQuestion,
) {
  const response = await apiClient.post<OnlineTestResponse>(
    `/online-tests/${testId}/questions`,
    payload,
  );

  return response.data.data;
}

export async function deleteOnlineTestQuestion(
  testId: string,
  questionId: string,
) {
  const response = await apiClient.delete<OnlineTestResponse>(
    `/online-tests/${testId}/questions/${questionId}`,
  );

  return response.data.data;
}

export async function publishOnlineTest(testId: string) {
  const response = await apiClient.post<OnlineTestResponse>(
    `/online-tests/${testId}/publish`,
  );

  return response.data.data;
}
