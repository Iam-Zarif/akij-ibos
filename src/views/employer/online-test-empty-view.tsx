"use client";

import Link from "next/link";
import { useState } from "react";

import { DashboardSearch } from "@/features/dashboard/components/dashboard-search";
import { EmptyOnlineTestState } from "@/features/dashboard/components/empty-online-test-state";
import { getButtonClassName } from "@/components/ui/app-button";

export function OnlineTestEmptyView() {
  const [query, setQuery] = useState("");

  return (
    <main className="flex flex-1 flex-col px-4 py-7 sm:px-6 sm:py-9 lg:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-7 sm:space-y-9">
        <section className="space-y-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <h2 className="text-xl font-semibold text-(--color-text-heading)">
              Online Tests
            </h2>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
              <DashboardSearch value={query} onValueChangeAction={setQuery} />

              <Link
                href="/online-test/create"
                className={getButtonClassName({
                  className: "h-10 px-6 lg:min-w-36.5",
                })}
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
