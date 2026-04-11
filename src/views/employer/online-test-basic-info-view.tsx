"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { BasicInfoForm } from "@/features/online-test/components/basic-info-form";
import { ManageOnlineTestStepper } from "@/features/online-test/components/manage-online-test-stepper";
import {
  createOnlineTest,
  updateOnlineTestBasicInfo,
} from "@/features/online-test/services/online-test.service";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  resetOnlineTestDraft,
  setCurrentOnlineTest,
} from "@/store/slices/online-test-slice";

type OnlineTestBasicInfoViewProps = {
  testId?: string;
};

export function OnlineTestBasicInfoView({
  testId,
}: OnlineTestBasicInfoViewProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { basicInfoDraft, currentTestId } = useAppSelector(
    (state) => state.onlineTest,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (testId) {
      return;
    }

    dispatch(resetOnlineTestDraft());
  }, [dispatch, testId]);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage("");

    try {
      const nextTest = currentTestId
        ? await updateOnlineTestBasicInfo(currentTestId, basicInfoDraft)
        : await createOnlineTest(basicInfoDraft);

      dispatch(setCurrentOnlineTest(nextTest));
      router.push(`/online-test/create/view?testId=${nextTest.id}`);
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, "Failed to save basic information."),
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col px-4 py-7 sm:px-6 sm:py-9 lg:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <ManageOnlineTestStepper backHref="/dashboard" />

        <BasicInfoForm />

        {errorMessage ? (
          <div className="mx-auto w-full max-w-239 rounded-[1.125rem] bg-red-600 px-5 py-4 text-sm text-white shadow-(--shadow-card) sm:px-7 lg:px-8">
            {errorMessage}
          </div>
        ) : null}

        <section className="mx-auto flex w-full max-w-239 flex-col gap-4 rounded-[1.125rem] bg-white px-5 py-6 shadow-(--shadow-card) sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
          <button
            type="button"
            className="inline-flex h-11.5 cursor-pointer items-center justify-center rounded-xl border border-(--color-border-soft) px-16 text-sm font-semibold text-(--color-text-control) transition hover:bg-(--color-hover-surface)"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex h-11.5 cursor-pointer items-center justify-center rounded-xl bg-(image:--gradient-brand) px-8 text-sm font-semibold text-white shadow-(--shadow-brand) transition hover:opacity-95"
          >
            {isSaving ? "Saving..." : "Save & Continue"}
          </button>
        </section>
      </div>
    </main>
  );
}
