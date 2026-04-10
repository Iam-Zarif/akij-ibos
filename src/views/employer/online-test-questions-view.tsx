"use client";

import Link from "next/link";

import { useOnlineTestDetail } from "@/features/online-test/hooks/use-online-test-detail";
import { QuestionModal } from "@/features/online-test/components/question-modal";
import { ManageOnlineTestStepper } from "@/features/online-test/components/manage-online-test-stepper";
import type { QuestionVariant } from "@/features/online-test/types/question.types";

export function OnlineTestQuestionsView({
  isModalOpen,
  questionType,
  testId,
  questionId,
}: {
  isModalOpen: boolean;
  questionType: QuestionVariant;
  testId?: string;
  questionId?: string;
}) {
  const { isLoading, errorMessage } = useOnlineTestDetail(testId);

  return (
    <>
      <main className="flex flex-1 flex-col px-4 py-7 sm:px-6 sm:py-9 lg:px-10">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          <ManageOnlineTestStepper
            backHref="/dashboard"
            basicInfoState="complete"
            questionsState="complete"
          />

          {isLoading ? (
            <div className="mx-auto w-full max-w-239 rounded-[1.125rem] bg-white px-5 py-6 text-sm text-(--color-text-muted) shadow-(--shadow-card) sm:px-7 lg:px-8">
              Loading questions...
            </div>
          ) : null}
          {errorMessage ? (
            <div className="mx-auto w-full max-w-239 rounded-[1.125rem] bg-red-600 px-5 py-6 text-sm text-white shadow-(--shadow-card) sm:px-7 lg:px-8">
              {errorMessage}
            </div>
          ) : null}

          <section className="mx-auto flex w-full max-w-239 flex-col rounded-[1.125rem] bg-white px-5 py-6 shadow-(--shadow-card) sm:px-7 lg:px-8">
            <Link
              href={
                testId
                  ? `/online-test/questions?testId=${testId}&modal=true&type=checkbox`
                  : "/online-test/questions?modal=true&type=checkbox"
              }
              className="inline-flex h-13.5 cursor-pointer items-center justify-center rounded-[.875rem] bg-(image:--gradient-brand) px-8 text-lg font-semibold text-white shadow-(--shadow-brand) transition hover:opacity-95"
            >
              Add Question
            </Link>
          </section>
        </div>
      </main>

      {isModalOpen ? (
        <QuestionModal
          type={questionType}
          testId={testId}
          questionId={questionId}
        />
      ) : null}
    </>
  );
}
