"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiClock } from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateBasicInfoDraft } from "@/store/slices/online-test-slice";

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-(--color-text-label)">
      {children}
      {required ? <span className="text-(--color-danger-soft)"> *</span> : null}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <input
      type="text"
      inputMode={inputMode}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-12 w-full rounded-lg border border-(--color-border-primary) bg-white px-4 text-[.9375rem] text-(--color-text-heading) outline-none placeholder:text-(--color-placeholder)"
    />
  );
}

function TimePickerField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeOptions = useMemo(() => {
    const options: string[] = [];

    for (let hour = 0; hour < 24; hour += 1) {
      for (let minute = 0; minute < 60; minute += 15) {
        const period = hour >= 12 ? "PM" : "AM";
        const normalizedHour = hour % 12 || 12;
        const normalizedMinute = minute.toString().padStart(2, "0");
        options.push(`${normalizedHour}:${normalizedMinute} ${period}`);
      }
    }

    return options;
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`flex h-12 w-full cursor-pointer items-center rounded-lg border border-(--color-border-primary) bg-white px-4 pr-11 text-left text-[.9375rem] outline-none ${
          value ? "text-(--color-text-heading)" : "text-(--color-placeholder)"
        }`}
      >
        <span>{value || placeholder}</span>
      </button>
      <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-(--color-icon-muted)">
        <FiClock className="size-4.5" />
      </span>

      {isOpen ? (
        <div className="absolute bottom-14 left-0 z-20 w-full overflow-hidden rounded-[.875rem] border border-(--color-border-primary) bg-white shadow-[var(--shadow-popover)]">
          <div className="max-h-55 overflow-y-auto py-2">
            {timeOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center px-4 py-2 text-left text-sm transition hover:bg-(--color-brand-hover) ${
                  value === option
                    ? "bg-(--color-brand-surface) text-(--color-brand-strong)"
                    : "text-(--color-text-heading)"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SelectField({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-12 w-full cursor-pointer appearance-none rounded-lg border border-(--color-border-primary) bg-white px-4 pr-11 text-[.9375rem] outline-none ${
          value ? "text-(--color-text-heading)" : "text-(--color-placeholder)"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-(--color-icon-muted)">
        <FiChevronDown className="size-4.5" />
      </span>
    </div>
  );
}

export function BasicInfoForm() {
  const dispatch = useAppDispatch();
  const basicInfoDraft = useAppSelector(
    (state) => state.onlineTest.basicInfoDraft,
  );

  const updateField = (field: keyof typeof basicInfoDraft, value: string) => {
    dispatch(updateBasicInfoDraft({ [field]: value }));
  };

  return (
    <section className="mx-auto w-full max-w-239 rounded-[1.125rem] bg-white px-5 py-6 shadow-[var(--shadow-card)] sm:px-7 sm:py-7 lg:px-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-(--color-text-heading)">
          Basic Information
        </h3>

        <div className="space-y-3">
          <FieldLabel required>Online Test Title</FieldLabel>
          <TextInput
            value={basicInfoDraft.title}
            onChange={(value) => updateField("title", value)}
            placeholder="Enter online test title"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <FieldLabel required>Total Candidates</FieldLabel>
            <TextInput
              value={basicInfoDraft.totalCandidates}
              onChange={(value) => updateField("totalCandidates", value)}
              placeholder="Enter total candidates"
              inputMode="numeric"
            />
          </div>

          <div className="space-y-3">
            <FieldLabel required>Total Slots</FieldLabel>
            <TextInput
              value={basicInfoDraft.totalSlots}
              onChange={(value) => updateField("totalSlots", value)}
              placeholder="Select total shots"
              inputMode="numeric"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <FieldLabel required>Total Question Set</FieldLabel>
            <TextInput
              value={basicInfoDraft.totalQuestionSet}
              onChange={(value) => updateField("totalQuestionSet", value)}
              placeholder="Select total question set"
              inputMode="numeric"
            />
          </div>

          <div className="space-y-3">
            <FieldLabel required>Question Type</FieldLabel>
            <SelectField
              value={basicInfoDraft.questionType}
              onChange={(value) => updateField("questionType", value)}
              placeholder="Select question type"
              options={["MCQ", "Checkbox", "Text"]}
            />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1fr_10rem]">
          <div className="space-y-3">
            <FieldLabel required>Start Time</FieldLabel>
            <TimePickerField
              value={basicInfoDraft.startTime}
              onChange={(value) => updateField("startTime", value)}
              placeholder="Enter start time"
            />
          </div>

          <div className="space-y-3">
            <FieldLabel required>End Time</FieldLabel>
            <TimePickerField
              value={basicInfoDraft.endTime}
              onChange={(value) => updateField("endTime", value)}
              placeholder="Enter end time"
            />
          </div>

          <div className="space-y-3">
            <FieldLabel>Duration</FieldLabel>
            <TextInput
              value={basicInfoDraft.duration}
              onChange={(value) => updateField("duration", value)}
              placeholder="Duration Time"
              inputMode="numeric"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
