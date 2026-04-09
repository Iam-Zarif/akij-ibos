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

          <section className="mx-auto flex w-full max-w-239 flex-col rounded-[1.125rem] bg-white px-5 py-6 shadow-[0_.375rem_1.375rem_rgba(15,23,42,0.04)] sm:px-7 lg:px-8">
            <Link
              href="/online-test/questions?modal=true&type=checkbox"
              className="inline-flex h-13.5 cursor-pointer items-center justify-center rounded-[.875rem] bg-[linear-gradient(90deg,#5f2eea_0%,#7b3ff6_100%)] px-8 text-lg font-semibold text-white shadow-[0_.75rem_1.5rem_rgba(95,46,234,0.18)] transition hover:opacity-95"
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
