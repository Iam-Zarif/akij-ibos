"use client";

import { useAppSelector } from "@/store/hooks";
import { DeveloperDashboardView } from "@/views/developer/dashboard-view";
import { RecruiterDashboardView } from "@/views/recruiter/dashboard-view";

export function DashboardView() {
  const activeUser = useAppSelector((state) => state.auth.activeUser);

  if (activeUser?.role === "developer") {
    return <DeveloperDashboardView />;
  }

  return <RecruiterDashboardView />;
}
