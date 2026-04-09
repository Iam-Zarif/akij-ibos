"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { loginSchema } from "@/features/auth/schemas/login.schema";
import type {
  LoginFormValues,
  MockUser,
} from "@/features/auth/types/auth.types";
import { findMockUser } from "@/features/auth/utils/find-mock-user";
import { useAppDispatch } from "@/store/hooks";
import { signInSuccess } from "@/store/slices/auth-slice";

type SubmitState = "idle" | "loading" | "success" | "error";

export function useLoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [signedInUser, setSignedInUser] = useState<MockUser | null>(null);
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

    await new Promise((resolve) => {
      window.setTimeout(resolve, 450);
    });

    const matchedUser = findMockUser(values);

    if (!matchedUser) {
      setSignedInUser(null);
      setSubmitState("error");
      form.setError("root", {
        message: "Invalid credentials. Use one of the configured mock users.",
      });
      return;
    }

    dispatch(signInSuccess(matchedUser));
    setSignedInUser(matchedUser);
    setSubmitState("success");
    form.clearErrors("root");

    window.setTimeout(() => {
      router.push("/dashboard");
    }, 450);
  });

  return {
    form,
    onSubmit,
    signedInUser,
    submitState,
  };
}
