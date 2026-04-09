"use client";

import { FiFileText, FiMapPin, FiUsers } from "react-icons/fi";

import { MetricItem } from "@/features/dashboard/components/metric-item";
import type { RecruiterOnlineTest } from "@/features/dashboard/types/dashboard.types";

type TestCardProps = {
  test: RecruiterOnlineTest;
};

export function TestCard({ test }: TestCardProps) {
  return (
    <article className="rounded-[1.125rem] border border-[#dfe3eb] bg-white px-6 py-6 shadow-[0_.25rem_1.125rem_rgba(15,23,42,0.04)]">
      <div className="space-y-7">
        <div className="space-y-4">
          <h3 className="max-w-105 text-lg leading-[1.42] font-semibold text-[#445168]">
            {test.title}
          </h3>

          <div className="flex flex-wrap gap-x-7 gap-y-4">
            <MetricItem
              icon={<FiUsers className="size-4.5" />}
              label="Candidates"
              value={test.candidates}
            />
            <MetricItem
              icon={<FiFileText className="size-4.5" />}
              label="Question Set"
              value={test.questionSet}
            />
            <MetricItem
              icon={<FiMapPin className="size-4.5" />}
              label="Exam Slots"
              value={test.examSlots}
            />
          </div>
        </div>

        <button
          type="button"
          className="h-10 cursor-pointer rounded-[.6875rem] border border-[#8357ff] px-4.5 text-[.9375rem] font-semibold text-[#7a49ff] transition hover:bg-[#f7f2ff]"
        >
          View Candidates
        </button>
      </div>
    </article>
  );
}
