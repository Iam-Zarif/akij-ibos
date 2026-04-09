"use client";

import { FiClock, FiFileText, FiXCircle } from "react-icons/fi";

import { MetricItem } from "@/features/dashboard/components/metric-item";
import type { DeveloperOnlineTest } from "@/features/dashboard/types/dashboard.types";

type DeveloperTestCardProps = {
  test: DeveloperOnlineTest;
};

export function DeveloperTestCard({ test }: DeveloperTestCardProps) {
  return (
    <article className="rounded-[1.125rem] border border-[#dfe3eb] bg-white px-5 py-5 shadow-[0_.25rem_1.125rem_rgba(15,23,42,0.04)] sm:px-6 sm:py-6">
      <div className="space-y-7">
        <div className="space-y-5">
          <h3 className="text-[1.0625rem] leading-[1.4] font-semibold text-[#445168] sm:text-lg">
            {test.title}
          </h3>

          <div className="flex flex-wrap gap-x-7 gap-y-4">
            <MetricItem
              icon={<FiClock className="size-4.25" />}
              label="Duration"
              value={test.duration ?? ""}
            />
            <MetricItem
              icon={<FiFileText className="size-4.25" />}
              label="Question"
              value={test.questions ?? ""}
            />
            <MetricItem
              icon={<FiXCircle className="size-4.25" />}
              label="Negative Marking"
              value={test.negativeMarking ?? ""}
            />
          </div>
        </div>

        <button
          type="button"
          className="cursor-pointer rounded-[.6875rem] border border-[#8357ff] px-10 py-2.25 text-[.9375rem] font-semibold text-[#7a49ff] transition hover:bg-[#f7f2ff]"
        >
          Start
        </button>
      </div>
    </article>
  );
}
