import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { BasicInfoDraft } from "@/features/online-test/types/basic-info.types";
import type { PreviewQuestion } from "@/features/online-test/types/question.types";

type OnlineTestState = {
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
  basicInfoDraft: {
    ...initialBasicInfoDraft,
  },
  savedQuestions: [],
};

const onlineTestSlice = createSlice({
  name: "onlineTest",
  initialState,
  reducers: {
    hydrateOnlineTestState(
      _state,
      action: PayloadAction<OnlineTestState | null>,
    ) {
      if (!action.payload) {
        return initialState;
      }

      return {
        basicInfoDraft: {
          ...initialBasicInfoDraft,
          ...action.payload.basicInfoDraft,
        },
        savedQuestions: action.payload.savedQuestions ?? [],
      };
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
  hydrateOnlineTestState,
  updateBasicInfoDraft,
  upsertQuestion,
  removeQuestion,
} = onlineTestSlice.actions;
export const onlineTestReducer = onlineTestSlice.reducer;
