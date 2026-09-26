"use client";

// small color-coded progress bar showing count/limit usage for one file

interface UsageBarProps {
  count: number;
  limit: number;
}

export function UsageBar({ count, limit }: UsageBarProps) {
  const percent =
    limit > 0 ? Math.min(100, Math.round((count / limit) * 100)) : 0;

  const colorClass =
    count >= limit
      ? "bg-red-500"
      : percent >= 66
        ? "bg-amber-500"
        : "bg-emerald-500";

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${count} of ${limit} accesses used`}
      className="h-2 w-full overflow-hidden rounded-full bg-neutral-100"
    >
      <div
        className={`h-full rounded-full transition-[width] duration-150 ${colorClass}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
