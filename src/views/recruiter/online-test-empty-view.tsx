"use client";

import Link from "next/link";
import { useState } from "react";

import { DashboardSearch } from "@/features/dashboard/components/dashboard-search";
import { EmptyOnlineTestState } from "@/features/dashboard/components/empty-online-test-state";

export function OnlineTestEmptyView() {
  const [query, setQuery] = useState("");

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

          <EmptyOnlineTestState />
        </section>
      </div>
    </main>
  );
}
