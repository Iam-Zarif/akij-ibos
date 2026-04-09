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
      return "bg-[#d4d9e3] text-white";
    }

    return "bg-[#6938ef] text-white";
  };

  const getStepTextClassName = (state: "active" | "complete" | "pending") => {
    if (state === "pending") {
      return "text-[#7a8598]";
    }

    return "text-[#425069]";
  };

  return (
    <section className="rounded-[1.125rem] border border-[#dfe3eb] bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-7">
          <h2 className="text-xl font-semibold text-[#425069]">
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

            <span className="h-px w-20.5 bg-[#4f5b72]" />

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
          className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl border border-[#d7ddea] px-6 text-sm font-semibold text-[#4d5970] transition hover:bg-[#f8f9fc]"
        >
          Back to Dashboard
        </Link>
      </div>
    </section>
  );
}
