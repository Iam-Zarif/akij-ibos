import { OnlineTestQuestionsView } from "@/views/recruiter/online-test-questions-view";
import type { QuestionVariant } from "@/features/online-test/types/question.types";

const allowedQuestionTypes: QuestionVariant[] = ["checkbox", "radio", "manual"];

function getQuestionType(
  value: string | string[] | undefined,
): QuestionVariant {
  const normalizedValue = Array.isArray(value) ? value[0] : value;

  if (
    normalizedValue &&
    allowedQuestionTypes.includes(normalizedValue as QuestionVariant)
  ) {
    return normalizedValue as QuestionVariant;
  }

  return "checkbox";
}

export default async function OnlineTestQuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <OnlineTestQuestionsView
      isModalOpen={resolvedSearchParams.modal === "true"}
      questionType={getQuestionType(resolvedSearchParams.type)}
      questionId={
        Array.isArray(resolvedSearchParams.id)
          ? resolvedSearchParams.id[0]
          : resolvedSearchParams.id
      }
    />
  );
}
