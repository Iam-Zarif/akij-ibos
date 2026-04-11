"use client";

import Link from "next/link";
import { FiClock, FiXCircle } from "react-icons/fi";
import { getButtonClassName } from "@/components/ui/app-button";

type AssessmentTimeoutModalProps = {
  userName: string;
};

export function AssessmentTimeoutModal({
  userName,
}: AssessmentTimeoutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-overlay) px-4">
      <div className="w-full max-w-173 rounded-[1.375rem] bg-white px-8 py-9 text-center shadow-(--shadow-modal) sm:px-12 sm:py-11">
        <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center text-(--color-brand-primary)">
          <FiClock className="size-14" />
          <span className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white">
            <FiXCircle className="size-4" />
          </span>
        </div>
        <h2 className="text-xl leading-none font-semibold text-(--color-text-heading) sm:text-2xl">
          Timeout!
        </h2>
        <p className="mt-4 text-base leading-[1.5] text-(--color-text-muted) sm:text-lg">
          Dear {userName}, Your exam time has been finished. Thank you for
          participating.
        </p>
        <Link
          href="/dashboard"
          className={getButtonClassName({
            variant: "outline",
            className: "mt-8 px-7 text-base",
          })}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
