"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiUser } from "react-icons/fi";

import { useAppSelector } from "@/store/hooks";

export function AppHeader() {
  const pathname = usePathname();
  const activeUser = useAppSelector((state) => state.auth.activeUser);
  const isDashboard = pathname === "/dashboard";
  const isOnlineTest = pathname.startsWith("/online-test");
  const isDeveloperDashboard = isDashboard && activeUser?.role === "developer";
  const headerTitle = isOnlineTest
    ? "Online Test"
    : isDeveloperDashboard
      ? "Akij Resource"
      : "Dashboard";

  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-b border-[#ececec] bg-white">
      <div className="mx-auto grid h-18 w-full max-w-340 grid-cols-[7.25rem_minmax(0,1fr)_13.75rem] items-center gap-3 px-4 sm:px-6 lg:px-10">
        <div className="w-24.5 shrink-0 sm:w-29">
          <Image
            src="/logo.svg"
            alt="Akij Resource logo"
            width={116}
            height={32}
            priority
            className="h-auto w-full"
          />
        </div>
        <h1 className="truncate pl-2 text-[1.0625rem] leading-none font-semibold text-[#3f4a5a] sm:pl-4 sm:text-lg">
          {isDashboard || isOnlineTest ? headerTitle : "Akij Resource"}
        </h1>
        {(isDashboard || isOnlineTest) && activeUser ? (
          <button
            type="button"
            className="ml-auto flex cursor-pointer items-center gap-2 rounded-xl transition hover:bg-[#f8f9fc] sm:gap-3"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eef1f6] text-[#b3bac7]">
              <FiUser className="size-4.5" />
            </div>
            <div className="min-w-0 text-left leading-[1.2]">
              <p className="truncate text-sm font-semibold text-[#455065]">
                {activeUser.name}
              </p>
              <p className="truncate text-xs text-[#8b95a7]">
                Ref.ID- {activeUser.refId}
              </p>
            </div>
            <FiChevronDown className="size-4 shrink-0 text-[#6c7688]" />
          </button>
        ) : (
          <div className="w-full" />
        )}
      </div>
    </header>
  );
}
