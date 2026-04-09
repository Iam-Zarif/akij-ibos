import type { ReactNode } from "react";

type MetricItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

export function MetricItem({ icon, label, value }: MetricItemProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#8b95a7]">
      <span className="shrink-0 text-[#a4acb9]">{icon}</span>
      <span className="whitespace-nowrap">{label}:</span>
      <span className="font-semibold text-[#5b6678]">{value}</span>
    </div>
  );
}
