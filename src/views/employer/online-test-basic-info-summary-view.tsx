"use client";

import Link from "next/link";

import { BasicInfoSummary } from "@/features/online-test/components/basic-info-summary";
import { useOnlineTestDetail } from "@/features/online-test/hooks/use-online-test-detail";
import { ManageOnlineTestStepper } from "@/features/online-test/components/manage-online-test-stepper";
import { getButtonClassName } from "@/components/ui/app-button";

export function OnlineTestBasicInfoSummaryView({
  testId,
}: {
  testId?: string;
}) {
  const { isLoading, errorMessage } = useOnlineTestDetail(testId);

  return (
    <main className="flex flex-1 flex-col px-4 py-7 sm:px-6 sm:py-9 lg:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <ManageOnlineTestStepper backHref="/dashboard" />

        {isLoading ? (
          <div className="mx-auto w-full max-w-239 rounded-[1.125rem] bg-white px-5 py-6 text-sm text-(--color-text-muted) shadow-(--shadow-card) sm:px-7 lg:px-8">
            Loading test details...
          </div>
        ) : null}
        {errorMessage ? (
          <div className="mx-auto w-full max-w-239 rounded-[1.125rem] bg-red-600 px-5 py-6 text-sm text-white shadow-(--shadow-card) sm:px-7 lg:px-8">
            {errorMessage}
          </div>
        ) : null}

        <BasicInfoSummary />

        <section className="mx-auto flex w-full max-w-239 flex-col gap-4 rounded-[1.125rem] bg-white px-5 py-6 shadow-(--shadow-card) sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
          <button
            type="button"
            className={getButtonClassName({
              variant: "outline",
              className: "px-16",
            })}
          >
            Cancel
          </button>

          <Link
            href={
              testId
                ? `/online-test/questions?testId=${testId}`
                : "/online-test/questions"
            }
            className={getButtonClassName()}
          >
            Save &amp; Continue
          </Link>
        </section>
      </div>
    </main>
  );
}
