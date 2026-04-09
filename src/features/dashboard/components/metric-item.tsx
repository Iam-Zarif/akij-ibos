import type { ReactNode } from "react";

type MetricItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

export function MetricItem({ icon, label, value }: MetricItemProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-(--color-text-muted)">
      <span className="shrink-0 text-(--color-icon-soft)">{icon}</span>
      <span className="whitespace-nowrap">{label}:</span>
      <span className="font-semibold text-(--color-text-neutral)">{value}</span>
    </div>
  );
}
