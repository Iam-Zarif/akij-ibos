import Image from "next/image";
import { FiMail, FiPhoneCall } from "react-icons/fi";

export function AppFooter() {
  return (
    <footer className="mt-auto bg-(--color-footer)">
      <div className="mx-auto flex min-h-18.5 w-full max-w-340 flex-col gap-4 px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex items-center gap-3 text-base text-white/92">
          <span>Powered by</span>
          <Image
            src="/logo.svg"
            alt="Akij Resource"
            width={116}
            height={32}
            className="brightness-0 invert"
          />
        </div>

        <div className="flex flex-col gap-3 text-sm text-white/92 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center gap-3">
            <span className="font-medium">Helpline</span>
            <FiPhoneCall className="size-4.5" />
            <span>+88 011020202505</span>
          </div>

          <div className="flex items-center gap-3">
            <FiMail className="size-4.5" />
            <span>support@akij.work</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
