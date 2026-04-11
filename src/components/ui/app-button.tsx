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
      ? "h-13.5 px-8 text-lg shadow-(--shadow-brand)"
      : "h-11.5 px-8 text-sm";

  const variantClassName =
    variant === "primary"
      ? "bg-(image:--gradient-brand) text-white hover:opacity-95"
      : "border border-(--color-border-soft) bg-white text-(--color-text-control) hover:bg-(--color-hover-surface)";

  return joinClassNames(
    baseClassName,
    sizeClassName,
    variantClassName,
    fullWidth && "w-full",
    className,
  );
}
