import type { BasicInfoDraft } from "@/features/online-test/types/basic-info.types";
import type { PreviewQuestion } from "@/features/online-test/types/question.types";

export type OnlineTestRecord = BasicInfoDraft & {
  id: string;
  negativeMarking?: string;
  status: "draft" | "published";
  savedQuestions: PreviewQuestion[];
  createdAt?: string;
  updatedAt?: string;
};
