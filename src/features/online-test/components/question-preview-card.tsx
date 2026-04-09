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
    <span className="inline-flex h-7.5 items-center justify-center rounded-xl border border-[#dfe3eb] px-3 text-sm text-[#7a8598]">
      {label}
    </span>
  );
}

function ScoreBadge({ score }: { score: string }) {
  return (
    <span className="inline-flex h-7.5 items-center justify-center rounded-xl border border-[#dfe3eb] px-3 text-sm text-[#7a8598]">
      {score}
    </span>
  );
}

function ChoiceRow({ choice }: { choice: ChoiceOption }) {
  const isCorrect = Boolean(choice.isCorrect);

  return (
    <div
      className={`flex min-h-12 items-center justify-between rounded-[.6875rem] px-4 text-[.9375rem] text-[#445168] ${
        isCorrect ? "bg-[#f3f4f7]" : ""
      }`}
    >
      <span>
        {choice.label} {choice.text}
      </span>
      {isCorrect ? (
        <span className="inline-flex size-5.5 items-center justify-center rounded-full bg-[#2fc160] text-white">
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
    <article className="mx-auto w-full max-w-239 rounded-[1.125rem] bg-white px-5 py-6 shadow-[0_.375rem_1.375rem_rgba(15,23,42,0.04)] sm:px-7 sm:py-7 lg:px-8">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-[#edf1f6] pb-5">
          <h3 className="text-lg font-semibold text-[#425069]">
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
            <p className="max-w-215 text-sm leading-[1.75] text-[#445168]">
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

        <div className="flex items-center justify-between gap-4 border-t border-[#edf1f6] pt-5">
          <Link
            href={typeHref}
            className="cursor-pointer text-[.9375rem] font-medium text-[#6f3ff5] transition hover:opacity-80"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={() => dispatch(removeQuestion(question.id))}
            className="cursor-pointer text-[.9375rem] font-medium text-[#ff5a5a] transition hover:opacity-80"
          >
            Remove From Exam
          </button>
        </div>
      </div>
    </article>
  );
}
