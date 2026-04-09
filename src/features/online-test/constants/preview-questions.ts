import type { PreviewQuestion } from "@/features/online-test/types/question.types";

export const previewQuestions: PreviewQuestion[] = [
  {
    id: "question-1",
    type: "radio",
    score: "1 pt",
    title: "Question 1",
    prompt: "What is the Capital of Bangladesh?",
    choices: [
      { id: "q1-a", label: "A.", text: "Dhaka", isCorrect: true },
      { id: "q1-b", label: "B.", text: "Chattogram" },
      { id: "q1-c", label: "C.", text: "Rajshahi" },
      { id: "q1-d", label: "D.", text: "Barishal" },
    ],
  },
  {
    id: "question-2",
    type: "checkbox",
    score: "1 pt",
    title: "Question 2",
    prompt: "What is the Capital of Bangladesh?",
    choices: [
      { id: "q2-a", label: "A.", text: "Dhaka", isCorrect: true },
      { id: "q2-b", label: "B.", text: "Chattogram" },
      { id: "q2-c", label: "C.", text: "Rajshashi", isCorrect: true },
      { id: "q2-d", label: "D.", text: "Barishal" },
    ],
  },
  {
    id: "question-3",
    type: "manual",
    score: "5 pt",
    title: "Question 3",
    prompt: "Write a brief of your capital city",
    answerText:
      "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
  },
];
