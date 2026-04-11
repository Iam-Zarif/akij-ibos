"use client";

import Link from "next/link";
import { FiClock, FiFileText, FiXCircle } from "react-icons/fi";

import { MetricItem } from "@/features/dashboard/components/metric-item";
import type { CandidateOnlineTest } from "@/features/dashboard/types/dashboard.types";
import { getButtonClassName } from "@/components/ui/app-button";

type CandidateTestCardProps = {
  test: CandidateOnlineTest;
};

export function CandidateTestCard({ test }: CandidateTestCardProps) {
  return (
    <article className="rounded-[1.125rem] border border-(--color-border-card) bg-white px-5 py-5 shadow-(--shadow-subtle) sm:px-6 sm:py-6">
      <div className="space-y-7">
        <div className="space-y-5">
          <h3 className="text-base leading-[1.4] font-semibold text-(--color-text-primary) sm:text-lg">
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

        <Link
          href={`/assessment/${test.id}`}
          className={getButtonClassName({
            variant: "outline",
            className:
              "rounded-[.6875rem] border-(--color-brand-border) px-12 py-2 text-sm text-(--color-brand-text)",
          })}
        >
          Start
        </Link>
      </div>
    </article>
  );
}
