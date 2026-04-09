"use client";

import Link from "next/link";
import { useMemo } from "react";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { EmptyOnlineTestState } from "@/features/dashboard/components/empty-online-test-state";
import { DashboardSearch } from "@/features/dashboard/components/dashboard-search";
import { useDashboardSearch } from "@/features/dashboard/hooks/use-dashboard-search";
import { TestCard } from "@/features/dashboard/components/test-card";
import type { RecruiterOnlineTest } from "@/features/dashboard/types/dashboard.types";
import { useAppSelector } from "@/store/hooks";

export function RecruiterDashboardView() {
  const { basicInfoDraft } = useAppSelector((state) => state.onlineTest);
  const recruiterTests = useMemo<RecruiterOnlineTest[]>(() => {
    if (!basicInfoDraft.title.trim()) {
      return [];
    }

    return [
      {
        id: "draft-test-001",
        title: basicInfoDraft.title,
        candidates: basicInfoDraft.totalCandidates || "Not Set",
        questionSet: basicInfoDraft.totalQuestionSet || "Not Set",
        examSlots: basicInfoDraft.totalSlots || "Not Set",
      },
    ];
  }, [basicInfoDraft]);
  const { filteredItems, query, setQuery } = useDashboardSearch(recruiterTests);
  const hasTests = recruiterTests.length > 0;

  return (
    <main className="flex flex-1 flex-col px-4 py-7 sm:px-6 sm:py-9 lg:px-10">
      <div className="mx-auto w-full max-w-340 space-y-7 sm:space-y-9">
        <section className="space-y-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <h2 className="text-[1.3125rem] font-semibold text-[#425069]">
              Online Tests
            </h2>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
              <DashboardSearch value={query} onChange={setQuery} />

              <Link
                href="/online-test/create"
                className="inline-flex h-10 cursor-pointer items-center justify-center rounded-[.6875rem] bg-[linear-gradient(90deg,#5f2eea_0%,#7b3ff6_100%)] px-6 text-center text-sm font-semibold text-white shadow-[0_.75rem_1.5rem_rgba(95,46,234,0.18)] transition hover:opacity-95 lg:min-w-36.5"
              >
                Create Online Test
              </Link>
            </div>
          </div>

          {hasTests ? (
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
                className="flex size-6 cursor-pointer items-center justify-center rounded-full border border-[#eceff5] bg-white text-[#b2bac8]"
              >
                <FiChevronLeft className="size-3.5" />
              </button>
              <span className="text-sm font-medium text-[#48556d]">1</span>
              <button
                type="button"
                className="flex size-6 cursor-pointer items-center justify-center rounded-full border border-[#eceff5] bg-white text-[#7b8798]"
              >
                <FiChevronRight className="size-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="text-[.8125rem] text-[#6d7686]">
                Online Test Per Page
              </span>
              <button
                type="button"
                className="flex h-7 min-w-10 cursor-pointer items-center justify-center gap-1 rounded-lg border border-[#eceff5] bg-white px-2 text-[.8125rem] font-medium text-[#4f5b72]"
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
