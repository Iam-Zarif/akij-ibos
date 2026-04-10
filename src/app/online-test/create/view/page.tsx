import { OnlineTestBasicInfoSummaryView } from "@/views/employer/online-test-basic-info-summary-view";

export default async function OnlineTestCreateViewPage({
  searchParams,
}: {
  searchParams: Promise<{ testId?: string | string[] }>;
}) {
  const resolvedSearchParams = await searchParams;
  const testId = Array.isArray(resolvedSearchParams.testId)
    ? resolvedSearchParams.testId[0]
    : resolvedSearchParams.testId;

  return <OnlineTestBasicInfoSummaryView testId={testId} />;
}
