"use client";

import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";

import { useAppSelector } from "@/store/hooks";

export function BasicInfoSummary() {
  const basicInfoDraft = useAppSelector(
    (state) => state.onlineTest.basicInfoDraft,
  );

  const summaryItems = [
    {
      label: "Online Test Title",
      value: basicInfoDraft.title || "-",
      className: "md:col-span-4",
    },
    {
      label: "Total Candidates",
      value: basicInfoDraft.totalCandidates || "-",
    },
    {
      label: "Total Slots",
      value: basicInfoDraft.totalSlots || "-",
    },
    {
      label: "Total Question Set",
      value: basicInfoDraft.totalQuestionSet || "-",
    },
    {
      label: "Duration Per Slots (Minutes)",
      value: basicInfoDraft.duration || "-",
    },
    {
      label: "Question Type",
      value: basicInfoDraft.questionType || "-",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-239 rounded-[1.125rem] bg-white px-5 py-6 shadow-[var(--shadow-card)] sm:px-7 sm:py-7 lg:px-8">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-(--color-text-heading)">
            Basic Information
          </h3>

          <Link
            href="/online-test/create"
            className="inline-flex cursor-pointer items-center gap-2 text-[.9375rem] font-semibold text-(--color-brand-primary) transition hover:opacity-80"
          >
            <FiEdit2 className="size-4" />
            Edit
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-7 md:grid-cols-4">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className={item.className ? item.className : undefined}
            >
              <p className="text-sm text-(--color-text-muted)">{item.label}</p>
              <p className="mt-1 text-base font-semibold text-(--color-text-primary)">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
