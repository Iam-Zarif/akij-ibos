"use client";

import Link from "next/link";

import { QuestionModal } from "@/features/online-test/components/question-modal";
import { ManageOnlineTestStepper } from "@/features/online-test/components/manage-online-test-stepper";
import type { QuestionVariant } from "@/features/online-test/types/question.types";

export function OnlineTestQuestionsView({
  isModalOpen,
  questionType,
  questionId,
}: {
  isModalOpen: boolean;
  questionType: QuestionVariant;
  questionId?: string;
}) {
  return (
    <>
      <main className="flex flex-1 flex-col px-4 py-7 sm:px-6 sm:py-9 lg:px-10">
        <div className="mx-auto w-full max-w-340 space-y-8">
          <ManageOnlineTestStepper
            backHref="/dashboard"
            basicInfoState="complete"
            questionsState="complete"
          />

          <section className="mx-auto flex w-full max-w-239 flex-col rounded-[1.125rem] bg-white px-5 py-6 shadow-[var(--shadow-card)] sm:px-7 lg:px-8">
            <Link
              href="/online-test/questions?modal=true&type=checkbox"
              className="inline-flex h-13.5 cursor-pointer items-center justify-center rounded-[.875rem] bg-[image:var(--gradient-brand)] px-8 text-lg font-semibold text-white shadow-[var(--shadow-brand)] transition hover:opacity-95"
            >
              Add Question
            </Link>
          </section>
        </div>
      </main>

      {isModalOpen ? (
        <QuestionModal type={questionType} questionId={questionId} />
      ) : null}
    </>
  );
}
