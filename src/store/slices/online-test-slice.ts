import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { BasicInfoDraft } from "@/features/online-test/types/basic-info.types";
import type { OnlineTestRecord } from "@/features/online-test/types/online-test.types";
import type { PreviewQuestion } from "@/features/online-test/types/question.types";

type OnlineTestState = {
  tests: OnlineTestRecord[];
  currentTestId: string | null;
  basicInfoDraft: BasicInfoDraft;
  savedQuestions: PreviewQuestion[];
};

const initialBasicInfoDraft: BasicInfoDraft = {
  title: "",
  totalCandidates: "",
  totalSlots: "",
  totalQuestionSet: "",
  questionType: "",
  startTime: "",
  endTime: "",
  duration: "",
};

const initialState: OnlineTestState = {
  tests: [],
  currentTestId: null,
  basicInfoDraft: {
    ...initialBasicInfoDraft,
  },
  savedQuestions: [],
};

const onlineTestSlice = createSlice({
  name: "onlineTest",
  initialState,
  reducers: {
    clearOnlineTestState() {
      return initialState;
    },
    setOnlineTests(state, action: PayloadAction<OnlineTestRecord[]>) {
      state.tests = action.payload;
    },
    setCurrentOnlineTest(
      state,
      action: PayloadAction<OnlineTestRecord | null>,
    ) {
      if (!action.payload) {
        state.currentTestId = null;
        state.basicInfoDraft = { ...initialBasicInfoDraft };
        state.savedQuestions = [];
        return;
      }

      state.currentTestId = action.payload.id;
      state.basicInfoDraft = {
        title: action.payload.title,
        totalCandidates: action.payload.totalCandidates,
        totalSlots: action.payload.totalSlots,
        totalQuestionSet: action.payload.totalQuestionSet,
        questionType: action.payload.questionType,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        duration: action.payload.duration,
      };
      state.savedQuestions = action.payload.savedQuestions ?? [];

      const existingTestIndex = state.tests.findIndex(
        (test) => test.id === action.payload?.id,
      );

      if (existingTestIndex >= 0) {
        state.tests[existingTestIndex] = action.payload;
      } else {
        state.tests.unshift(action.payload);
      }
    },
    updateBasicInfoDraft(
      state,
      action: PayloadAction<Partial<BasicInfoDraft>>,
    ) {
      state.basicInfoDraft = {
        ...state.basicInfoDraft,
        ...action.payload,
      };
    },
    upsertQuestion(state, action: PayloadAction<PreviewQuestion>) {
      const existingQuestionIndex = state.savedQuestions.findIndex(
        (question) => question.id === action.payload.id,
      );

      if (existingQuestionIndex >= 0) {
        state.savedQuestions[existingQuestionIndex] = action.payload;
        return;
      }

      state.savedQuestions.push(action.payload);
    },
    removeQuestion(state, action: PayloadAction<string>) {
      state.savedQuestions = state.savedQuestions.filter(
        (question) => question.id !== action.payload,
      );
    },
  },
});

export const {
  clearOnlineTestState,
  setCurrentOnlineTest,
  setOnlineTests,
  updateBasicInfoDraft,
  upsertQuestion,
  removeQuestion,
} = onlineTestSlice.actions;
export const onlineTestReducer = onlineTestSlice.reducer;
