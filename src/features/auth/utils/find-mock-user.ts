import { mockUsers } from "@/features/auth/constants/mock-users";
import type { MockUser } from "@/features/auth/types/auth.types";

type FindMockUserParams = {
  identifier: string;
  password: string;
};

export function findMockUser({
  identifier,
  password,
}: FindMockUserParams): MockUser | null {
  const normalizedIdentifier = identifier.trim().toLowerCase();

  return (
    mockUsers.find((user) => {
      const matchesIdentifier =
        user.email.toLowerCase() === normalizedIdentifier ||
        user.userId.toLowerCase() === normalizedIdentifier;

      return matchesIdentifier && user.password === password.trim();
    }) ?? null
  );
}
