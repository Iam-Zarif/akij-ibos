"use client";

import Link from "next/link";
import { useMemo } from "react";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { EmptyOnlineTestState } from "@/features/dashboard/components/empty-online-test-state";
import { DashboardSearch } from "@/features/dashboard/components/dashboard-search";
import { useDashboardSearch } from "@/features/dashboard/hooks/use-dashboard-search";
import { TestCard } from "@/features/dashboard/components/test-card";
import type { RecruiterOnlineTest } from "@/features/dashboard/types/dashboard.types";
import { useOnlineTests } from "@/features/online-test/hooks/use-online-tests";

export function RecruiterDashboardView() {
  const { tests, isLoading, errorMessage } = useOnlineTests();
  const recruiterTests = useMemo<RecruiterOnlineTest[]>(() => {
    return tests.map((test) => ({
      id: test.id,
      title: test.title,
      candidates: test.totalCandidates || "Not Set",
      questionSet: test.totalQuestionSet || "Not Set",
      examSlots: test.totalSlots || "Not Set",
    }));
  }, [tests]);
  const { filteredItems, query, setQuery } = useDashboardSearch(recruiterTests);
  const hasTests = recruiterTests.length > 0;

  return (
    <main className="flex flex-1 flex-col px-4 py-7 sm:px-6 sm:py-9 lg:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-7 sm:space-y-9">
        <section className="space-y-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <h2 className="text-xl font-semibold text-(--color-text-heading)">
              Online Tests
            </h2>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
              <DashboardSearch value={query} onChange={setQuery} />

              <Link
                href="/online-test/create"
                className="inline-flex h-10 cursor-pointer items-center justify-center rounded-[.6875rem] bg-(image:--gradient-brand) px-6 text-center text-sm font-semibold text-white shadow-(--shadow-brand) transition hover:opacity-95 lg:min-w-36.5"
              >
                Create Online Test
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className="rounded-[1.125rem] bg-white px-6 py-8 text-sm text-(--color-text-muted) shadow-(--shadow-card)">
              Loading online tests...
            </div>
          ) : errorMessage ? (
            <div className="rounded-[1.125rem] bg-red-600 px-6 py-8 text-sm text-white shadow-(--shadow-card)">
              {errorMessage}
            </div>
          ) : hasTests ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {filteredItems.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          ) : (
            <EmptyOnlineTestState />
          )}
        </section>

        {hasTests ? (
          <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <button
                type="button"
                className="flex size-6 cursor-pointer items-center justify-center rounded-full border border-(--color-border-pager) bg-white text-(--color-icon-light)"
              >
                <FiChevronLeft className="size-3.5" />
              </button>
              <span className="text-sm font-medium text-(--color-text-page-number)">
                1
              </span>
              <button
                type="button"
                className="flex size-6 cursor-pointer items-center justify-center rounded-full border border-(--color-border-pager) bg-white text-(--color-text-subtle)"
              >
                <FiChevronRight className="size-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="text-xs text-(--color-text-caption)">
                Online Test Per Page
              </span>
              <button
                type="button"
                className="flex h-7 min-w-10 cursor-pointer items-center justify-center gap-1 rounded-lg border border-(--color-border-pager) bg-white px-2 text-xs font-medium text-(--color-text-dark)"
              >
                8
                <FiChevronDown className="size-3.5" />
              </button>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
