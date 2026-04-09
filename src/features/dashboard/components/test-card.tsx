"use client";

import { FiFileText, FiMapPin, FiUsers } from "react-icons/fi";

import { MetricItem } from "@/features/dashboard/components/metric-item";
import type { RecruiterOnlineTest } from "@/features/dashboard/types/dashboard.types";

type TestCardProps = {
  test: RecruiterOnlineTest;
};

export function TestCard({ test }: TestCardProps) {
  return (
    <article className="rounded-[1.125rem] border border-(--color-border-card) bg-white px-6 py-6 shadow-[var(--shadow-subtle)]">
      <div className="space-y-7">
        <div className="space-y-4">
          <h3 className="max-w-105 text-lg leading-[1.42] font-semibold text-(--color-text-primary)">
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
          className="h-10 cursor-pointer rounded-[.6875rem] border border-(--color-brand-border) px-4.5 text-[.9375rem] font-semibold text-(--color-brand-text) transition hover:bg-(--color-brand-hover)"
        >
          View Candidates
        </button>
      </div>
    </article>
  );
}
