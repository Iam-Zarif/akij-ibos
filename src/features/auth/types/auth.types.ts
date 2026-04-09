export type UserRole = "developer" | "recruiter" | "interviewer";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  userId: string;
  refId: string;
  password: string;
  role: UserRole;
};

export type LoginFormValues = {
  identifier: string;
  password: string;
};
