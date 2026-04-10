export type EmployerOnlineTest = {
  id: string;
  title: string;
  candidates: string;
  questionSet: string;
  examSlots: string;
};

export type CandidateOnlineTest = {
  id: string;
  title: string;
  duration: string;
  questions: string;
  negativeMarking: string;
};
