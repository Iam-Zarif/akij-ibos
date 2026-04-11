"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AssessmentOptionItem } from "@/features/assessment/components/assessment-option-item";
import { AssessmentTimeoutModal } from "@/features/assessment/components/assessment-timeout-modal";
import { RichTextEditor } from "@/features/online-test/components/rich-text-editor";
import { useOnlineTestDetail } from "@/features/online-test/hooks/use-online-test-detail";
import { getButtonClassName } from "@/components/ui/app-button";
import type {
  ChoiceOption,
  PreviewQuestion,
} from "@/features/online-test/types/question.types";
import { useAppSelector } from "@/store/hooks";

type AssessmentViewProps = {
  testId: string;
  initialQuestionNumber: number;
  initialSecondsLeft?: number;
  initialStatus?: string;
};

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatSeconds(secondsLeft: number) {
  const minutes = Math.max(0, Math.floor(secondsLeft / 60));
  const seconds = Math.max(0, secondsLeft % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} left`;
}

function getPromptText(question?: PreviewQuestion) {
  if (!question) {
    return "";
  }

  return stripHtml(question.prompt || question.answerText || "");
}

type AssessmentSessionProps = {
  testId: string;
  question: PreviewQuestion;
  questionNumber: number;
  totalQuestions: number;
  initialSecondsLeft: number;
  isTimedOut: boolean;
  userName: string;
};

function AssessmentSession({
  testId,
  question,
  questionNumber,
  totalQuestions,
  initialSecondsLeft,
  isTimedOut,
  userName,
}: AssessmentSessionProps) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(initialSecondsLeft);
  const [manualAnswer, setManualAnswer] = useState("<p></p>");
  const [selectedRadio, setSelectedRadio] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [warningMessage, setWarningMessage] = useState("");
  const isLastQuestion = questionNumber >= totalQuestions;
  const hasAnsweredQuestion =
    question.type === "manual"
      ? stripHtml(manualAnswer).length > 0
      : question.type === "radio"
        ? selectedRadio.length > 0
        : selectedCheckboxes.length > 0;

  useEffect(() => {
    if (isTimedOut) {
      return;
    }

    if (secondsLeft <= 0) {
      router.replace(
        `/assessment/${testId}?question=${questionNumber}&secondsLeft=0&status=timeout`,
      );
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((currentValue) => currentValue - 1);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [isTimedOut, questionNumber, router, secondsLeft, testId]);

  useEffect(() => {
    if (isTimedOut) {
      return;
    }

    const clearWarning = window.setTimeout(() => {
      setWarningMessage("");
    }, 3000);

    return () => {
      window.clearTimeout(clearWarning);
    };
  }, [isTimedOut, warningMessage]);

  useEffect(() => {
    if (isTimedOut) {
      return;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "hidden") {
        return;
      }

      setWarningMessage("Tab switch detected.");
    };

    const handleFullscreenChange = () => {
      if (document.fullscreenElement !== null) {
        return;
      }

      setWarningMessage("Fullscreen exit detected.");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isTimedOut]);

  function navigateToQuestion(nextQuestionNumber: number) {
    router.push(
      `/assessment/${testId}?question=${nextQuestionNumber}&secondsLeft=${secondsLeft}`,
    );
  }

  function moveToNextQuestion() {
    if (questionNumber >= totalQuestions) {
      router.push(`/assessment/${testId}/completed`);
      return;
    }

    navigateToQuestion(questionNumber + 1);
  }

  function handleSaveAndContinue() {
    if (!hasAnsweredQuestion) {
      return;
    }

    moveToNextQuestion();
  }

  function handleSkipQuestion() {
    moveToNextQuestion();
  }

  function renderQuestionBody() {
    if (question.type === "manual") {
      return (
        <RichTextEditor
          value={manualAnswer}
          onValueChangeAction={setManualAnswer}
          placeholder="Type questions here.."
        />
      );
    }

    return (
      <div className="space-y-4">
        {(question.choices ?? []).map((option: ChoiceOption) => {
          const inputType = question.type === "radio" ? "radio" : "checkbox";
          const isChecked =
            question.type === "radio"
              ? selectedRadio === option.id
              : selectedCheckboxes.includes(option.id);

          return (
            <AssessmentOptionItem
              key={option.id}
              checked={isChecked}
              name={`question-${question.id}`}
              option={option}
              type={inputType}
              onChange={() => {
                if (question.type === "radio") {
                  setSelectedRadio(option.id);
                  return;
                }

                setSelectedCheckboxes((currentValue) =>
                  currentValue.includes(option.id)
                    ? currentValue.filter((value) => value !== option.id)
                    : [...currentValue, option.id],
                );
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <>
      <section className="rounded-[1.375rem] bg-white px-6 py-5 shadow-(--shadow-card) sm:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg leading-none font-semibold text-(--color-text-heading) sm:text-xl">
            Question ({questionNumber}/{totalQuestions})
          </h2>
          <div className="flex sm:items-end">
            <div className="flex h-14 w-full items-center justify-center rounded-[1rem] bg-(--color-hover-surface) px-6 text-lg font-semibold text-(--color-text-heading) sm:w-50 sm:text-xl">
              {formatSeconds(secondsLeft)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative rounded-[1.375rem] bg-white px-5 py-5 shadow-(--shadow-card) sm:px-6 sm:py-6">
        <div className={isTimedOut ? "pointer-events-none opacity-45" : ""}>
          {warningMessage ? (
            <div className="mb-4 rounded-xl bg-red-600 px-4 py-3 text-sm text-white">
              {warningMessage}
            </div>
          ) : null}

          <h3 className="text-lg leading-[1.4] font-semibold text-(--color-text-heading) sm:text-xl">
            {`Q${questionNumber}. ${getPromptText(question)}`}
          </h3>

          <div className="mt-6">{renderQuestionBody()}</div>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleSkipQuestion}
              className={getButtonClassName({
                variant: "outline",
                className: "px-7 text-base",
              })}
            >
              Skip this Question
            </button>
            <button
              type="button"
              onClick={handleSaveAndContinue}
              disabled={!hasAnsweredQuestion}
              className={getButtonClassName({
                className: "px-8 text-base",
              })}
            >
              {isLastQuestion ? "Submit Test" : "Save & Continue"}
            </button>
          </div>
        </div>

        {isTimedOut ? <AssessmentTimeoutModal userName={userName} /> : null}
      </section>
    </>
  );
}

export function AssessmentView({
  testId,
  initialQuestionNumber,
  initialSecondsLeft,
  initialStatus,
}: AssessmentViewProps) {
  const { isLoading, errorMessage } = useOnlineTestDetail(testId);
  const { tests } = useAppSelector((state) => state.onlineTest);
  const activeUser = useAppSelector((state) => state.auth.activeUser);
  const test = useMemo(
    () => tests.find((item) => item.id === testId) ?? null,
    [testId, tests],
  );
  const questions = test?.savedQuestions ?? [];
  const questionIndex = Math.min(
    Math.max(initialQuestionNumber - 1, 0),
    Math.max(questions.length - 1, 0),
  );
  const currentQuestion = questions[questionIndex];
  const isTimedOut = initialStatus === "timeout";
  const currentQuestionNumber = questionIndex + 1;
  const resolvedInitialSeconds =
    initialSecondsLeft ?? (test?.duration ? Number(test.duration) * 60 : null);

  return (
    <main className="flex flex-1 flex-col px-4 py-7 sm:px-6 sm:py-9 lg:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">
        {isLoading ? (
          <div className="rounded-[1.375rem] bg-white px-6 py-8 text-sm text-(--color-text-muted) shadow-(--shadow-card)">
            Loading assessment...
          </div>
        ) : errorMessage ? (
          <div className="rounded-[1.375rem] bg-red-600 px-6 py-8 text-sm text-white shadow-(--shadow-card)">
            {errorMessage}
          </div>
        ) : !currentQuestion ? (
          <div className="rounded-[1.375rem] bg-white px-6 py-10 text-center shadow-(--shadow-card)">
            <p className="text-base font-semibold text-(--color-text-heading) sm:text-lg">
              No question is available for this assessment.
            </p>
            <Link
              href="/dashboard"
              className={getButtonClassName({
                variant: "outline",
                className: "mt-6 px-7 text-base",
              })}
            >
              Back to Dashboard
            </Link>
          </div>
        ) : resolvedInitialSeconds === null ? (
          <div className="rounded-[1.375rem] bg-white px-6 py-8 text-sm text-(--color-text-muted) shadow-(--shadow-card)">
            Loading assessment timer...
          </div>
        ) : (
          <AssessmentSession
            key={`${currentQuestion.id}-${currentQuestionNumber}-${resolvedInitialSeconds}-${initialStatus ?? "active"}`}
            initialSecondsLeft={resolvedInitialSeconds}
            isTimedOut={isTimedOut}
            question={currentQuestion}
            questionNumber={currentQuestionNumber}
            testId={testId}
            totalQuestions={questions.length}
            userName={activeUser?.name || "Candidate"}
          />
        )}
      </div>
    </main>
  );
}
