"use client";

type DashboardSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchSparkIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8.094 2.091C5.16 2.091 2.781 4.469 2.781 7.403C2.781 10.337 5.16 12.715 8.094 12.715C9.339 12.715 10.483 12.287 11.387 11.571L15.219 15.403C15.512 15.696 15.988 15.696 16.281 15.403C16.574 15.11 16.574 14.635 16.281 14.342L12.449 10.51C13.165 9.606 13.593 8.462 13.593 7.217"
        stroke="url(#searchGradient)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.879 1.875L13.333 3.085C13.519 3.581 13.906 3.968 14.402 4.154L15.612 4.608L14.402 5.062C13.906 5.248 13.519 5.635 13.333 6.131L12.879 7.341L12.425 6.131C12.239 5.635 11.852 5.248 11.356 5.062L10.146 4.608L11.356 4.154C11.852 3.968 12.239 3.581 12.425 3.085L12.879 1.875Z"
        stroke="url(#sparkGradient)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="searchGradient"
          x1="2.781"
          y1="8.747"
          x2="16.501"
          y2="8.747"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-search-spark-start)" />
          <stop offset="1" stopColor="var(--color-search-spark-end)" />
        </linearGradient>
        <linearGradient
          id="sparkGradient"
          x1="10.146"
          y1="4.608"
          x2="15.612"
          y2="4.608"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-search-star-start)" />
          <stop offset="1" stopColor="var(--color-search-star-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DashboardSearch({ value, onChange }: DashboardSearchProps) {
  return (
    <div className="relative w-full lg:w-119.75">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by exam title"
        className="h-10 w-full rounded-[.6875rem] border border-(--color-brand-search-border) bg-white px-3.5 pr-12 text-[.8125rem] text-(--color-text-body) shadow-[var(--shadow-search)] outline-none placeholder:text-(--color-placeholder-soft) focus:border-(--color-brand-search-focus)"
      />
      <button
        type="button"
        aria-label="Search tests"
        className="absolute top-1/2 right-2.25 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-(--color-brand-surface) text-(--color-brand-search-icon)"
      >
        <SearchSparkIcon />
      </button>
    </div>
  );
}
