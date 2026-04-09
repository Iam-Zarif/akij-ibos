import type { MockUser } from "@/features/auth/types/auth.types";

export const mockUsers: MockUser[] = [
  {
    id: "usr-dev-001",
    name: "John Smith Doe...",
    email: "developer@akij.com",
    userId: "dev-101",
    refId: "12341341",
    password: "Dev@12345",
    role: "developer",
  },
  {
    id: "usr-dev-002",
    name: "Tasnim Arha",
    email: "frontend.dev@akij.com",
    userId: "dev-102",
    refId: "12341342",
    password: "Dev@54321",
    role: "developer",
  },
  {
    id: "usr-rec-001",
    name: "Arif Hossain",
    email: "recruiter@akij.com",
    userId: "rec-201",
    refId: "16101121",
    password: "Rec@12345",
    role: "recruiter",
  },
  {
    id: "usr-rec-002",
    name: "Afsana Juthi",
    email: "talent@akij.com",
    userId: "rec-202",
    refId: "16101122",
    password: "Rec@54321",
    role: "recruiter",
  },
  {
    id: "usr-int-001",
    name: "Mahmudul Hasan",
    email: "interviewer@akij.com",
    userId: "int-301",
    refId: "16101201",
    password: "Int@12345",
    role: "interviewer",
  },
];
