"use client";

import { apiClient } from "@/lib/api-client";
import type { MockUser } from "@/features/auth/types/auth.types";

type LoginResponse = {
  data: {
    user: MockUser;
    token: string;
  };
  message: string;
};

type MeResponse = {
  data: MockUser;
};

export async function loginUser(identifier: string, password: string) {
  const response = await apiClient.post<LoginResponse>("/auth/login", {
    identifier,
    password,
  });

  return response.data.data;
}

export async function fetchCurrentUser() {
  const response = await apiClient.get<MeResponse>("/auth/me");
  return response.data.data;
}
