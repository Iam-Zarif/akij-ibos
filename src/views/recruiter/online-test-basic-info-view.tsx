import Link from "next/link";

import { BasicInfoForm } from "@/features/online-test/components/basic-info-form";
import { ManageOnlineTestStepper } from "@/features/online-test/components/manage-online-test-stepper";

export function OnlineTestBasicInfoView() {
  return (
    <main className="flex flex-1 flex-col px-4 py-7 sm:px-6 sm:py-9 lg:px-10">
      <div className="mx-auto w-full max-w-340 space-y-8">
        <ManageOnlineTestStepper backHref="/dashboard" />

        <BasicInfoForm />

        <section className="mx-auto flex w-full max-w-239 flex-col gap-4 rounded-[1.125rem] bg-white px-5 py-6 shadow-[0_.375rem_1.375rem_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
          <button
            type="button"
            className="inline-flex h-11.5 cursor-pointer items-center justify-center rounded-xl border border-[#d7ddea] px-16 text-[.9375rem] font-semibold text-[#4d5970] transition hover:bg-[#f8f9fc]"
          >
            Cancel
          </button>

          <Link
            href="/online-test/create/view"
            className="inline-flex h-11.5 cursor-pointer items-center justify-center rounded-xl bg-[linear-gradient(90deg,#5f2eea_0%,#7b3ff6_100%)] px-8 text-[.9375rem] font-semibold text-white shadow-[0_.75rem_1.5rem_rgba(95,46,234,0.18)] transition hover:opacity-95"
          >
            Save &amp; Continue
          </Link>
        </section>
      </div>
    </main>
  );
}
