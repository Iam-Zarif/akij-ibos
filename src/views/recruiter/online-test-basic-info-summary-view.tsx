"use client";

import Link from "next/link";

import { BasicInfoSummary } from "@/features/online-test/components/basic-info-summary";
import { useOnlineTestDetail } from "@/features/online-test/hooks/use-online-test-detail";
import { ManageOnlineTestStepper } from "@/features/online-test/components/manage-online-test-stepper";

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
            className="inline-flex h-11.5 cursor-pointer items-center justify-center rounded-xl border border-(--color-border-soft) px-16 text-sm font-semibold text-(--color-text-control) transition hover:bg-(--color-hover-surface)"
          >
            Cancel
          </button>

          <Link
            href={
              testId
                ? `/online-test/questions?testId=${testId}`
                : "/online-test/questions"
            }
            className="inline-flex h-11.5 cursor-pointer items-center justify-center rounded-xl bg-(image:--gradient-brand) px-8 text-sm font-semibold text-white shadow-(--shadow-brand) transition hover:opacity-95"
          >
            Save &amp; Continue
          </Link>
        </section>
      </div>
    </main>
  );
}
