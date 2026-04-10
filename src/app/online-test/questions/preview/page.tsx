import { OnlineTestQuestionsPreviewView } from "@/views/employer/online-test-questions-preview-view";

export default async function OnlineTestQuestionsPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ testId?: string | string[] }>;
}) {
  const resolvedSearchParams = await searchParams;
  const testId = Array.isArray(resolvedSearchParams.testId)
    ? resolvedSearchParams.testId[0]
    : resolvedSearchParams.testId;

  return <OnlineTestQuestionsPreviewView testId={testId} />;
}
