import { AssessmentView } from "@/views/developer/assessment-view";

type AssessmentPageProps = {
  params: Promise<{
    testId: string;
  }>;
  searchParams: Promise<{
    question?: string;
    secondsLeft?: string;
    status?: string;
  }>;
};

export default async function AssessmentPage({
  params,
  searchParams,
}: AssessmentPageProps) {
  const { testId } = await params;
  const resolvedSearchParams = await searchParams;
  const initialQuestionNumber = Number(resolvedSearchParams.question || "1");
  const rawSecondsLeft = resolvedSearchParams.secondsLeft;
  const initialSecondsLeft =
    typeof rawSecondsLeft === "string" ? Number(rawSecondsLeft) : undefined;

  return (
    <AssessmentView
      initialQuestionNumber={
        Number.isNaN(initialQuestionNumber) ? 1 : initialQuestionNumber
      }
      initialSecondsLeft={
        initialSecondsLeft !== undefined && !Number.isNaN(initialSecondsLeft)
          ? initialSecondsLeft
          : undefined
      }
      initialStatus={resolvedSearchParams.status}
      testId={testId}
    />
  );
}
