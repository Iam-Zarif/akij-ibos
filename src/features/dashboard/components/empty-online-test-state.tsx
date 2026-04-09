import Image from "next/image";

export function EmptyOnlineTestState() {
  return (
    <div className="rounded-[1.125rem] border border-(--color-border-empty) bg-white px-6 py-4 sm:px-10 lg:px-12">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/no task img.svg"
          alt="No online tests available"
          width={120}
          height={120}
          priority
          className="h-30 w-30"
        />
        <h3 className="mt-5 text-lg font-semibold text-(--color-foreground) sm:text-xl">
          No Online Test Available
        </h3>
        <p className="mt-3 max-w-155 text-[.9375rem] leading-[1.45] text-(--color-text-muted)">
          Currently, there are no online tests available. Please check back
          later for updates.
        </p>
      </div>
    </div>
  );
}
