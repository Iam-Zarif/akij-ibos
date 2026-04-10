"use client";

import type { InputHTMLAttributes } from "react";

import type { ChoiceOption } from "@/features/online-test/types/question.types";

type AssessmentOptionItemProps = {
  option: ChoiceOption;
  type: "checkbox" | "radio";
  checked: boolean;
  name: string;
  onChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
};

export function AssessmentOptionItem({
  option,
  type,
  checked,
  name,
  onChange,
}: AssessmentOptionItemProps) {
  return (
    <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-(--color-border-option) bg-white px-4 py-4 transition hover:border-(--color-brand-border)">
      <input
        checked={checked}
        name={name}
        type={type}
        onChange={onChange}
        className={`mt-0.5 h-6 w-6 cursor-pointer border-(--color-border-soft) text-(--color-brand-primary) focus:ring-(--color-brand-primary) ${
          type === "radio" ? "rounded-full" : "rounded-[0.375rem]"
        }`}
      />
      <span className="text-sm leading-[1.35] text-(--color-text-secondary) sm:text-base">
        {option.text}
      </span>
    </label>
  );
}
