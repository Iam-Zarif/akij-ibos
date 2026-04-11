"use client";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "md" | "lg";

type ButtonClassNameOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

function joinClassNames(
  ...classNames: Array<string | false | null | undefined>
) {
  return classNames.filter(Boolean).join(" ");
}

export function getButtonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: ButtonClassNameOptions = {}) {
  const baseClassName =
    "inline-flex cursor-pointer items-center justify-center rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

  const sizeClassName =
    size === "lg"
      ? "py-2 px-8 text-lg shadow-(--shadow-brand)"
      : "px-8 text-sm py-2";

  const variantClassName =
    variant === "primary"
      ? "bg-(image:--gradient-brand) text-white hover:opacity-95"
      : "border border-(--color-border-soft) bg-white text-(--color-brand-text) hover:bg-(--color-hover-surface)";

  return joinClassNames(
    baseClassName,
    sizeClassName,
    variantClassName,
    fullWidth && "w-full",
    className,
  );
}
