"use client";

import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

import { useOnlineTestDetail } from "@/features/online-test/hooks/use-online-test-detail";
import { useAppSelector } from "@/store/hooks";

type AssessmentCompletedViewProps = {
  testId: string;
};

export function AssessmentCompletedView({
  testId,
}: AssessmentCompletedViewProps) {
  const { isLoading, errorMessage } = useOnlineTestDetail(testId);
  const activeUser = useAppSelector((state) => state.auth.activeUser);
  const test = useAppSelector((state) =>
    state.onlineTest.tests.find((item) => item.id === testId),
  );

  return (
    <main className="flex flex-1 flex-col px-4 py-7 sm:px-6 sm:py-9 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <section className="rounded-[1.375rem] bg-white px-6 py-14 text-center shadow-(--shadow-card) sm:px-10 sm:py-18">
          {isLoading ? (
            <p className="text-sm text-(--color-text-muted)">
              Loading result...
            </p>
          ) : errorMessage ? (
            <div className="rounded-xl bg-red-600 px-6 py-4 text-sm text-white">
              {errorMessage}
            </div>
          ) : (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center text-(--color-brand-primary)">
                <FiCheckCircle className="size-16" />
              </div>
              <h2 className="mt-6 text-xl leading-none font-semibold text-(--color-text-heading) sm:text-2xl">
                Test Completed
              </h2>
              <p className="mx-auto mt-4 max-w-240 text-base leading-[1.5] text-(--color-text-muted) sm:text-lg">
                Congratulations! {activeUser?.name || "Candidate"}, You have
                completed your {test?.title || "online assessment"}. Thank you
                for participating.
              </p>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-xl border border-(--color-border-primary) bg-white px-7 py-3 text-base font-semibold text-(--color-text-secondary)"
              >
                Back to Dashboard
              </Link>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
