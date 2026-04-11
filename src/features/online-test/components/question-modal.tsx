"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FiCheckSquare, FiCircle, FiPlus, FiTrash2 } from "react-icons/fi";

import { RichTextEditor } from "@/features/online-test/components/rich-text-editor";
import { saveOnlineTestQuestion } from "@/features/online-test/services/online-test.service";
import type {
  ChoiceOption,
  PreviewQuestion,
  QuestionVariant,
} from "@/features/online-test/types/question.types";
import { getButtonClassName } from "@/components/ui/app-button";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentOnlineTest } from "@/store/slices/online-test-slice";

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

function getInitialEditorContent(savedQuestion?: PreviewQuestion) {
  if (!savedQuestion) {
    return {
      question: "<p></p>",
      "option-B": "<p></p>",
      "option-C": "<p></p>",
    };
  }

  const nextContent: Record<string, string> = {
    question: toEditorHtml(savedQuestion.prompt),
  };

  savedQuestion.choices?.forEach((choice, index) => {
    const optionLabel =
      choice.label.replace(".", "") || String.fromCharCode(65 + index);
    nextContent[`option-${optionLabel}`] = toEditorHtml(choice.text);
  });

  return nextContent;
}

function getInitialOptions(savedQuestion?: PreviewQuestion) {
  if (savedQuestion?.type === "manual") {
    return [];
  }

  if (savedQuestion?.choices?.length) {
    return savedQuestion.choices.map((choice, index) => ({
      id: choice.label.replace(".", "") || String.fromCharCode(65 + index),
      isCorrect: Boolean(choice.isCorrect),
    }));
  }

  return defaultChoiceOptions;
}

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
    <span className="inline-flex size-5.5 items-center justify-center rounded-full border border-(--color-border-option) text-xs font-medium text-(--color-text-subtle)">
      {label}
    </span>
  );
}

export function QuestionModal({
  type,
  testId,
  questionId,
}: {
  type: QuestionVariant;
  testId?: string;
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
    () => getInitialEditorContent(savedQuestion),
  );
  const [options, setOptions] = useState(() =>
    getInitialOptions(savedQuestion),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const getQuestionPrompt = () => stripHtml(editorContent.question);
  const getChoiceTexts = () =>
    options.map((option) => ({
      id: option.id,
      text: stripHtml(editorContent[`option-${option.id}`] ?? ""),
      isCorrect: option.isCorrect,
    }));

  const buildSavedChoices = (): ChoiceOption[] =>
    options.map((option) => ({
      id: `${questionId ?? `question-${questionNumber}`}-${option.id.toLowerCase()}`,
      label: `${option.id}.`,
      text: stripHtml(editorContent[`option-${option.id}`] ?? ""),
      isCorrect: option.isCorrect,
    }));

  const resetDraft = (nextQuestionType: QuestionVariant) => {
    setQuestionType(nextQuestionType);
    setErrorMessage("");
    setEditorContent(
      nextQuestionType === "manual"
        ? {
            question: "<p></p>",
          }
        : {
            question: "<p></p>",
            "option-A": "<p></p>",
            "option-B": "<p></p>",
            "option-C": "<p></p>",
          },
    );
    setOptions(
      nextQuestionType === "manual"
        ? []
        : defaultChoiceOptions.map((option) => ({ ...option })),
    );
  };

  const handleSave = async (shouldAddMore: boolean) => {
    if (!testId) {
      setErrorMessage("Test id is missing.");
      return;
    }

    const prompt = getQuestionPrompt();

    if (!prompt) {
      setErrorMessage("Question title is required.");
      return;
    }

    if (questionType !== "manual") {
      const choiceTexts = getChoiceTexts();

      if (choiceTexts.some((choice) => !choice.text)) {
        setErrorMessage("All options must have text.");
        return;
      }

      if (!choiceTexts.some((choice) => choice.isCorrect)) {
        setErrorMessage("Select at least one correct answer.");
        return;
      }
    }

    const nextQuestionId = questionId ?? `question-${Date.now()}`;
    const nextQuestion: PreviewQuestion = {
      id: nextQuestionId,
      type: questionType,
      score: questionType === "manual" ? "5 pt" : "1 pt",
      title: `Question ${questionNumber}`,
      prompt,
      ...(questionType === "manual"
        ? {}
        : {
            choices: buildSavedChoices(),
          }),
    };

    setIsSaving(true);
    setErrorMessage("");

    try {
      const updatedTest = await saveOnlineTestQuestion(testId, nextQuestion);
      dispatch(setCurrentOnlineTest(updatedTest));

      if (shouldAddMore) {
        resetDraft(questionType);
        router.replace(
          `/online-test/questions?testId=${testId}&modal=true&type=${questionType}`,
        );
        return;
      }

      router.push(`/online-test/questions/preview?testId=${testId}`);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Failed to save question."));
    } finally {
      setIsSaving(false);
    }
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
    <div className="fixed inset-0 z-9999 overflow-y-auto bg-(--color-overlay)">
      <div className="flex min-h-full items-start justify-center px-4 pt-12 pb-6 sm:px-6">
        <div className="max-h-[90vh] w-full max-w-162.5 overflow-y-auto rounded-[1.125rem] bg-white shadow-(--shadow-modal)">
          <div className="flex items-center justify-between gap-4 px-7 pt-5 pb-4">
            <div className="flex items-center gap-2">
              <span className="flex size-5.5 items-center justify-center rounded-full border border-(--color-border-question) text-xs font-medium text-(--color-text-subtle)">
                {questionNumber}
              </span>
              <h3 className="text-xl font-semibold text-(--color-text-heading)">
                Question {questionNumber}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-(--color-text-control)">
                <span>Score:</span>
                <span className="inline-flex h-7.5 min-w-11 items-center justify-center rounded-[.5625rem] border border-(--color-border-score) px-3 text-xs text-(--color-text-subtle)">
                  {isManual ? "5" : "1"}
                </span>
              </div>

              <select
                value={questionType}
                onChange={(event) =>
                  handleQuestionTypeChange(
                    event.target.value as QuestionVariant,
                  )
                }
                className="inline-flex h-7.5 cursor-pointer appearance-none rounded-[.5625rem] border border-(--color-border-score) px-3 text-xs text-(--color-text-control) outline-none"
              >
                <option value="manual">{questionTypeLabelMap.manual}</option>
                <option value="checkbox">
                  {questionTypeLabelMap.checkbox}
                </option>
                <option value="radio">{questionTypeLabelMap.radio}</option>
              </select>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    testId
                      ? `/online-test/questions?testId=${testId}`
                      : "/online-test/questions",
                  )
                }
                className="cursor-pointer text-(--color-text-subtle) transition hover:text-(--color-text-heading)"
              >
                <FiTrash2 className="size-4.5" />
              </button>
            </div>
          </div>

          <div className="space-y-4 px-6 pb-5">
            <RichTextEditor
              value={editorContent.question}
              placeholder="Type question here..."
              onValueChangeAction={(value) =>
                handleEditorChange("question", value)
              }
            />

            {errorMessage ? (
              <div className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white">
                {errorMessage}
              </div>
            ) : null}

            {isManual ? null : (
              <div className="space-y-4 px-4">
                {options.map((choice) => (
                  <div key={choice.id} className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-sm text-(--color-text-subtle)">
                        <ChoiceIndicator label={choice.id} />
                        <button
                          type="button"
                          onClick={() => handleToggleCorrect(choice.id)}
                          className="inline-flex cursor-pointer items-center text-(--color-icon-choice)"
                        >
                          {questionType === "checkbox" ? (
                            <FiCheckSquare
                              className={`size-4.5 ${
                                choice.isCorrect
                                  ? "text-(--color-brand-strong)"
                                  : ""
                              }`}
                            />
                          ) : (
                            <FiCircle
                              className={`size-4.5 ${
                                choice.isCorrect
                                  ? "text-(--color-brand-strong)"
                                  : ""
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
                        className="cursor-pointer text-(--color-text-subtle) transition hover:text-(--color-text-heading)"
                      >
                        <FiTrash2 className="size-4.25" />
                      </button>
                    </div>

                    <RichTextEditor
                      value={editorContent[`option-${choice.id}`] ?? ""}
                      placeholder="Type option here..."
                      onValueChangeAction={(value) =>
                        handleEditorChange(`option-${choice.id}`, value)
                      }
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddOption}
                  className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-(--color-brand-primary) transition hover:opacity-80"
                >
                  <FiPlus className="size-4" />
                  Another options
                </button>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 border-t border-(--color-border-secondary) pt-4">
              <button
                type="button"
                onClick={() => handleSave(false)}
                disabled={isSaving}
                className={getButtonClassName({
                  variant: "outline",
                  className: "h-8.5 rounded-lg px-10 text-(--color-brand-text)",
                })}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className={getButtonClassName({
                  className:
                    "h-8.5 rounded-lg px-8 shadow-[0_.625rem_1.5rem_rgba(95,46,234,0.18)]",
                })}
              >
                {isSaving ? "Saving..." : "Save & Add More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
