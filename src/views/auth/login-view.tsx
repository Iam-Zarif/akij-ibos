import { LoginForm } from "@/features/auth/components/login-form";

export function LoginView() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 sm:px-10">
      <div className="w-full max-w-130 text-center">
        <h2 className="text-lg font-semibold text-[#3f4a5a] sm:text-2xl">
          Sign In
        </h2>
      </div>

      <div className="mt-12 flex w-full justify-center">
        <LoginForm />
      </div>
    </main>
  );
}
