import Link from "next/link";
import { FiCheck } from "react-icons/fi";

type ManageOnlineTestStepperProps = {
  backHref: string;
  basicInfoState?: "active" | "complete";
  questionsState?: "pending" | "active" | "complete";
};

export function ManageOnlineTestStepper({
  backHref,
  basicInfoState = "active",
  questionsState = "pending",
}: ManageOnlineTestStepperProps) {
  const renderStepIcon = (
    value: number,
    state: "active" | "complete" | "pending",
  ) => {
    if (state === "complete") {
      return <FiCheck className="size-3.5" />;
    }

    return value;
  };

  const getStepCircleClassName = (state: "active" | "complete" | "pending") => {
    if (state === "pending") {
      return "bg-(--color-step-pending) text-white";
    }

    return "bg-(--color-brand-strong) text-white";
  };

  const getStepTextClassName = (state: "active" | "complete" | "pending") => {
    if (state === "pending") {
      return "text-(--color-text-subtle)";
    }

    return "text-(--color-text-heading)";
  };

  return (
    <section className="rounded-[1.125rem] border border-(--color-border-card) bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-7">
          <h2 className="text-xl font-semibold text-(--color-text-heading)">
            Manage Online Test
          </h2>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span
                className={`flex size-6 items-center justify-center rounded-full text-[.8125rem] font-semibold ${getStepCircleClassName(
                  basicInfoState,
                )}`}
              >
                {renderStepIcon(1, basicInfoState)}
              </span>
              <span
                className={`font-medium ${getStepTextClassName(basicInfoState)}`}
              >
                Basic Info
              </span>
            </div>

            <span className="h-px w-20.5 bg-(--color-text-dark)" />

            <div className="flex items-center gap-2">
              <span
                className={`flex size-6 items-center justify-center rounded-full text-[.8125rem] font-semibold ${getStepCircleClassName(
                  questionsState,
                )}`}
              >
                {renderStepIcon(2, questionsState)}
              </span>
              <span
                className={`font-medium ${getStepTextClassName(questionsState)}`}
              >
                Questions Sets
              </span>
            </div>
          </div>
        </div>

        <Link
          href={backHref}
          className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl border border-(--color-border-soft) px-6 text-sm font-semibold text-(--color-text-control) transition hover:bg-(--color-hover-surface)"
        >
          Back to Dashboard
        </Link>
      </div>
    </section>
  );
}
