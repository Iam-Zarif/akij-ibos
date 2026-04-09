"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FiCheckSquare, FiCircle, FiPlus, FiTrash2 } from "react-icons/fi";

import { RichTextEditor } from "@/features/online-test/components/rich-text-editor";
import type {
  ChoiceOption,
  PreviewQuestion,
  QuestionVariant,
} from "@/features/online-test/types/question.types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { upsertQuestion } from "@/store/slices/online-test-slice";

const questionTypeLabelMap: Record<QuestionVariant, string> = {
  checkbox: "Checkbox",
  radio: "Bullet",
  manual: "Text",
};

const defaultChoiceOptions = [
  { id: "A", isCorrect: false },
  { id: "B", isCorrect: false },
  { id: "C", isCorrect: false },
];

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toEditorHtml(value: string) {
  return value ? `<p>${value}</p>` : "<p></p>";
}

function ChoiceIndicator({ label }: { label: string }) {
  return (
    <span className="inline-flex size-5.5 items-center justify-center rounded-full border border-[#c9d0dc] text-[.8125rem] font-medium text-[#7b8798]">
      {label}
    </span>
  );
}

export function QuestionModal({
  type,
  questionId,
}: {
  type: QuestionVariant;
  questionId?: string;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const savedQuestions = useAppSelector(
    (state) => state.onlineTest.savedQuestions,
  );
  const savedQuestion = savedQuestions.find(
    (question) => question.id === questionId,
  );
  const [questionType, setQuestionType] = useState<QuestionVariant>(
    savedQuestion?.type ?? type,
  );
  const questionNumber = useMemo(() => {
    if (savedQuestion) {
      return (
        savedQuestions.findIndex(
          (question) => question.id === savedQuestion.id,
        ) + 1
      );
    }

    return savedQuestions.length + 1;
  }, [savedQuestion, savedQuestions]);
  const [editorContent, setEditorContent] = useState<Record<string, string>>(
    () => {
      if (!savedQuestion) {
        return {
          question: "<p></p>",
          "option-A": "<p></p>",
          "option-B": "<p></p>",
          "option-C": "<p></p>",
        };
      }

      const nextContent: Record<string, string> = {
        question: toEditorHtml(savedQuestion.prompt),
      };

      if (savedQuestion.type === "manual") {
        nextContent["option-A"] = toEditorHtml(savedQuestion.answerText ?? "");
        return nextContent;
      }

      savedQuestion.choices?.forEach((choice, index) => {
        const optionLabel =
          choice.label.replace(".", "") || String.fromCharCode(65 + index);
        nextContent[`option-${optionLabel}`] = toEditorHtml(choice.text);
      });

      return nextContent;
    },
  );
  const [options, setOptions] = useState(() => {
    if (savedQuestion?.type === "manual") {
      return [{ id: "A", isCorrect: false }];
    }

    if (savedQuestion?.choices?.length) {
      return savedQuestion.choices.map((choice, index) => ({
        id: choice.label.replace(".", "") || String.fromCharCode(65 + index),
        isCorrect: Boolean(choice.isCorrect),
      }));
    }

    return defaultChoiceOptions;
  });

  const isManual = questionType === "manual";

  const handleEditorChange = (editorId: string, value: string) => {
    setEditorContent((current) => ({
      ...current,
      [editorId]: value,
    }));
  };

  const handleToggleCorrect = (optionId: string) => {
    setOptions((current) =>
      current.map((option) => {
        if (questionType === "radio") {
          return {
            ...option,
            isCorrect: option.id === optionId,
          };
        }

        if (option.id !== optionId) {
          return option;
        }

        return {
          ...option,
          isCorrect: !option.isCorrect,
        };
      }),
    );
  };

  const handleAddOption = () => {
    const nextLabel = String.fromCharCode(65 + options.length);

    setOptions((current) => [
      ...current,
      {
        id: nextLabel,
        isCorrect: false,
      },
    ]);
    setEditorContent((current) => ({
      ...current,
      [`option-${nextLabel}`]: "<p></p>",
    }));
  };

  const handleRemoveOption = (optionId: string) => {
    setOptions((current) => current.filter((option) => option.id !== optionId));
    setEditorContent((current) => {
      const nextState = { ...current };
      delete nextState[`option-${optionId}`];
      return nextState;
    });
  };

  const buildSavedChoices = (): ChoiceOption[] =>
    options.map((option, index) => ({
      id: `${questionId ?? `question-${questionNumber}`}-${option.id.toLowerCase()}`,
      label: `${option.id}.`,
      text:
        stripHtml(editorContent[`option-${option.id}`] ?? "") ||
        `Option ${String.fromCharCode(65 + index)}`,
      isCorrect: option.isCorrect,
    }));

  const handleSave = (shouldAddMore: boolean) => {
    const nextQuestionId = questionId ?? `question-${Date.now()}`;
    const nextQuestion: PreviewQuestion = {
      id: nextQuestionId,
      type: questionType,
      score: questionType === "manual" ? "5 pt" : "1 pt",
      title: `Question ${questionNumber}`,
      prompt: stripHtml(editorContent.question) || "Untitled question",
      ...(questionType === "manual"
        ? {
            answerText: stripHtml(editorContent["option-A"] ?? ""),
          }
        : {
            choices: buildSavedChoices(),
          }),
    };

    dispatch(upsertQuestion(nextQuestion));
    router.push(
      shouldAddMore
        ? `/online-test/questions?modal=true&type=${questionType}`
        : "/online-test/questions/preview",
    );
  };

  const handleQuestionTypeChange = (value: QuestionVariant) => {
    setQuestionType(value);
    setOptions((current) => {
      if (value === "manual") {
        return [{ id: "A", isCorrect: false }];
      }

      if (current.length >= 3) {
        return current;
      }

      const nextOptions = [...current];

      while (nextOptions.length < 3) {
        nextOptions.push({
          id: String.fromCharCode(65 + nextOptions.length),
          isCorrect: false,
        });
      }

      return nextOptions;
    });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-y-auto bg-[rgba(45,51,64,0.42)] px-4 py-6 sm:px-6">
      <div className="w-full max-w-162.5 rounded-[1.125rem] bg-white shadow-[0_1.5rem_4rem_rgba(15,23,42,0.22)]">
        <div className="flex items-center justify-between gap-4 px-6 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex size-5.5 items-center justify-center rounded-full border border-[#d6dce7] text-[.8125rem] font-medium text-[#7b8798]">
              {questionNumber}
            </span>
            <h3 className="text-xl font-semibold text-[#425069]">
              Question {questionNumber}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-[#4d5970]">
              <span>Score:</span>
              <span className="inline-flex h-7.5 min-w-11 items-center justify-center rounded-[.5625rem] border border-[#e3e7ef] px-3 text-[.8125rem] text-[#7b8798]">
                {isManual ? "5" : "1"}
              </span>
            </div>

            <select
              value={questionType}
              onChange={(event) =>
                handleQuestionTypeChange(event.target.value as QuestionVariant)
              }
              className="inline-flex h-7.5 cursor-pointer appearance-none rounded-[.5625rem] border border-[#e3e7ef] px-3 text-[.8125rem] text-[#4d5970] outline-none"
            >
              <option value="manual">{questionTypeLabelMap.manual}</option>
              <option value="checkbox">{questionTypeLabelMap.checkbox}</option>
              <option value="radio">{questionTypeLabelMap.radio}</option>
            </select>

            <button
              type="button"
              onClick={() => router.push("/online-test/questions")}
              className="cursor-pointer text-[#7b8798] transition hover:text-[#425069]"
            >
              <FiTrash2 className="size-4.5" />
            </button>
          </div>
        </div>

        <div className="space-y-4 px-6 pb-5">
          <RichTextEditor
            value={editorContent.question}
            placeholder="Type question here..."
            onChange={(value) => handleEditorChange("question", value)}
          />

          {isManual ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-[#7b8798]">
                  <ChoiceIndicator label="A" />
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/online-test/questions")}
                  className="cursor-pointer text-[#7b8798] transition hover:text-[#425069]"
                >
                  <FiTrash2 className="size-4.25" />
                </button>
              </div>

              <RichTextEditor
                value={editorContent["option-A"] ?? ""}
                placeholder="Type answer here..."
                onChange={(value) => handleEditorChange("option-A", value)}
              />
            </div>
          ) : (
            <>
              {options.map((choice) => (
                <div key={choice.id} className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-[#7b8798]">
                      <ChoiceIndicator label={choice.id} />
                      <button
                        type="button"
                        onClick={() => handleToggleCorrect(choice.id)}
                        className="inline-flex cursor-pointer items-center text-[#b9c0cc]"
                      >
                        {questionType === "checkbox" ? (
                          <FiCheckSquare
                            className={`size-4.5 ${
                              choice.isCorrect ? "text-[#6938ef]" : ""
                            }`}
                          />
                        ) : (
                          <FiCircle
                            className={`size-4.5 ${
                              choice.isCorrect ? "text-[#6938ef]" : ""
                            }`}
                          />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleCorrect(choice.id)}
                        className="cursor-pointer"
                      >
                        Set as correct answer
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveOption(choice.id)}
                      className="cursor-pointer text-[#7b8798] transition hover:text-[#425069]"
                    >
                      <FiTrash2 className="size-4.25" />
                    </button>
                  </div>

                  <RichTextEditor
                    value={editorContent[`option-${choice.id}`] ?? ""}
                    placeholder="Type option here..."
                    onChange={(value) =>
                      handleEditorChange(`option-${choice.id}`, value)
                    }
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddOption}
                className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[#6f3ff5] transition hover:opacity-80"
              >
                <FiPlus className="size-4" />
                Another options
              </button>
            </>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-[#edf1f6] pt-4">
            <button
              type="button"
              onClick={() => handleSave(false)}
              className="inline-flex h-8.5 cursor-pointer items-center justify-center rounded-lg border border-[#8b5cff] px-10 text-sm font-semibold text-[#7a49ff] transition hover:bg-[#f7f2ff]"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => handleSave(true)}
              className="inline-flex h-8.5 cursor-pointer items-center justify-center rounded-lg bg-[linear-gradient(90deg,#5f2eea_0%,#7b3ff6_100%)] px-8 text-sm font-semibold text-white shadow-[0_.625rem_1.5rem_rgba(95,46,234,0.18)] transition hover:opacity-95"
            >
              Save &amp; Add More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
