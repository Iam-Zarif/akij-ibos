import { OnlineTestBasicInfoView } from "@/views/employer/online-test-basic-info-view";

type OnlineTestCreatePageProps = {
  searchParams?: Promise<{
    testId?: string;
  }>;
};

export default async function OnlineTestCreatePage({
  searchParams,
}: OnlineTestCreatePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return <OnlineTestBasicInfoView testId={resolvedSearchParams?.testId} />;
}
