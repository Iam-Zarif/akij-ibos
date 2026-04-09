"use client";

import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { DashboardSearch } from "@/features/dashboard/components/dashboard-search";
import { DeveloperTestCard } from "@/features/dashboard/components/developer-test-card";
import { developerTests } from "@/features/dashboard/constants/developer-tests";
import { useDashboardSearch } from "@/features/dashboard/hooks/use-dashboard-search";

export function DeveloperDashboardView() {
  const { filteredItems, query, setQuery } = useDashboardSearch(developerTests);

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
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            {filteredItems.map((test) => (
              <DeveloperTestCard key={test.id} test={test} />
            ))}
          </div>
        </section>

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
      </div>
    </main>
  );
}
