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

  return (
    <div className="w-full max-w-130 rounded-[1.125rem] border border-[#dddfe6] bg-white px-7 py-8 shadow-[0_.375rem_1.125rem_rgba(17,24,39,0.04)] sm:px-7">
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-3">
          <label
            htmlFor="identifier"
            className="block text-[.9375rem] font-semibold text-[#59667a]"
          >
            Email/ User ID
          </label>
          <input
            id="identifier"
            type="text"
            placeholder="Enter your email/User ID"
            className="h-11.5 w-full rounded-lg border border-[#d8ddea] px-4 text-base text-[#3f4a5a] transition outline-none focus:border-[#7748ff]"
            {...register("identifier")}
          />
          {errors.identifier ? (
            <p className="text-[.8125rem] text-[#dc2626]">
              {errors.identifier.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-3">
          <label
            htmlFor="password"
            className="block text-[.9375rem] font-semibold text-[#59667a]"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="h-11.5 w-full rounded-lg border border-[#d8ddea] px-4 pr-12 text-base text-[#3f4a5a] transition outline-none focus:border-[#7748ff]"
              {...register("password")}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-[#9aa4b5]"
            >
              {showPassword ? (
                <FiEyeOff className="size-5" />
              ) : (
                <FiEye className="size-5" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p className="text-[.8125rem] text-[#dc2626]">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-[.9375rem] font-semibold text-[#56657a] transition hover:text-[#7748ff]"
          >
            Forget Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl bg-[linear-gradient(90deg,#5f2eea_0%,#7b3ff6_100%)] text-base font-semibold text-white shadow-[0_.75rem_1.875rem_rgba(95,46,234,0.22)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
