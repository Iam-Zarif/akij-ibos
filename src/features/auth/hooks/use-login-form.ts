"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { loginSchema } from "@/features/auth/schemas/login.schema";
import { loginUser } from "@/features/auth/services/auth.service";
import type {
  AppUser,
  LoginFormValues,
} from "@/features/auth/types/auth.types";
import {
  writeAuthToken,
  writeAuthUser,
} from "@/features/auth/utils/auth-cookie";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { useAppDispatch } from "@/store/hooks";
import { signInSuccess } from "@/store/slices/auth-slice";

type SubmitState = "idle" | "loading" | "success" | "error";

export function useLoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [signedInUser, setSignedInUser] = useState<AppUser | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const form = useForm<LoginFormValues>({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitState("loading");
    try {
      const result = await loginUser(values.identifier, values.password);
      writeAuthToken(result.token);
      writeAuthUser(result.user);
      dispatch(signInSuccess(result.user));
      setSignedInUser(result.user);
      setSubmitState("success");
      form.clearErrors("root");

      window.setTimeout(() => {
        router.push("/dashboard");
      }, 450);
    } catch (error) {
      setSignedInUser(null);
      setSubmitState("error");
      form.setError("root", {
        message: getApiErrorMessage(error, "Invalid credentials."),
      });
    }
  });

  return {
    form,
    onSubmit,
    signedInUser,
    submitState,
  };
}
