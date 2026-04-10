"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { useLoginForm } from "@/features/auth/hooks/use-login-form";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit, signedInUser, submitState } = useLoginForm();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  const buttonText =
    submitState === "loading"
      ? "Signing In..."
      : submitState === "success"
        ? `Welcome, ${signedInUser?.name ?? "User"}`
        : submitState === "error"
          ? "Invalid Credentials"
          : "Sign In";
  const submitButtonClassName =
    submitState === "error"
      ? "bg-red-600 shadow-none"
      : "bg-(image:--gradient-brand) shadow-(--shadow-brand-strong)";

  return (
    <div className="w-full max-w-130 rounded-[1.125rem] border border-(--color-border-login-card) bg-white px-7 py-8 shadow-[0_.375rem_1.125rem_rgba(17,24,39,0.04)] sm:px-7">
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-3">
          <label
            htmlFor="identifier"
            className="block text-sm font-semibold text-(--color-label-login)"
          >
            Email/ User ID
          </label>
          <input
            id="identifier"
            type="text"
            placeholder="Enter your email/User ID"
            className="h-11.5 w-full rounded-lg border border-(--color-border-login) px-4 text-base text-(--color-foreground) transition outline-none focus:border-(--color-brand-focus)"
            {...register("identifier")}
          />
          {errors.identifier ? (
            <p className="rounded-lg bg-red-600 px-3 py-2 text-xs text-white">
              {errors.identifier.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-3">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-(--color-label-login)"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="h-11.5 w-full rounded-lg border border-(--color-border-login) px-4 pr-12 text-base text-(--color-foreground) transition outline-none focus:border-(--color-brand-focus)"
              {...register("password")}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-(--color-icon-eye)"
            >
              {showPassword ? (
                <FiEyeOff className="size-5" />
              ) : (
                <FiEye className="size-5" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p className="rounded-lg bg-red-600 px-3 py-2 text-xs text-white">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="cursor-pointer text-sm font-semibold text-(--color-text-interactive) transition hover:text-(--color-brand-focus)"
          >
            Forget Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`h-11 w-full cursor-pointer rounded-xl text-base font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 ${submitButtonClassName}`}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
