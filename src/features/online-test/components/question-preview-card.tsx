"use client";

import Link from "next/link";
import { FiCheck } from "react-icons/fi";

import { useAppDispatch } from "@/store/hooks";
import { removeQuestion } from "@/store/slices/online-test-slice";
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
      className={`flex min-h-12 items-center justify-between rounded-[.6875rem] px-4 text-[.9375rem] text-(--color-text-primary) ${
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
}: {
  question: PreviewQuestion;
}) {
  const dispatch = useAppDispatch();
  const typeHref =
    question.type === "checkbox"
      ? `/online-test/questions?modal=true&type=checkbox&id=${question.id}`
      : question.type === "radio"
        ? `/online-test/questions?modal=true&type=radio&id=${question.id}`
        : `/online-test/questions?modal=true&type=manual&id=${question.id}`;

  return (
    <article className="mx-auto w-full max-w-239 rounded-[1.125rem] bg-white px-5 py-6 shadow-[var(--shadow-card)] sm:px-7 sm:py-7 lg:px-8">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-(--color-border-secondary) pb-5">
          <h3 className="text-lg font-semibold text-(--color-text-heading)">
            {question.title}
          </h3>

          <div className="flex items-center gap-3">
            <TypeBadge label={typeLabelMap[question.type]} />
            <ScoreBadge score={question.score} />
          </div>
        </div>

        <div className="space-y-5">
          <h4 className="text-lg font-semibold text-black">
            {question.prompt}
          </h4>

          {question.type === "manual" ? (
            <p className="max-w-215 text-sm leading-[1.75] text-(--color-text-primary)">
              {question.answerText}
            </p>
          ) : (
            <div className="space-y-4">
              {question.choices?.map((choice) => (
                <ChoiceRow key={choice.id} choice={choice} />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-(--color-border-secondary) pt-5">
          <Link
            href={typeHref}
            className="cursor-pointer text-[.9375rem] font-medium text-(--color-brand-primary) transition hover:opacity-80"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => dispatch(removeQuestion(question.id))}
            className="cursor-pointer text-[.9375rem] font-medium text-(--color-text-error) transition hover:opacity-80"
          >
            Remove From Exam
          </button>
        </div>
      </div>
    </article>
  );
}
