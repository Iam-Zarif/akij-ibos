"use client";

import { useAppSelector } from "@/store/hooks";
import { DeveloperDashboardView } from "@/views/developer/dashboard-view";
import { RecruiterDashboardView } from "@/views/recruiter/dashboard-view";

export function DashboardView() {
  const { activeUser, isHydrated } = useAppSelector((state) => state.auth);

  if (!isHydrated) {
    return (
      <main className="flex flex-1 flex-col px-4 py-7 sm:px-6 sm:py-9 lg:px-10">
        <div className="mx-auto w-full max-w-7xl space-y-7 sm:space-y-9">
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-(--color-text-heading)">
              Online Tests
            </h2>

            <div className="rounded-[1.125rem] bg-white px-6 py-8 text-sm text-(--color-text-muted) shadow-(--shadow-card)">
              Loading dashboard...
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (activeUser?.role === "developer") {
    return <DeveloperDashboardView />;
  }

  return <RecruiterDashboardView />;
}
