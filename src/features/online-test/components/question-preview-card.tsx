"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";

import { deleteOnlineTestQuestion } from "@/features/online-test/services/online-test.service";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentOnlineTest } from "@/store/slices/online-test-slice";
import type {
  ChoiceOption,
  PreviewQuestion,
  QuestionVariant,
} from "@/features/online-test/types/question.types";

const typeLabelMap: Record<QuestionVariant, string> = {
  checkbox: "Checkbox",
  radio: "MCQ",
  manual: "Text",
};

function TypeBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex h-7.5 items-center justify-center rounded-xl border border-(--color-border-card) px-3 text-sm text-(--color-text-subtle)">
      {label}
    </span>
  );
}

function ScoreBadge({ score }: { score: string }) {
  return (
    <span className="inline-flex h-7.5 items-center justify-center rounded-xl border border-(--color-border-card) px-3 text-sm text-(--color-text-subtle)">
      {score}
    </span>
  );
}

function ChoiceRow({ choice }: { choice: ChoiceOption }) {
  const isCorrect = Boolean(choice.isCorrect);

  return (
    <div
      className={`flex min-h-12 items-center justify-between rounded-[.6875rem] px-4 text-sm text-(--color-text-primary) ${
        isCorrect ? "bg-(--color-success-surface)" : ""
      }`}
    >
      <span>
        {choice.label} {choice.text}
      </span>
      {isCorrect ? (
        <span className="inline-flex size-5.5 items-center justify-center rounded-full bg-(--color-success) text-white">
          <FiCheck className="size-3.5" />
        </span>
      ) : null}
    </div>
  );
}

export function QuestionPreviewCard({
  question,
  testId,
}: {
  question: PreviewQuestion;
  testId?: string;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const typeHref =
    question.type === "checkbox"
      ? `/online-test/questions?modal=true&type=checkbox&id=${question.id}${testId ? `&testId=${testId}` : ""}`
      : question.type === "radio"
        ? `/online-test/questions?modal=true&type=radio&id=${question.id}${testId ? `&testId=${testId}` : ""}`
        : `/online-test/questions?modal=true&type=manual&id=${question.id}${testId ? `&testId=${testId}` : ""}`;

  const handleRemoveQuestion = async () => {
    if (!testId) {
      return;
    }

    try {
      const updatedTest = await deleteOnlineTestQuestion(testId, question.id);
      dispatch(setCurrentOnlineTest(updatedTest));
      router.refresh();
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Failed to remove question."));
    }
  };

  return (
    <article className="mx-auto w-full max-w-239 rounded-[1.125rem] bg-white px-5 py-6 shadow-(--shadow-card) sm:px-7 sm:py-7 lg:px-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 border-b border-(--color-border-secondary) pb-5 sm:flex-row sm:items-start sm:justify-between">
          <h3 className="text-lg font-semibold text-(--color-text-heading)">
            {question.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            <TypeBadge label={typeLabelMap[question.type]} />
            <ScoreBadge score={question.score} />
          </div>
        </div>

        <div className="space-y-5">
          <h4 className="text-base font-semibold text-black sm:text-lg">
            {question.prompt}
          </h4>

          {errorMessage ? (
            <p className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white">
              {errorMessage}
            </p>
          ) : null}

          {question.type === "manual" ? null : (
            <div className="space-y-4">
              {question.choices?.map((choice) => (
                <ChoiceRow key={choice.id} choice={choice} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-(--color-border-secondary) pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={typeHref}
            className="cursor-pointer text-sm font-medium text-(--color-brand-primary) transition hover:opacity-80"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={handleRemoveQuestion}
            className="cursor-pointer text-sm font-medium text-(--color-text-error) transition hover:opacity-80"
          >
            Remove From Exam
          </button>
        </div>
      </div>
    </article>
  );
}
