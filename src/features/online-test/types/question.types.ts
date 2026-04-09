export type QuestionVariant = "checkbox" | "radio" | "manual";

export type ChoiceOption = {
  id: string;
  label: string;
  text: string;
  isCorrect?: boolean;
};

export type PreviewQuestion = {
  id: string;
  type: QuestionVariant;
  score: string;
  title: string;
  prompt: string;
  choices?: ChoiceOption[];
  answerText?: string;
};
