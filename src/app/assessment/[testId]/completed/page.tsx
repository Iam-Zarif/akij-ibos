import { AssessmentCompletedView } from "@/views/candidate/assessment-completed-view";

type AssessmentCompletedPageProps = {
  params: Promise<{
    testId: string;
  }>;
};

export default async function AssessmentCompletedPage({
  params,
}: AssessmentCompletedPageProps) {
  const { testId } = await params;

  return <AssessmentCompletedView testId={testId} />;
}
