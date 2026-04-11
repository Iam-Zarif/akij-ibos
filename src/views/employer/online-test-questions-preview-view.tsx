"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useOnlineTestDetail } from "@/features/online-test/hooks/use-online-test-detail";
import { QuestionPreviewCard } from "@/features/online-test/components/question-preview-card";
import { ManageOnlineTestStepper } from "@/features/online-test/components/manage-online-test-stepper";
import { publishOnlineTest } from "@/features/online-test/services/online-test.service";
import { getButtonClassName } from "@/components/ui/app-button";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { useAppSelector } from "@/store/hooks";

export function OnlineTestQuestionsPreviewView({
  testId,
}: {
  testId?: string;
}) {
  const router = useRouter();
  const { isLoading, errorMessage } = useOnlineTestDetail(testId);
  const savedQuestions = useAppSelector(
    (state) => state.onlineTest.savedQuestions,
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishErrorMessage, setPublishErrorMessage] = useState("");

  const handlePublish = async () => {
    if (!testId) {
      setPublishErrorMessage("Test id is missing.");
      return;
    }

    setIsPublishing(true);
    setPublishErrorMessage("");

    try {
      await publishOnlineTest(testId);
      router.push("/dashboard");
    } catch (error) {
      setPublishErrorMessage(
        getApiErrorMessage(error, "Failed to post online test."),
      );
    } finally {
      setIsPublishing(false);
    }
  };

  return (
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

        <div className="space-y-7">
          {savedQuestions.map((question) => (
            <QuestionPreviewCard
              key={question.id}
              question={question}
              testId={testId}
            />
          ))}

          {publishErrorMessage ? (
            <div className="mx-auto w-full max-w-239 rounded-[1.125rem] bg-red-600 px-5 py-4 text-sm text-white shadow-(--shadow-card) sm:px-7 lg:px-8">
              {publishErrorMessage}
            </div>
          ) : null}

          <section className="mx-auto flex w-full max-w-239 flex-col rounded-[1.125rem] bg-white px-5 py-6 shadow-(--shadow-card) sm:px-7 lg:px-8">
            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing || savedQuestions.length === 0}
              className={getButtonClassName()}
            >
              {isPublishing ? "Posting..." : "Post Online Test"}
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
