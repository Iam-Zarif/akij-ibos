import Image from "next/image";
import { FiMail, FiPhoneCall } from "react-icons/fi";

export function AppFooter() {
  return (
    <footer className="mt-auto bg-(--color-footer)">
      <div className="mx-auto w-full max-w-340 px-4 py-5 text-white sm:px-6 md:px-10">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center justify-center gap-2 text-sm text-white/92">
            <span className="shrink-0">Powered by</span>
            <Image
              src="/logo.svg"
              alt="Akij Resource"
              width={116}
              height={32}
              className="h-auto w-24 brightness-0 invert sm:w-29"
            />
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-white/92 sm:items-end">
            <div className="flex items-center justify-center gap-2">
              <span className="font-medium">Helpline</span>
              <FiPhoneCall className="size-4 shrink-0" />
              <span>+88 011020202505</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <FiMail className="size-4 shrink-0" />
              <span>support@akij.work</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
